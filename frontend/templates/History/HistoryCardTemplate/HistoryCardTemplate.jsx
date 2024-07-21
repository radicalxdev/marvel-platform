// Define the base class with abstract methods
class HistoryCardTemplate {
  constructor(cardData) {
    if (new.target === HistoryCardTemplate) {
      throw new TypeError('Cannot construct CardTemplate instances directly');
    }
    if (this.initializeCard === undefined) {
      throw new TypeError('Must override method initializeCard');
    }
    if (this.formatCopyContent === undefined) {
      throw new TypeError('Must override method formatCopyContent');
    }
    if (this.formatExportContent === undefined) {
      throw new TypeError('Must override method formatExportContent');
    }
    this.cardData = cardData;
  }
}

export default HistoryCardTemplate;
