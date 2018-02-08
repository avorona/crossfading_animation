import {
  // Circ,
  //  SteppedEase,
  Power0,
  TimelineMax,
  SteppedEase
} from 'gsap'


 class Shadow {
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



 class Animate {
  constructor () {
    this.shadow = {}
    this.parentSelector = '.js-anim-bg-parent',
    this.targetSelector = '.js-anim-bg'
    this.target=[...document.querySelectorAll(this.targetSelector)]
    this.isAnimating = false
    this.init(this.target)
  }
  init (target) {
    this._bindEvents(target)
  }
  _moveToTheTop () {
    this.target.style.zIndex = 100
  }
  _moveToTheBottom () {
    this.target.style.zIndex = 1
  }
  _bindEvents (target) {
    target.forEach(element => this._onMouseEnter(element))
    target.forEach(element => this._onMouseLeave(element))
  }

  _onMouseEnter (element) {
    // let self = this
    element.addEventListener('mouseenter', (event) => {
      this.parent = event.currentTarget
      this.target = this.parent.querySelector(this.targetSelector)
      if (this.target) {
        this._moveToTheTop()
        this._createClones()
      }
    })
  }

  _createClones () {
    let self = this

    const shadow = new Shadow({
      parent: self.parent,
      target: self.target
    })
    shadow.cloneEl()
    this._animateScaleUp(shadow.els)
    this.shadowAnimation = shadow
  }
  _animateScaleUp (target) {
    const tlEnter = new TimelineMax()
    tlEnter.to(target, 3, {
      scaleX: 1.25,
      scaleY: 1.25,
      ease: Power0.easeNone

    })
  }
  _animateScaleOut (target) {
    this.shadowAnimation.animate()
  }
  _onMouseLeave (element) {
    element.addEventListener('mouseleave', (event) => {
      // this.trigger = event.currentTarget
      this.parent = event.currentTarget
      this.target = this.parent.querySelector(this.targetSelector)
      if (this.target) {
        this._moveToTheBottom()
        this._animateScaleOut()
      }
    })
  }
}

const hoverBg = [...document.querySelectorAll('.js-anim-bg-trigger')]

if (hoverBg) {
  const animateBg = new Animate()
  animateBg.init(hoverBg)
}

const animatedBg = new Animate({
  parent: '.js-anim-bg-parent',
  target: '.js-anim-bg'
})