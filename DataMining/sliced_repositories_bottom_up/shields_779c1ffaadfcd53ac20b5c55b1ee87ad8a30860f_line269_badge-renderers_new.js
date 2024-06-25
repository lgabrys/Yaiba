class Badge {
  constructor({
    label,
    message,
    links,
    logo,
    logoWidth,
    logoPadding,
    color = '#4c1',
    labelColor,
  }) {
    const horizPadding = 5
    const hasLogo = !!logo
    const totalLogoWidth = logoWidth + logoPadding
    const hasLabel = label.length || labelColor
    if (labelColor == null) {
      labelColor = '#555'
    }
    labelColor = hasLabel || hasLogo ? labelColor : color
    const leftWidth = hasLabel
    let messageMargin = leftWidth - (message.length ? 1 : 0)
    if (!hasLabel) {
      if (hasLogo) {
        messageMargin = messageMargin + totalLogoWidth + horizPadding
      } else {
        messageMargin = messageMargin + 1
      }
    }
    this.messageMargin = messageMargin
    this.links = links
    this.color = color
    this.message = message
  }
  getTextElement({ leftMargin, content, link, color, textWidth, linkWidth }) {
  }
  getMessageElement() {
    const rightLink = this.links[1]
    return this.getTextElement({
      leftMargin: this.messageMargin,
      content: this.message,
      link: rightLink,
      color: this.color,
    })
  }
}
