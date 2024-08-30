
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
                this._email = "";
                this._password = "";
                this._passwordShow = false;
                this._hasErrors = false;
                this._loginStage = 0;
                this._loginWorking = false;
                this.el = document.querySelector(el);
                (_a = this.el) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.clickAction.bind(this));
                (_b = this.el) === null || _b === void 0 ? void 0 : _b.addEventListener("input", this.emailValidate.bind(this));
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
            get email() {
                return this._email;
            }
            set email(value) {
                var _a;
                const emailEl = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector("[data-email]");
                if (emailEl) {
                    emailEl.textContent = value;
                }
                this._email = value;
            }
            get emailError() {
                return this.emailValid ? "" : LoginInvalid.Email;
            }
            get emailValid() {
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                return !!this.email.length && emailRegex.test(this.email);
            }
            get password() {
                return this._password;
            }
            set password(value) {
                this._password = value;
            }
            get passwordError() {
                return this.passwordValid ? "" : LoginInvalid.Password;
            }
            get passwordValid() {
                return !!this.password.length;
            }
            get passwordShow() {
                return this._passwordShow;
            }
            set passwordShow(value) {
                var _a, _b;
                this._passwordShow = value;
                if ((_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.password) === null || _b === void 0 ? void 0 : _b.type) {
                    this.el.password.type = value ? "text" : "password";
                    const stateThen = !value ? PasswordDisplay.On : PasswordDisplay.Off;
                    const stateThenIcon = this.el.querySelector(`[data-icon="eye-${stateThen}"]`);
                    stateThenIcon === null || stateThenIcon === void 0 ? void 0 : stateThenIcon.setAttribute("display", "none");
                    const stateNow = value ? PasswordDisplay.On : PasswordDisplay.Off;
                    const stateNowIcon = this.el.querySelector(`[data-icon="eye-${stateNow}"]`);
                    stateNowIcon === null || stateNowIcon === void 0 ? void 0 : stateNowIcon.removeAttribute("display");
                    const button = this.el.querySelector(`[data-action="password"]`);
                    const buttonTitle = value ? PasswordDisplayLabel.Hide : PasswordDisplayLabel.Show;
                    button === null || button === void 0 ? void 0 : button.setAttribute("title", buttonTitle);
                }
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
                if ((_b = this.el) === null || _b === void 0 ? void 0 : _b.email) {
                    this.el.email.disabled = value;
                }
                if ((_c = this.el) === null || _c === void 0 ? void 0 : _c.password) {
                    this.el.password.disabled = value;
                }
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
                else if (action === "back") {
                    this.passwordGoBack();
                }
                else if (action === "password") {
                    this.passwordShowToggle();
                }
            }
            /**
             * @param e Input event
             */
            emailValidate(e) {
                var _a, _b;
                const target = e.target;
                if (this.hasErrors && target.name === "email" && !target.validity.typeMismatch) {
                    const lastValue = this.email;
                    this.email = (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.value;
                    this.errorCheck();
                    this.email = lastValue;
                }
            }
            errorCheck() {
                if (this.loginStage === 0) {
                    this.errorCheckEmail();
                }
                else if (this.loginStage === 1) {
                    this.errorCheckPassword();
                }
            }
            errorCheckEmail() {
                var _a, _b;
                if ((_a = this.el) === null || _a === void 0 ? void 0 : _a.email) {
                    this.hasErrors = !this.emailValid;
                    this.el.email.ariaInvalid = this.hasErrors;
                    const emailError = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector("#email-error");
                    if (emailError) {
                        emailError.textContent = this.emailError;
                    }
                    if (this.hasErrors) {
                        this.el.email.setAttribute("aria-errormessage", "email-error");
                        return;
                    }
                    this.el.email.removeAttribute("aria-errormessage");
                }
            }
            errorCheckPassword() {
                var _a, _b;
                if ((_a = this.el) === null || _a === void 0 ? void 0 : _a.password) {
                    this.hasErrors = !this.passwordValid;
                    this.el.password.ariaInvalid = this.hasErrors;
                    const passwordError = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector("#password-error");
                    if (passwordError) {
                        passwordError.textContent = this.passwordError;
                    }
                    if (this.hasErrors) {
                        this.el.password.setAttribute("aria-errormessage", "password-error");
                        return;
                    }
                    this.el.password.removeAttribute("aria-errormessage");
                }
            }
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
            loginActions() {
                var _a, _b, _c, _d;
                this.loginWorking = false;
                if (this.loginStage === 0) {
                    this.email = (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.value;
                }
                else {
                    this.password = (_d = (_c = this.el) === null || _c === void 0 ? void 0 : _c.password) === null || _d === void 0 ? void 0 : _d.value;
                }
                this.errorCheck();
                if (!this.hasErrors) {
                    if (this.accessMode === AccessMode.SignIn && this.loginStage === 0) {
                        this.loginStage = 1;
                        return;
                    }
                    this.loginRevertData(true);
                }
            }
            /**
             * @param revertAll Revert all input.
             */
            loginRevertData(revertAll = false) {
                var _a;
                this.loginStage = 0;
                this.password = "";
                if (revertAll === true) {
                    (_a = this.el) === null || _a === void 0 ? void 0 : _a.reset();
                }
            }
            passwordGoBack() {
                var _a, _b;
                this.loginRevertData();
                if ((_a = this.el) === null || _a === void 0 ? void 0 : _a.password) {
                    this.el.password.value = this.password;
                    this.el.password.ariaInvalid = false;
                    this.el.password.removeAttribute("aria-errormessage");
                    const passwordError = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector("#password-error");
                    if (passwordError) {
                        passwordError.textContent = "";
                    }
                }
            }
            passwordShowToggle() {
                this.passwordShow = !this.passwordShow;
            }
        }
        var AccessMode;
        (function (AccessMode) {
            AccessMode[AccessMode["SignIn"] = 0] = "SignIn";
            AccessMode[AccessMode["SignUp"] = 1] = "SignUp";
        })(AccessMode || (AccessMode = {}));
        var Greeting;
        (function (Greeting) {
            Greeting["SignIn"] = "Correo @unisalle";
            Greeting["SignUp"] = "gmail, outlook, etc...";
        })(Greeting || (Greeting = {}));
        var LoginInvalid;
 

