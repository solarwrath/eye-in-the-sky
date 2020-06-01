import Timeout = NodeJS.Timeout;

export default class Typewriter {
  private target: HTMLElement;
  private currentText: string;
  private terminalText: string;
  private period: number;

  private isDeleting = false;

  private utilitySubscriptions: Timeout[] = [];
  private workerSubscriptions: Timeout[] = [];
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

  private invocationRegistry: number[] = [];

  public async changeText(newText: string, delay: number = 0) {
    // Concurrency check
    // Honestly, this is a mess
    const currentLamportCounter = this.lampartCounter++;

    this.target.dataset.lamport = `${currentLamportCounter}`;
    this.invocationRegistry.push(currentLamportCounter);

    // Prevent multiple changeTexts running on a single element

    const delayTimeoutSubscription = setTimeout(() => {
      this.innerChangeText(newText, currentLamportCounter);

      this.utilitySubscriptions = this.utilitySubscriptions.splice(
        this.utilitySubscriptions.findIndex(timeoutSubscription => timeoutSubscription === delayTimeoutSubscription),
        1
      );
    }, delay);

    this.utilitySubscriptions.push(delayTimeoutSubscription);
  }

  private innerChangeText(desiredText: string, lamportCounter: number): void {
    this.isDeleting = !desiredText.startsWith(this.currentText);
    // Concurrency quit
    if (Number.parseInt(this.target.dataset.lamport, 10) > lamportCounter) {
      this.invocationRegistry = this.invocationRegistry.filter(registry => registry !== lamportCounter);

      return;
    }

    if (this.isDeleting) {
      this.currentText = this.currentText.substr(0, this.currentText.length - 1);
    } else {
      this.currentText = desiredText.substring(0, this.currentText.length + 1);
    }
    if (Number.parseInt(this.target.dataset.lamport, 10) > lamportCounter) {
      this.invocationRegistry = this.invocationRegistry.filter(registry => registry !== lamportCounter);

      return;
    } else {
      this.target.innerText = this.constructInnerText();
    }

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

        this.workerSubscriptions = this.workerSubscriptions.splice(
          this.workerSubscriptions.findIndex(timeoutSubscription => timeoutSubscription === permutateTextSubscription),
          1
        );
      }, delta);
      this.utilitySubscriptions.push(permutateTextSubscription);
    } else {
      this.invocationRegistry = this.invocationRegistry.filter(registry => registry !== lamportCounter);
    }
  }

  public dismantle(): void {
    this.clearWorkerSubscription();
    this.clearUtilitySubscriptions();
  }

  public clearUtilitySubscriptions(): void {
    this.utilitySubscriptions.forEach(subscription => clearTimeout(subscription));
  }

  public clearWorkerSubscription(): void {
    this.workerSubscriptions.forEach(subscription => clearTimeout(subscription));
  }

  private constructInnerText(): string {
    return `${this.currentText}${this.terminalText}`;
  }
}
