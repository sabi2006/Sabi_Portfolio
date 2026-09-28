import { Component } from 'react'

/** If WebGL is unavailable or the scene crashes, the page keeps working with the CSS backdrop. */
export default class SceneBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('3D scene disabled:', error)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
