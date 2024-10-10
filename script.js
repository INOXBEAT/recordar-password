"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const login = new LoginForm("form");
});

class LoginForm {
    /**
     * @param el 
     */
    constructor(el) {
        this.loginTimeout = 0;
        this._accessMode = 0;
        this._hasErrors = false;
        this._loginStage = 0;
        this._loginWorking = false;
        this.el = document.querySelector(el);

        if (this.el) {
            this.el.addEventListener("click", this.clickAction.bind(this));
            this.el.addEventListener("submit", this.login.bind(this));
            this.el.reset();
        } else {
            console.error("Formulario no encontrado");
        }
    }

    get accessMode() {
        return this._accessMode;
    }

    set accessMode(value) {
        const attr = "data-access";
        const current = this.el.querySelector(`[${attr}="${this.accessMode}"]`);
        const next = this.el.querySelector(`[${attr}="${value}"]`);
        if (current) {
            current.setAttribute("aria-selected", "false");
        }
        if (next) {
            next.setAttribute("aria-selected", "true");
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
        const pages = this.el.querySelector("[data-stage]");
        if (pages) {
            pages.setAttribute("data-stage", `${value}`);
        }
        this._loginStage = value;
    }

    get loginWorking() {
        return this._loginWorking;
    }

    set loginWorking(value) {
        const segments = Array.from(this.el.querySelectorAll("[data-access]"));
        segments.forEach(segment => {
            segment.disabled = value;
        });

        const actionButtons = [
            { action: "continue" },
            { action: "login" },
            { action: "back" }
        ];

        actionButtons.forEach((button) => {
            const buttonEl = this.el.querySelector(`[data-action="${button.action}"]`);
            if (buttonEl) {
                buttonEl.disabled = value;
            }
        });

        this._loginWorking = value;
    }

    accessModeToggle() {
        if (this.loginStage === 0) {
            if (this.accessMode === AccessMode.SignIn) {
                this.accessMode = AccessMode.SignUp;
            } else {
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

    greetingUpdate() {
        const greeting = this.el.querySelector("[data-greeting]");
        if (greeting) {
            if (this.accessMode === AccessMode.SignUp) {
                greeting.textContent = Greeting.SignUp;
            } else {
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
            console.log("Botón continuar presionado"); // Depuración
            this.loginWorking = true;
            this.loginTimeout = setTimeout(this.loginActions.bind(this), 750);
        }
    }

    loginActions() {
        this.loginWorking = false;
        console.log("Realizando redirección..."); // Depuración
        if (this.accessMode === AccessMode.SignIn) {
            // Redirigir a la URL para @unisalle.edu.co
            window.open("https://tuclave.lasalle.edu.co/", "_blank");
        } else if (this.accessMode === AccessMode.SignUp) {
            // Redirigir a la URL para otro correo
            window.open("https://unisallevirtual.lasalle.edu.co/login/forgot_password.php", "_blank");
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
