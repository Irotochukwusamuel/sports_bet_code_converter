// noinspection HtmlUnknownAttribute


$(document).ready(function () {

    let body = $("body");

    let app_name = body.find("[app-page]");

    let url = window.location.href;

    let page = url.slice(url.lastIndexOf("/") + 1).replace(/[^a-z0-9\s]/gi, '');

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

    let changeURLCss = () => {
        let sidebar_menu = body.find("#sidebar_menu");

        switch (page) {
            case "AppAdmin":
                body.attr("app-page", page);
                sidebar_menu.find("[href='/AppAdmin']").addClass("active");
                break;
            case "predictions":
                body.attr("app-page", page);
                sidebar_menu.find("[href='/AppAdmin/predictions']").addClass("active");
                break;
            case "users":
                sidebar_menu.find("[href='/AppAdmin/users']").addClass("active");
                body.attr("app-page", page)
                break;
            case "withdrawal":
                sidebar_menu.find("[href='/AppAdmin/withdrawal']").addClass("active");
                body.attr("app-page", page)
                break;
            default:
                console.log("page is not available")

        }
    };

    let users_ = () => {

        let ViewMore = (firstname, lastname, email, gender, referral, wallet, phone, total_invest, total_refferal, contact_address) => {
            return `<div class="confirm_receipt" confirm_receipt>
            <div class="box" confirm_box>
                <div class="title">User Details
                    <div class="btns">
                        <button class="cancel" close_receipt>Close</button>
                    </div>
                </div>
                <div class="confirmation" confirmation>
                    <div class="des_box">
                        <p class="name">firstname</p>
                        <p class="value">${firstname}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">lastname</p>
                        <p class="value">${lastname}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">email</p>
                        <p class="value">${email}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">gender</p>
                        <p class="value">${gender}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">referral</p>
                        <p class="value">${referral}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">Wallet</p>
                        <p class="value">${wallet}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">phone</p>
                        <p class="value">${phone}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">total investment</p>
                        <p class="value">${total_invest}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">total referrals</p>
                        <p class="value">${total_refferal}</p>
                    </div>
                    <div class="des_box">
                        <p class="name">My address</p>
                        <p class="value">${contact_address}</p>
                    </div>
    
    
                </div>
            </div>
        </div>`
        }

        setInterval(function () {
            body.find("[ChangeStatus]").each(function () {
                $(this).find(`[value='${$(this).attr("value")}']`).attr("selected", "selected")
            });
        }, 100);


        setInterval(function () {
            body.find("[isAdmin]").each(function () {
                $(this).find(`[value='${$(this).attr("value")}']`).attr("selected", "selected");
            });
        }, 100)


        //View more user view details
        body.on("click", "[view_more]", function () {
            let $this = $(this);
            let id = $this.attr("id");
            let data = {
                "id": id
            }
            AjaxSubmit("/individual-details", "POST", data, true).then(function (data) {
                let res = data["data"];
                body.append(ViewMore(res["firstname"], res["lastname"], res["email"], res["gender"], res["referral"], res["wallet"], res["phone"], res["total_investements"], res["total_referral"], res["contact_address"]))
            });

        });

        // close the view more user details details
        body.on("click", "[close_receipt]", function (e) {
            body.find("[confirm_receipt]").remove();
        });

        // changing the disabled option on users
        body.on("change", "[ChangeStatus]", function () {
            let $this = $(this);
            let value = $this.val();
            let id = $this.attr("id");
            let data = {"id": id, "status": value};
            AjaxSubmit("/change-disabled-status", "POST", data, true).then(function (data) {
                if (data === "success") {
                    CustomAlert("success", `This user disabled status has been successfully changed to ${value}`);
                }

            });
        });

        // changing the IsAdmin option on users
        body.on("change", "[isAdmin]", function () {
            let $this = $(this);
            let value = $this.val();
            alert(value)
            let id = $this.attr("id");
            let data = {"id": id, "status": value};
            AjaxSubmit("/change-IsAdmin-status", "POST", data, true).then(function (data) {
                if (data === "success") {
                    CustomAlert("success", `This user IsAdmin status has been successfully changed to ${value}`);
                }

            });
        });

    };

    let predictions = () => {
        // create a new packages new pop form
        body.on("click", "[add_prediction]", function (e) {
            e.preventDefault();
            body.find("[AddPrediction]").css("display", "flex");
            body.find("[numberofprediction]").css("display", "block");

        });

        // close the  new packages new pop form
        body.find("[AddPrediction]").on("click", "[close_property]", function (e) {
            body.find("[AddPrediction]").fadeOut("300");
            body.find("[newpredictionform]").css("display", "none");
            let parentBox = body.find("[newpredictionform]").find(".forms_").find(".parentBox");

            parentBox.remove();

        });

        //    getting number of predictions
        body.find("[numberofprediction]").on("submit", function (e) {
            e.preventDefault();
            let numb_ = parseInt($(this).find("input[name='number']").val());
            body.find("[numberofprediction]").css("display", "none");

            body.find("[newpredictionform]").css("display", "block");
            for (let i = 0; i < numb_; i++) {
                body.find("[newpredictionform]").find(".forms_").append(
                    `
                <div class="parentBox" parentBox>
                            <div class="box_">
                                <label>League</label>
                                <input type="text" name="league" required>
                            </div>   
                             <div class="box_">
                                <label>Home Team</label>
                                <input type="text" name="home" required>
                            </div>
                            <div class="box_">
                                <label>Away Team</label>
                                <input type="text" name="away" required>
                            </div>
                            <div class="box_">
                                <label>Prediction</label>
                                <select name="prediction" required>
                                    <option>Select Prediction</option>
                                    <option value="1">1 (Home Win)</option>
                                    <option value="2">2 (Away Win )</option>
                                    <option value="1x">1X (Home Win or Draw)</option>
                                    <option value="x">X (Draw)</option>
                                    <option value="12">12 (Any Team Win)</option>
                                    <option value="x2">X2 (Away Win or Draw)</option>
                                </select>
                            </div>
                        </div>
                `
                );
            }


        });


        //    getting all predictions
        body.find("[newpredictionform]").on("submit", function (e) {
            e.preventDefault();
            let parentBox = body.find("[newpredictionform]").find(".forms_").find(".parentBox");

            let res = []
            parentBox.each(function () {
                let league = $(this).find("input[name='league']").val();
                let home = $(this).find("input[name='home']").val();
                let away = $(this).find("input[name='away']").val();
                let prediction = $(this).find("select[name='prediction']").val();
                res.push(
                    {
                        "league": league,
                        "home": home,
                        "away": away,
                        "prediction": prediction
                    }
                );
            });
            body.find('[newpredictionform]').find("button").html("Uploading...").attr('disabled', true);
            let data_ = {
                "data": res
            }
            AjaxSubmit("/upload-prediction", "POST", data_, true).then(function (e) {
                body.find('[newpredictionform]').find("button").html("UPLOAD PREDICTIONS").attr('disabled', false);
                if (e === "success") {
                    location.reload();
                } else if (e === "exist") {
                    CustomAlert("error", "You can not upload more than 1 prediction a day, please delete today prediction to be eligible to add another one.")
                    body.find('[newpredictionform]').find("button").html("UPLOAD PREDICTIONS").attr('disabled', false);

                }
            })

        });


        //View more predictions details
        body.on("click", "[view_more]", function () {
            let $this = $(this);
            let vcon = body.find("[viewmore_container]");
            let id = $this.attr("id");
            let data = {
                "id": id
            }
            AjaxSubmit("/prediction-view-more", "POST", data, true).then(function (data) {
                let res = JSON.parse(data["data"].replace(/'/g, '"'));
                vcon.css("display", "flex");
                for (let i = 0; i < res.length; i++) {
                    vcon.find("[viewmore_box]").append(
                        `
                       <div class="des_box" style="flex-direction: unset">
                        <p class="value" style="width: unset;flex: 100%">${res[i]["league"]}</p>
                       <p class="value" style="width: unset;flex: 100%">${res[i]["home"]} <b style="color: red">vs</b> ${res[i]["away"]}</p>
                       <p class="value" style="width: unset;flex: 100%;text-align: right">${res[i]["prediction"]}</p>
                       </div>  
                        `
                    );
                }
            });

        });

        // close the view more predictions details
        body.on("click", "[close_receipt]", function (e) {
            let vcon = body.find("[viewmore_container]");
            vcon.css("display", "none");
            vcon.find("[viewmore_box]").find(".des_box").remove();
        });

        //   delete a prediction
        body.on("click", "[delete]", function () {
            let tablerow = $(this);
            let table = $(".lms_table_active3 ").DataTable();

            let $this = $(this);
            let id = $this.attr("id");
            let data = {
                "id": id
            }
            AjaxSubmit("/delete-prediction", "POST", data, true).then(function (data) {
                let res = data["data"];
                if (res === "success") {
                    table.row(tablerow.parents('tr')).remove().draw();
                    CustomAlert("success", "Data has been successfully deleted!");
                }
            });

        });

    };


    changeURLCss();

    switch (body.attr("app-page")) {
        case "predictions":
            predictions();
            break;
        case "users":
            users_();
            break;

        default:
            console.log("Check the general.js for debugging..")
    }
});
