
        "use strict";
        window.addEventListener("DOMContentLoaded", () => {
            const login = new LoginForm("form");
        });
        class LoginForm {
            /**
             * @param el 
             */
            constructor(el) {
                var _a, _b, _c, _d;
                this.loginTimeout = 0;
                this._accessMode = 0;
                this._hasErrors = false;
                this._loginStage = 0;
                this._loginWorking = false;
                this.el = document.querySelector(el);
                (_a = this.el) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.clickAction.bind(this));
                (_c = this.el) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", this.login.bind(this));
                (_d = this.el) === null || _d === void 0 ? void 0 : _d.reset();
            }
            get accessMode() {
                return this._accessMode;
            }
            set accessMode(value) {
                var _a, _b;
                const attr = "data-access";
                const current = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector(`[${attr}="${this.accessMode}"]`);
                const next = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector(`[${attr}="${value}"]`);
                if (current) {
                    current.ariaSelected = "false";
                }
                if (next) {
                    next.ariaSelected = "true";
                }
                this._accessMode = value;
            }
            get hasErrors() {
                return this._hasErrors;
            }
            set hasErrors(value) {
                this._hasErrors = value;
            }
            get loginStage() {
                return this._loginStage;
            }
            set loginStage(value) {
                var _a;
                const pages = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector("[data-stage]");
                pages.setAttribute("data-stage", `${value}`);
                this._loginStage = value;
            }
            get loginWorking() {
                return this._loginWorking;
            }
            set loginWorking(value) {
                var _a, _b, _c;
                const segmentsRaw = Array.from(((_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelectorAll("[data-access]")) || []);
                const segments = segmentsRaw;
                segments.forEach(segment => {
                    segment.disabled = value;
                });

                const actionButtons = [
                    {
                        action: "continue",
                        defaultText: LoginState.Continue,
                        workingText: LoginState.ContinueWorking
                    },
                    {
                        action: "login",
                        defaultText: LoginState.Login,
                        workingText: LoginState.LoginWorking
                    },
                    {
                        action: "back"
                    }
                ];
                actionButtons.forEach((button) => {
                    var _a;
                    const buttonEl = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-action="${button.action}"]`);
                    if (buttonEl) {
                        if (value && button.workingText) {
                            buttonEl.textContent = button.workingText;
                        }
                        else if (button.defaultText) {
                            buttonEl.textContent = button.defaultText;
                        }
                        buttonEl.disabled = value;
                    }
                });
                this._loginWorking = value;
            }
            accessModeToggle() {
                if (this.loginStage === 0) {
                    if (this.accessMode === AccessMode.SignIn) {
                        this.accessMode = AccessMode.SignUp;
                    }
                    else {
                        this.accessMode = AccessMode.SignIn;
                    }
                }
            }
            /**
             * @param e Click event
             */
            clickAction(e) {
                const target = e.target;
                const action = target.getAttribute("data-action");
                if (action === "access") {
                    this.accessModeToggle();
                    this.greetingUpdate();
                }
            }
            /**
             * @param e Input event
             */
            greetingUpdate() {
                var _a;
                const greeting = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector("[data-greeting]");
                if (greeting) {
                    if (this.accessMode === AccessMode.SignUp) {
                        greeting.textContent = Greeting.SignUp;
                    }
                    else {
                        greeting.textContent = Greeting.SignIn;
                    }
                }
            }
            /**
             * @param e Submit event
             */
            login(e) {
                e.preventDefault();
                if (!this.loginWorking) {
                    const timeout = 750;
                    this.loginWorking = true;
                    this.loginTimeout = setTimeout(this.loginActions.bind(this), timeout);
                }
            }

        }
        var AccessMode;
        (function (AccessMode) {
            AccessMode[AccessMode["SignIn"] = 0] = "SignIn";
            AccessMode[AccessMode["SignUp"] = 1] = "SignUp";
        })(AccessMode || (AccessMode = {}));
        var Greeting;
        (function (Greeting) {
            Greeting["SignIn"] = "...@unisalle.edu.co";
            Greeting["SignUp"] = "gmail, outlook, etc...";
        })(Greeting || (Greeting = {}));
        var LoginInvalid;
 

