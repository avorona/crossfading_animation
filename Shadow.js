
import {
  TimelineMax,
  // Power2
  SteppedEase
} from 'gsap'

export default class Shadow {
  constructor ({ target, parent }) {
    this.el = target
    this.parent = parent
    this.limit = 5
    this.duration = 0.75
    this.delay = 0.15
    this.stepFactor = 0.15
    this.zIndexFactor = 10
    this.easing = SteppedEase.ease
    this.els = [this.el]
    // console.log(this.els)
  }

  cloneEl () {
    let i = this.limit

    while (i >= 0) {
      const clone = this
        .el
        .cloneNode(true)
      this.parent
        .appendChild(clone)
      clone.style.opacity = this.stepFactor * i
      clone.style.zIndex = this.zIndexFactor - i
      this
        .els
        .push(clone)
      i--
    }
  }

  animate () {
    const self = this
    const tl = new TimelineMax()
    tl.staggerTo(this.els, this.duration, {
      scaleX: 1,
      scaleY: 1,
      ease: this.easing
    },
    this.delay, 0, self._destroy.bind(self))
  }

  _destroy () {
    [...this.els].slice(1).forEach(el => el.remove())
  }
}

