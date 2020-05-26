export default class Typewriter {
  private target: HTMLElement;
  private currentText: string;
  private terminalText: string;
  private period: number;

  private isDeleting = false;
  private changingStarted = false;
  private shallQuit = false;

  private timeoutSubscriptions: number[] = [];
  private lampartCounter = 0;

  constructor(
    typewriterOptions: {
      target: HTMLElement,
      initialText: string,
      terminalText?: string,
      period?: number,
    },
    initialAppearanceOptions?: {
      animateAppearance: boolean,
      initialDelay?: number,
    }
  ) {
    this.target = typewriterOptions.target;
    this.terminalText = typewriterOptions.terminalText || '';
    this.period = typewriterOptions.period || 2000;

    if (initialAppearanceOptions !== undefined && initialAppearanceOptions.animateAppearance) {
      this.currentText = '';

      if (initialAppearanceOptions.initialDelay !== undefined) {
        this.changeText(typewriterOptions.initialText, initialAppearanceOptions.initialDelay);
      } else {
        this.changeText(typewriterOptions.initialText);
      }
    } else {
      this.currentText = typewriterOptions.initialText || '';
      this.target.innerText = this.constructInnerText();
    }
  }

  private queue = [];

  public async changeText(newText: string, delay: number = 0) {
    if (this.target.innerText === newText) {
      return;
    }


    // Concurrency check
    // Honestly, this is a mess
    const currentLamportCounter = this.lampartCounter++;
    this.queue.push(currentLamportCounter);

    this.changingStarted = true;

    if (this.queue.length !== 1) {
      this.shallQuit = true;

      const indexInQueue = this.queue.findIndex(iteratedLamportCounter => iteratedLamportCounter === currentLamportCounter);
      // If new one has started between start function and this
      if (indexInQueue !== null) {
        let lamportQuit = false;
        while (!lamportQuit && (this.shallQuit || !this.changingStarted)) {
          // Pause in js
          await new Promise(r => setTimeout(r, 100));

          // Lamport quit (if queue has no current counter from the closure, it means that new invocation has been)
          if (this.queue.length > 0 && this.queue[0] > currentLamportCounter) {
            lamportQuit = true;
          }
        }

        if (lamportQuit) {
          return;
        }
      }
    }
    this.shallQuit = false;

    this.clearSubscriptions();
    // Prevent multiple changeTexts running on a single element
    this.isDeleting = !newText.startsWith(this.currentText);

    const delayTimeoutSubscription = setTimeout(() => {
      this.innerChangeText(newText, currentLamportCounter);

      this.timeoutSubscriptions = this.timeoutSubscriptions.splice(
        this.timeoutSubscriptions.findIndex(timeoutSubscription => timeoutSubscription === delayTimeoutSubscription),
        1
      );
    }, delay);

    this.timeoutSubscriptions.push(delayTimeoutSubscription);
  }

  private innerChangeText(desiredText: string, lamportCounter: number): void {
    // Concurrency quit
    if (this.shallQuit) {
      this.shallQuit = false;

      this.queue = this.queue.filter(lamport => lamport !== lamportCounter);

      return;
    }

    if (this.isDeleting) {
      this.currentText = this.currentText.substr(0, this.currentText.length - 1);
    } else {
      this.currentText = desiredText.substring(0, this.currentText.length + 1);
    }
    this.target.innerText = this.constructInnerText();

    let delta = 300 - Math.random() * 100;

    if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      delta = 500;
    }

    if (this.isDeleting) {
      delta /= 2;
    }

    if (this.currentText !== desiredText) {
      const permutateTextSubscription = setTimeout(() => {
        this.innerChangeText(desiredText, lamportCounter);

        this.timeoutSubscriptions = this.timeoutSubscriptions.splice(
          this.timeoutSubscriptions.findIndex(timeoutSubscription => timeoutSubscription === permutateTextSubscription),
          1
        );
      }, delta);
      this.timeoutSubscriptions.push(permutateTextSubscription);
    } else {
      // Cleanup

      this.changingStarted = false;
      this.shallQuit = false;

      this.queue = this.queue.filter(lamport => lamport !== lamportCounter);
      console.log(lamportCounter, this);
    }
  }

  public clearSubscriptions(): void {
    this.timeoutSubscriptions.forEach(subscription => clearTimeout(subscription));
  }

  private constructInnerText(): string {
    return `${this.currentText}${this.terminalText}`;
  }
}
