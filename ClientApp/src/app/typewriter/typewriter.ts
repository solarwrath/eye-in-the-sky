export default class Typewriter {
  private target: HTMLElement;
  private currentText: string;
  private terminalText: string;
  private period: number;

  private isDeleting = false;

  private timeoutSubscriptions: number[] = [];

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

  public changeText(newText: string, delay: number = 0) {
    // Prevent multiple changeTexts running on a single element
    this.clearSubscriptions();
    this.isDeleting = !newText.startsWith(this.currentText);

    const delayTimeoutSubscription = setTimeout(() => {
      this.innerChangeText(newText);

      this.timeoutSubscriptions = this.timeoutSubscriptions.splice(
        this.timeoutSubscriptions.findIndex(timeoutSubscription => timeoutSubscription === delayTimeoutSubscription),
        1
      );
    }, delay);

    this.timeoutSubscriptions.push(delayTimeoutSubscription);
  }

  private innerChangeText(desiredText: string): void {
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
        this.innerChangeText(desiredText);

        this.timeoutSubscriptions = this.timeoutSubscriptions.splice(
          this.timeoutSubscriptions.findIndex(timeoutSubscription => timeoutSubscription === permutateTextSubscription),
          1
        );
      }, delta);
      this.timeoutSubscriptions.push(permutateTextSubscription);
    }
  }

  public clearSubscriptions(): void {
    this.timeoutSubscriptions.forEach(subscription => clearTimeout(subscription));
  }

  private constructInnerText(): string {
    return `${this.currentText}${this.terminalText}`;
  }
}
