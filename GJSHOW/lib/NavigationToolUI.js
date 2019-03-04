function NavigationToolUI(a) {
    this.viewer = a;
    this.viewer.setActiveNavigationTool()
}

NavigationToolUI.prototype.setNavigationState = function (a) {
    this.stateFlag == a ? (this.viewer.setActiveNavigationTool(), this.stateFlag = null) : (this.viewer.setActiveNavigationTool(a), this.stateFlag = a)
};