import {
  // Circ,
  //  SteppedEase,
  Power0,
  TimelineMax
} from 'gsap'
import Shadow from './Shadow'

export default class Animate {
  constructor () {
    this.shadow = {}
    this.parentSelector = '.js-anim-bg-parent',
    this.targetSelector = '.js-anim-bg'
    this.isAnimating = false

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
