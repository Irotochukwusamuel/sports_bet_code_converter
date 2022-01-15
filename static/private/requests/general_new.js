// noinspection HtmlUnknownAttribute

$(document).ready(function () {

    let body = $("body");

    let app_name = body.find("[app-page]");

    let url = window.location.href;

    let page = url.slice(url.lastIndexOf("/") + 1);

    let CustomAlert = (alert_type, message) => {

        if (alert_type === "default") {
            body.append('        <div class="Toastify__toast-container Toastify__toast-container--top-center">\n' +
                '            <div id="mtyiglv867" class="Toastify__toast Toastify__toast--' + alert_type + '"\n' +
                '                 style="animation-fill-mode: forwards; animation-duration: 750ms;">\n' +
                '                <div role="alert" class="Toastify__toast-body"> ' + message + ' \n' +
                '                </div>\n' +
                '                <button class="Toastify__close-button Toastify__close-button--error" type="button" aria-label="close">\n' +
                '                    <svg aria-hidden="true" viewBox="0 0 14 16">\n' +
                '                        <path fill-rule="evenodd"\n' +
                '                              d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"></path>\n' +
                '                    </svg>\n' +
                '                </button>\n' +
                '                <div class="Toastify__progress-bar Toastify__progress-bar--animated Toastify__progress-bar--default" style="opacity: 1;"></div>\n' +
                '            </div>\n' +
                '        </div>\n');
        } else {
            body.append('        <div class="Toastify__toast-container Toastify__toast-container--top-center">\n' +
                '            <div id="mtyiglv867" class="Toastify__toast Toastify__toast--' + alert_type + '"\n' +
                '                 style="animation-fill-mode: forwards; animation-duration: 750ms;">\n' +
                '                <div role="alert" class="Toastify__toast-body"> ' + message + ' \n' +
                '                </div>\n' +
                '                <button class="Toastify__close-button Toastify__close-button--error" type="button" aria-label="close">\n' +
                '                    <svg aria-hidden="true" viewBox="0 0 14 16">\n' +
                '                        <path fill-rule="evenodd"\n' +
                '                              d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"></path>\n' +
                '                    </svg>\n' +
                '                </button>\n' +
                '                <div class="Toastify__progress-bar Toastify__progress-bar--error"\n' +
                '                     style="opacity: 1;"></div>\n' +
                '            </div>\n' +
                '        </div>\n');
        }


        let Toastify = body.find(".Toastify__toast-container");

        let Toastify_progress_bar = Toastify.find(".Toastify__progress-bar");

        setTimeout(function () {
            Toastify.remove();
        }, 5000);

        let toastWidth = 100;
        let val = 0;
        let roll = setInterval(progress, val)

        function progress() {
            if (toastWidth <= val) {
                clearInterval(roll)
            } else {
                toastWidth--
                Toastify_progress_bar.animate({
                    width: toastWidth + "%"
                }, 27)
            }
        }

        Toastify.on("click", function () {
            $(this).remove();
        });
    };

    let AjaxSubmit = (url, type, data, isJson) => {
        if (isJson === true) {
            return $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                data: JSON.stringify(data),
                cache: false,
                processData: false,
            });
        } else if (isJson === false) {
            return $.ajax({
                url: url,
                type: type,
                data: data,
                contentType: false,
                cache: false,
                processData: false
            });
        }
    }

    let ringRotateCard = () => {
        return '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
    }

    let page_loader = () => {
        return '<div class="lds-ring lds-ring-themed mt-5 undefined"><div></div><div></div><div></div><div></div></div>'
    }


    // CHANGE PASSWORD
    let ChangePassword = () => {
        let changepassword = body.find('[changepassword]');

        let CheckPasswordValidate = () => {
            let password = body.find("#password");
            let cpassword = body.find("#cpassword");

            console.log(password.val(), cpassword.val())

            if (password.val().trim() !== cpassword.val().trim()) {
                CustomAlert("warning", "Password does not match!");
                return false
            } else if (password.val().trim().length <= 5) {
                CustomAlert("warning", "Password must be more 5 digits");
                return false
            }
            return true
        }

        body.on("submit", "[changepassword]", function (e) {
            e.preventDefault();
            let data = new FormData(this)
            if (CheckPasswordValidate()) {
                AjaxSubmit("/changepassword", "POST", data, false).then(function (data) {
                    let result = data["data"];
                    if (result[0] === "success") {
                        CustomAlert(result[0], result[1])
                        setTimeout(function () {
                            window.location.href = "/login"
                        }, 3000)
                    } else {
                        CustomAlert(result[0], result[1])
                    }

                });
            }

        })
    };

    // CHANGE EMAIL
    let ChangeEmail = () => {

        body.on("submit", '[changeemail]', function (e) {
            e.preventDefault();
            let data = new FormData(this)

            AjaxSubmit("/changeemail", "POST", data, false).then(function (data) {
                let result = data["data"];
                if (result[0] === "success") {
                    CustomAlert(result[0], result[1])
                    setTimeout(function () {
                        window.location.href = "/login"
                    }, 3000)
                } else {
                    CustomAlert(result[0], result[1])

                }

            });


        })
    };

    let changeURLCss = () => {
        switch (page) {
            case "dashboard":
                body.find("[href='/dashboard']").addClass("side-menu--active");
                app_name.attr("app-page", page)
                break;
            case "user-investment":
                body.find("[href='/user-investment']").addClass("side-menu--active");
                app_name.attr("app-page", page)
                break;
            case "referral":
                body.find("[href='/referral']").addClass("side-menu--active");
                app_name.attr("app-page", page)
                break;
            case "withdrawal-request":
                body.find("[href='/withdrawal-request']").addClass("side-menu--active");
                app_name.attr("app-page", page)
                break;
            case "profile":
                body.find("[href='/profile']").addClass("side-menu--active");
                app_name.attr("app-page", page)
                break;
            default:
                console.log("page is not available")

        }
    };



    ProfilePhoto();
    ChangePassword();
    ChangeEmail();
    changeURLCss();


    switch (app_name.attr("app-page")) {
        case "user-investment":
            investment_();
            break;
        case "referral":
            referral_();
            break;
        case "withdrawal-request":
            withdrawal_request_();
            break;
        case "profile":
            profile_();
            break;
        default:
            console.log("Check the general.js for debugging..")
    }
});