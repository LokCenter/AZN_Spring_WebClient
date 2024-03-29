﻿/*
DayPilot Lite
Copyright (c) 2005 - 2022 Annpoint s.r.o.
http://www.daypilot.org/
Licensed under Apache Software License 2.0
Version: 2022.2.384-lite
*/
if ("undefined" == typeof DayPilot) var DayPilot = {};
!(function () {
    function e(e) {
        var t = DayPilot.Date.Cache.Ticks;
        if (t[e]) return (DayPilot.Stats.cacheHitsTicks += 1), t[e];
        var a,
            r = new Date(e),
            o = r.getUTCMilliseconds();
        a = 0 === o ? "" : o < 10 ? ".00" + o : o < 100 ? ".0" + o : "." + o;
        var n = r.getUTCSeconds();
        n < 10 && (n = "0" + n);
        var i = r.getUTCMinutes();
        i < 10 && (i = "0" + i);
        var d = r.getUTCHours();
        d < 10 && (d = "0" + d);
        var l = r.getUTCDate();
        l < 10 && (l = "0" + l);
        var s = r.getUTCMonth() + 1;
        s < 10 && (s = "0" + s);
        var u = r.getUTCFullYear();
        if (u <= 0) throw "The minimum year supported is 1.";
        u < 10 ? (u = "000" + u) : u < 100 ? (u = "00" + u) : u < 1e3 && (u = "0" + u);
        var c = u + "-" + s + "-" + l + "T" + d + ":" + i + ":" + n + a;
        return (t[e] = c), c;
    }
    function t(e) {
        (e = Math.min(e, 255)), (e = Math.max(e, 0));
        var t = e.toString(16);
        return e < 16 ? "0" + t : t;
    }
    if ("undefined" == typeof DayPilot.$) {
        "undefined" == typeof DayPilot.Global && (DayPilot.Global = {}),
            (DayPilot.$ = function (e) {
                return document.getElementById(e);
            }),
            (DayPilot.isKhtml = navigator && navigator.userAgent && navigator.userAgent.indexOf("KHTML") !== -1),
            (DayPilot.isIE = navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1),
            (DayPilot.mo2 = function (e, t) {
                if (((t = t || window.event), "undefined" != typeof t.offsetX)) {
                    var a = { x: t.offsetX + 1, y: t.offsetY + 1 };
                    if (!e) return a;
                    for (var r = t.srcElement; r && r !== e; ) "SPAN" !== r.tagName && ((a.x += r.offsetLeft), r.offsetTop > 0 && (a.y += r.offsetTop - r.scrollTop)), (r = r.offsetParent);
                    return r ? a : null;
                }
                if ("undefined" != typeof t.layerX) {
                    var a = { x: t.layerX, y: t.layerY, src: t.target };
                    if (!e) return a;
                    for (var r = t.target; r && "absolute" !== r.style.position && "relative" !== r.style.position; ) (r = r.parentNode), DayPilot.isKhtml && (a.y += r.scrollTop);
                    for (; r && r !== e; ) (a.x += r.offsetLeft), (a.y += r.offsetTop - r.scrollTop), (r = r.offsetParent);
                    return r ? a : null;
                }
                return null;
            }),
            (DayPilot.mo3 = function (e, t, a) {
                if (((t = t || window.event), "undefined" != typeof t.pageX)) {
                    var r = DayPilot.abs(e, a);
                    return { x: t.pageX - r.x, y: t.pageY - r.y };
                }
                return DayPilot.mo2(e, t);
            }),
            (DayPilot.browser = {}),
            (DayPilot.browser.ie9 = (function () {
                var e = document.createElement("div");
                return (e.innerHTML = "<!--[if IE 9]><i></i><![endif]-->"), 1 === e.getElementsByTagName("i").length;
            })()),
            (DayPilot.browser.ielt9 = (function () {
                var e = document.createElement("div");
                return (e.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->"), 1 === e.getElementsByTagName("i").length;
            })()),
            (DayPilot.abs = function (e, t) {
                if (!e) return null;
                var a = {
                    x: e.offsetLeft,
                    y: e.offsetTop,
                    w: e.clientWidth,
                    h: e.clientHeight,
                    toString: function () {
                        return "x:" + this.x + " y:" + this.y + " w:" + this.w + " h:" + this.h;
                    },
                };
                if (e.getBoundingClientRect) {
                    var r = e.getBoundingClientRect();
                    (a.x = r.left), (a.y = r.top);
                    var o = DayPilot.doc();
                    (a.x -= o.clientLeft || 0), (a.y -= o.clientTop || 0);
                    var n = DayPilot.pageOffset();
                    if (((a.x += n.x), (a.y += n.y), t)) {
                        var i = DayPilot.absOffsetBased(e, !1),
                            t = DayPilot.absOffsetBased(e, !0);
                        (a.x += t.x - i.x), (a.y += t.y - i.y), (a.w = t.w), (a.h = t.h);
                    }
                    return a;
                }
                return DayPilot.absOffsetBased(e, t);
            }),
            (DayPilot.absOffsetBased = function (e, t) {
                for (
                    var a = {
                        x: e.offsetLeft,
                        y: e.offsetTop,
                        w: e.clientWidth,
                        h: e.clientHeight,
                        toString: function () {
                            return "x:" + this.x + " y:" + this.y + " w:" + this.w + " h:" + this.h;
                        },
                    };
                    e.offsetParent;

                )
                    (e = e.offsetParent),
                        (a.x -= e.scrollLeft),
                        (a.y -= e.scrollTop),
                    t &&
                    (a.x < 0 && ((a.w += a.x), (a.x = 0)),
                    a.y < 0 && ((a.h += a.y), (a.y = 0)),
                    e.scrollLeft > 0 && a.x + a.w > e.clientWidth && (a.w -= a.x + a.w - e.clientWidth),
                    e.scrollTop && a.y + a.h > e.clientHeight && (a.h -= a.y + a.h - e.clientHeight)),
                        (a.x += e.offsetLeft),
                        (a.y += e.offsetTop);
                var r = DayPilot.pageOffset();
                return (a.x += r.x), (a.y += r.y), a;
            }),
            (DayPilot.isArray = function (e) {
                return "[object Array]" === Object.prototype.toString.call(e);
            }),
            (DayPilot.distance = function (e, t) {
                return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
            }),
            (DayPilot.sheet = function () {
                var e = document.createElement("style");
                e.setAttribute("type", "text/css"), e.styleSheet || e.appendChild(document.createTextNode("")), (document.head || document.getElementsByTagName("head")[0]).appendChild(e);
                var t = !!e.styleSheet,
                    a = {};
                return (
                    (a.rules = []),
                        (a.commit = function () {
                            t && (e.styleSheet.cssText = this.rules.join("\n"));
                        }),
                        (a.add = function (a, r, o) {
                            return t
                                ? void this.rules.push(a + "{" + r + "}")
                                : void (e.sheet.insertRule ? ("undefined" == typeof o && (o = e.sheet.cssRules.length), e.sheet.insertRule(a + "{" + r + "}", o)) : e.sheet.addRule && e.sheet.addRule(a, r, o));
                        }),
                        a
                );
            }),
            (function () {
                if (!DayPilot.Global.defaultCss) {
                    var e = DayPilot.sheet();
                    e.add(".calendar_default_main", "border: 1px solid #c0c0c0; font-family: -apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size: 13px;"),
                        e.add(".calendar_default_main *, .calendar_default_main *:before, .calendar_default_main *:after", "box-sizing: content-box;"),
                        e.add(
                            ".calendar_default_rowheader_inner,.calendar_default_cornerright_inner,.calendar_default_corner_inner,.calendar_default_colheader_inner,.calendar_default_alldayheader_inner",
                            "color: #333;background: #f3f3f3;"
                        ),
                        e.add(".calendar_default_cornerright_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;\tborder-bottom: 1px solid #c0c0c0;"),
                        e.add(".calendar_default_direction_rtl .calendar_default_cornerright_inner", "border-right: 1px solid #c0c0c0;"),
                        e.add(
                            ".calendar_default_rowheader_inner",
                            "font-size: 16pt;text-align: right; position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0; padding: 3px;"
                        ),
                        e.add(".calendar_default_direction_rtl .calendar_default_rowheader_inner", "border-right: none;"),
                        e.add(".calendar_default_corner_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;"),
                        e.add(".calendar_default_direction_rtl .calendar_default_corner_inner", "border-right: none;"),
                        e.add(".calendar_default_rowheader_minutes", "font-size:10px;vertical-align: super;padding-left: 2px;padding-right: 2px;"),
                        e.add(
                            ".calendar_default_colheader_inner",
                            "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0; display: flex; align-items: center; justify-content: center; font-size: 13px;"
                        ),
                        e.add(".calendar_default_cell_inner", "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #ddd;border-bottom: 1px solid #ddd; background: #f9f9f9;"),
                        e.add(".calendar_default_cell_business .calendar_default_cell_inner", "background: #fff"),
                        e.add(".calendar_default_alldayheader_inner", "text-align: center;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;"),
                        e.add(".calendar_default_message", "opacity: 0.9; padding: 10px; color: #ffffff;background: #ffa216;"),
                        e.add(".calendar_default_alldayevent_inner,.calendar_default_event_inner", "color: #333; border: 1px solid #999;"),
                        e.add(".calendar_default_event_bar", "top: 0px;bottom: 0px;left: 0px;width: 6px;background-color: #9dc8e8;"),
                        e.add(".calendar_default_event_bar_inner", "position: absolute;width: 6px;background-color: #1066a8;"),
                        e.add(
                            ".calendar_default_alldayevent_inner,.calendar_default_event_inner",
                            'background: #fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'
                        ),
                        e.add(".calendar_default_selected .calendar_default_event_inner", "background: #ddd;"),
                        e.add(".calendar_default_alldayevent_inner", "position: absolute;top: 2px;bottom: 2px;left: 2px;right: 2px;overflow:hidden;padding: 2px;margin-right: 1px; font-size: 13px;"),
                        e.add(".calendar_default_event_withheader .calendar_default_event_inner", "padding-top: 15px;"),
                        e.add(".calendar_default_event", "cursor: default;"),
                        e.add(".calendar_default_event_inner", "position: absolute;overflow: hidden;top: 0px;bottom: 0px;left: 0px;right: 0px;padding: 2px 2px 2px 8px; font-size: 13px;"),
                        e.add(".calendar_default_shadow_inner", "position:absolute;top:0px;left:0px;right:0px;bottom:0px;background-color: #666666; opacity: 0.5;"),
                        e.add(
                            ".calendar_default_event_delete",
                            "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAI5JREFUKFNtkLERgCAMRbmzdK8s4gAUlhYOYEHJEJYOYOEwDmGBPxC4kOPfvePy84MGR0RJ2N1A8H3N6DATwSQ57m2ql8NBG+AEM7D+UW+wjdfUPgerYNgB5gOLRHqhcasg84C2QxPMtrUhSqQIhg7ypy9VM2EUZPI/4rQ7rGxqo9sadTegw+UdjeDLAKUfhbaQUVPIfJYAAAAASUVORK5CYII=) center center no-repeat; opacity: 0.6; cursor: pointer;"
                        ),
                        e.add(".calendar_default_event_delete:hover", "opacity: 1;-ms-filter: none;"),
                        e.add(
                            ".calendar_default_scroll_up",
                            "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAB3RJTUUH2wESDiYcrhwCiQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAARnQU1BAACxjwv8YQUAAACcSURBVHjaY2AgF9wWsTW6yGMlhi7OhC7AyMDQzMnBXIpFHAFuCtuaMTP+P8nA8P/b1x//FfW/HHuF1UQmxv+NUP1c3OxMVVhNvCVi683E8H8LXOY/w9+fTH81tF8fv4NiIpBRj+YoZtZ/LDUoJmKYhsVUpv0MDiyMDP96sIYV0FS2/8z9ICaLlOhvS4b/jC//MzC8xBG0vJeF7GQBlK0xdiUzCtsAAAAASUVORK5CYII=);"
                        ),
                        e.add(
                            ".calendar_default_scroll_down",
                            "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAALiMAAC4jAXilP3YAAACqSURBVChTY7wpam3L9J+xmQEP+PGPKZZxP4MDi4zI78uMDIwa2NT+Z2DYovrmiC+TI8OBP/8ZmEqwGvif4e8vxr+FIDkmEKH25vBWBgbG0+iK/zEwLtF+ffwOXCGI8Y+BoRFFIdC030x/WmBiYBNhpgLdswNJ8RSYaSgmgk39z1gPUfj/29ef/9rwhQTDHRHbrbdEbLvRFcGthkkAra/9/uMvhkK8piNLAgCRpTnNn4AEmAAAAABJRU5ErkJggg==);"
                        ),
                        e.add(".calendar_default_now", "background-color: red;"),
                        e.add(
                            ".calendar_default_now:before",
                            "content: ''; top: -5px; border-width: 5px; border-color: transparent transparent transparent red; border-style: solid; width: 0px; height:0px; position: absolute; -moz-transform: scale(.9999);"
                        ),
                        e.add(".calendar_default_shadow_forbidden .calendar_default_shadow_inner", "background-color: red;"),
                        e.add(
                            ".calendar_default_shadow_top",
                            'box-sizing: border-box; padding:2px;border:1px solid #ccc;background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'
                        ),
                        e.add(
                            ".calendar_default_shadow_bottom",
                            'box-sizing: border-box; padding:2px;border:1px solid #ccc;background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'
                        ),
                        e.add(".calendar_default_crosshair_vertical, .calendar_default_crosshair_horizontal, .calendar_default_crosshair_left, .calendar_default_crosshair_top", "background-color: gray; opacity: 0.2;"),
                        e.add(".calendar_default_loading", "background-color: orange; color: white; padding: 2px;"),
                        e.add(".calendar_default_scroll", "background-color: #f3f3f3;"),
                        e.add(".scheduler_default_selected .scheduler_default_event_inner", "background: #ddd;"),
                        e.add(".scheduler_default_main", "border: 1px solid #c0c0c0;font-family: -apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size: 13px;"),
                        e.add(".scheduler_default_timeheader", "cursor: default;color: #333;"),
                        e.add(".scheduler_default_message", "opacity: 0.9;filter: alpha(opacity=90);padding: 10px; color: #ffffff;background: #ffa216;"),
                        e.add(".scheduler_default_timeheadergroup,.scheduler_default_timeheadercol", "color: #333;background: #f3f3f3;"),
                        e.add(".scheduler_default_rowheader,.scheduler_default_corner", "color: #333;background: #f3f3f3;"),
                        e.add(".scheduler_default_rowheader_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #eee;padding: 2px;"),
                        e.add(".scheduler_default_timeheadergroup, .scheduler_default_timeheadercol", "text-align: center;"),
                        e.add(".scheduler_default_timeheadergroup_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;"),
                        e.add(".scheduler_default_timeheadercol_inner", "position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;border-right: 1px solid #c0c0c0;"),
                        e.add(".scheduler_default_divider", "background-color: #c0c0c0;"),
                        e.add(".scheduler_default_divider_horizontal", "background-color: #c0c0c0;"),
                        e.add(".scheduler_default_matrix_vertical_line", "background-color: #eee;"),
                        e.add(".scheduler_default_matrix_vertical_break", "background-color: #000;"),
                        e.add(".scheduler_default_matrix_horizontal_line", "background-color: #eee;"),
                        e.add(".scheduler_default_resourcedivider", "background-color: #c0c0c0;"),
                        e.add(".scheduler_default_shadow_inner", "background-color: #666666;opacity: 0.5;filter: alpha(opacity=50);height: 100%;xborder-radius: 5px;"),
                        e.add(".scheduler_default_event", "color:#333; font-size: 13px;"),
                        e.add(".scheduler_default_event_inner", "position:absolute;top:0px;left:0px;right:0px;bottom:0px;padding:5px 2px 2px 2px;overflow:hidden;border:1px solid #ccc;"),
                        e.add(".scheduler_default_event_bar", "top:0px;left:0px;right:0px;height:4px;background-color:#9dc8e8;"),
                        e.add(".scheduler_default_event_bar_inner", "position:absolute;height:4px;background-color:#1066a8;"),
                        e.add(
                            ".scheduler_default_event_inner",
                            'background:#fff;background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#eeeeee));background: -webkit-linear-gradient(top, #ffffff 0%, #eeeeee);background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee);background: -ms-linear-gradient(top, #ffffff 0%, #eeeeee);background: -o-linear-gradient(top, #ffffff 0%, #eeeeee);background: linear-gradient(top, #ffffff 0%, #eeeeee);filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="#ffffff", endColorStr="#eeeeee");'
                        ),
                        e.add(".scheduler_default_event_float_inner", "padding:6px 2px 2px 8px;"),
                        e.add(".scheduler_default_event_float_inner:after", 'content:"";border-color: transparent #666 transparent transparent;border-style:solid;border-width:5px;width:0;height:0;position:absolute;top:8px;left:-4px;'),
                        e.add(".scheduler_default_columnheader_inner", "font-weight: bold;"),
                        e.add(".scheduler_default_columnheader_splitter", "background-color: #666;opacity: 0.5;filter: alpha(opacity=50);"),
                        e.add(".scheduler_default_columnheader_cell_inner", "padding: 2px;"),
                        e.add(".scheduler_default_cell", "background-color: #f9f9f9;"),
                        e.add(".scheduler_default_cell.scheduler_default_cell_business", "background-color: #fff;"),
                        e.add(".navigator_default_main", "border-left: 1px solid #c0c0c0;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;background-color: white;color: #000000; box-sizing: content-box;"),
                        e.add(".navigator_default_main *, .navigator_default_main *:before, .navigator_default_main *:after", "box-sizing: content-box;"),
                        e.add(".navigator_default_month", "font-family: -apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size: 12px;"),
                        e.add(".navigator_default_day", "color: black;"),
                        e.add(".navigator_default_weekend", "background-color: #f0f0f0;"),
                        e.add(".navigator_default_dayheader", "color: black;"),
                        e.add(".navigator_default_line", "border-bottom: 1px solid #c0c0c0;"),
                        e.add(".navigator_default_dayother", "color: gray;"),
                        e.add(".navigator_default_todaybox", "border: 1px solid red;"),
                        e.add(".navigator_default_title, .navigator_default_titleleft, .navigator_default_titleright", "border-top: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;color: #333;background: #f3f3f3;"),
                        e.add(".navigator_default_busy", "font-weight: bold;"),
                        e.add(".navigator_default_cell", "text-align: center;"),
                        e.add(".navigator_default_select .navigator_default_cell_box", "background-color: #FFE794; opacity: 0.5;"),
                        e.add(".navigator_default_title", "text-align: center;"),
                        e.add(".navigator_default_titleleft, .navigator_default_titleright", "text-align: center;"),
                        e.add(".navigator_default_dayheader", "text-align: center;"),
                        e.add(".navigator_default_weeknumber", "text-align: center; color: #999;"),
                        e.add(".navigator_default_cell_text", "cursor: pointer;"),
                        e.add(".month_default_main", "border: 1px solid #c0c0c0;font-family: -apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; font-size: 13px;color: #333;"),
                        e.add(".month_default_main *, .month_default_main *:before, .month_default_main *:after", "box-sizing: content-box;"),
                        e.add(".month_default_cell_inner", "border-right: 1px solid #ddd;border-bottom: 1px solid #ddd;position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;background-color: #f5f5f5;"),
                        e.add(".month_default_cell_business .month_default_cell_inner", "background-color: #fff;"),
                        e.add(".month_default_cell_business .month_default_cell_inner_colored", "background-color: #FFFFAA;"),
                        e.add(".month_default_cell_header", "text-align: right; padding: 4px; box-sizing: border-box;"),
                        e.add(
                            ".month_default_header_inner",
                            "position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;cursor: default;color: var(--clr-light);background-color: var(--clr-accent); overflow:hidden; display: flex; align-items: center; justify-content: center;"
                        ),
                        e.add(".month_default_message", "padding: 10px;opacity: 0.9; color: #ffffff;background: #ffa216;"),
                        e.add(
                            ".month_default_event_inner",
                            "position: absolute;top: 0px;bottom: 0px;left: 1px;right: 1px;overflow:hidden;padding: 2px;padding-left: 10px;color: #333;background: #fff;background: linear-gradient(to bottom, #ffffff 0%, #eeeeee);border: 1px solid #999;border-radius: 0px;display: flex; align-items: center; font-size: 13px;"
                        ),
                        e.add(".month_default_event_continueright .month_default_event_inner", "border-top-right-radius: 0px;border-bottom-right-radius: 0px;border-right-style: dotted;"),
                        e.add(".month_default_event_continueleft .month_default_event_inner", "border-top-left-radius: 0px;border-bottom-left-radius: 0px;border-left-style: dotted;"),
                        e.add(".month_default_event_bar", "top: 0px;bottom: 0px;left: 0px;width: 6px;"),
                        e.add(".month_default_event_bar_inner", "position: absolute;width: 6px;background-color: #1066a8;"),
                        e.add(".month_default_event_continueleft .month_default_event_bar", "display: none;"),
                        e.add(".month_default_selected .month_default_event_inner", "background: #ddd;"),
                        e.add(".month_default_shadow_inner", "background-color: #666666;opacity: 0.5;height: 100%;"),
                        e.add(
                            ".month_default_event_delete",
                            "background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAI5JREFUKFNtkLERgCAMRbmzdK8s4gAUlhYOYEHJEJYOYOEwDmGBPxC4kOPfvePy84MGR0RJ2N1A8H3N6DATwSQ57m2ql8NBG+AEM7D+UW+wjdfUPgerYNgB5gOLRHqhcasg84C2QxPMtrUhSqQIhg7ypy9VM2EUZPI/4rQ7rGxqo9sadTegw+UdjeDLAKUfhbaQUVPIfJYAAAAASUVORK5CYII=) center center no-repeat; opacity: 0.6; cursor: pointer;"
                        ),
                        e.add(".month_default_event_delete:hover", "opacity: 1;-ms-filter: none;"),
                    e.add(".month_default_event_timeleft", "color: #ccc; font-size: 8pt"),
                    e.add(".month_default_event_timeright", "color: #ccc; font-size: 8pt; text-align: right;"),
                    e.add(".month_default_loading", "background-color: orange; color: white; padding: 2px;"),
                    e.commit(),
                    (DayPilot.Global.defaultCss = !0);
                }
            })(),
            (DayPilot.doc = function () {
                var e = document.documentElement;
                return e && e.clientHeight ? e : document.body;
            }),
            (DayPilot.guid = function () {
                var e = function () {
                    return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
                };
                return "" + e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
            }),
            (DayPilot.pageOffset = function () {
                if ("undefined" != typeof pageXOffset) return { x: pageXOffset, y: pageYOffset };
                var e = DayPilot.doc();
                return { x: e.scrollLeft, y: e.scrollTop };
            }),
            (DayPilot.indexOf = function (e, t) {
                if (!e || !e.length) return -1;
                for (var a = 0; a < e.length; a++) if (e[a] === t) return a;
                return -1;
            }),
            (DayPilot.mc = function (e) {
                return e.pageX || e.pageY ? { x: e.pageX, y: e.pageY } : { x: e.clientX + document.documentElement.scrollLeft, y: e.clientY + document.documentElement.scrollTop };
            }),
            (DayPilot.Stats = {}),
            (DayPilot.Stats.eventObjects = 0),
            (DayPilot.Stats.dateObjects = 0),
            (DayPilot.Stats.cacheHitsCtor = 0),
            (DayPilot.Stats.cacheHitsParsing = 0),
            (DayPilot.Stats.cacheHitsTicks = 0),
            (DayPilot.Stats.print = function () {
                console.log("DayPilot.Stats.eventObjects: " + DayPilot.Stats.eventObjects),
                    console.log("DayPilot.Stats.dateObjects: " + DayPilot.Stats.dateObjects),
                    console.log("DayPilot.Stats.cacheHitsCtor: " + DayPilot.Stats.cacheHitsCtor),
                    console.log("DayPilot.Stats.cacheHitsParsing: " + DayPilot.Stats.cacheHitsParsing),
                    console.log("DayPilot.Stats.cacheHitsTicks: " + DayPilot.Stats.cacheHitsTicks),
                    console.log("DayPilot.Date.Cache.Ctor keys: " + Object.keys(DayPilot.Date.Cache.Ctor).length),
                    console.log("DayPilot.Date.Cache.Parsing keys: " + Object.keys(DayPilot.Date.Cache.Parsing).length);
            }),
            (DayPilot.re = function (e, t, a) {
                e.addEventListener ? e.addEventListener(t, a, !1) : e.attachEvent && e.attachEvent("on" + t, a);
            }),
            (DayPilot.pu = function (e) {
                var t,
                    a,
                    r,
                    o = e.attributes;
                if (o) for (a = o.length, t = 0; t < a; t += 1) o[t] && ((r = o[t].name), "function" == typeof e[r] && (e[r] = null));
                if ((o = e.childNodes))
                    for (a = o.length, t = 0; t < a; t += 1) {
                        DayPilot.pu(e.childNodes[t]);
                    }
            }),
            (DayPilot.de = function (e) {
                if (e)
                    if (DayPilot.isArray(e)) for (var t = 0; t < e.length; t++) DayPilot.de(e[t]);
                    else e.parentNode && e.parentNode.removeChild(e);
            }),
            (DayPilot.sw = function (e) {
                return e ? e.offsetWidth - e.clientWidth : 0;
            }),
            (DayPilot.am = function () {
                return "undefined" == typeof angular ? null : (DayPilot.am.cached || (DayPilot.am.cached = angular.module("daypilot", [])), DayPilot.am.cached);
            }),
            (DayPilot.Selection = function (e, t, a, r) {
                (this.type = "selection"),
                    (this.start = e.isDayPilotDate ? e : new DayPilot.Date(e)),
                    (this.end = t.isDayPilotDate ? t : new DayPilot.Date(t)),
                    (this.resource = a),
                    (this.root = r),
                    (this.toJSON = function (e) {
                        var t = {};
                        return (t.start = this.start), (t.end = this.end), (t.resource = this.resource), t;
                    });
            }),
            (DayPilot.request = function (e, t, a, r) {
                var o = DayPilot.createXmlHttp();
                o &&
                (o.open("POST", e, !0),
                    o.setRequestHeader("Content-type", "text/plain"),
                    (o.onreadystatechange = function () {
                        if (4 === o.readyState) return 200 !== o.status && 304 !== o.status ? void (r ? r(o) : window.console && console.log("HTTP error " + o.status)) : void t(o);
                    }),
                4 !== o.readyState && ("object" == typeof a && (a = JSON.stringify(a)), o.send(a)));
            }),
            (DayPilot.ajax = function (e) {
                if (!e) throw new DayPilot.Exception("Parameter object required.");
                if ("string" != typeof e.url) throw new DayPilot.Exception("The parameter object must have 'url' property.");
                var t = DayPilot.createXmlHttp();
                if (!t) throw new DayPilot.Exception("Unable to create XMLHttpRequest object");
                var a = "object" == typeof e.data,
                    r = e.data,
                    o = e.method || (e.data ? "POST" : "GET"),
                    n = e.success || function () {},
                    i = e.error || function () {},
                    d = e.url,
                    l = e.contentType || (a ? "application/json" : "text/plain"),
                    s = e.headers || {};
                t.open(o, d, !0),
                    t.setRequestHeader("Content-type", l),
                    DayPilot.Util.ownPropsAsArray(s).forEach(function (e) {
                        t.setRequestHeader(e.key, e.val);
                    }),
                    (t.onreadystatechange = function () {
                        if (4 === t.readyState)
                            if (200 === t.status || 201 === t.status || 204 === t.status || 304 === t.status) {
                                var e = {};
                                (e.request = t), t.responseText && (e.data = JSON.parse(t.responseText)), n(e);
                            } else if (i) {
                                var e = {};
                                (e.request = t), i(e);
                            } else window.console && console.log("HTTP error " + t.status);
                    }),
                4 !== t.readyState && (a && (r = JSON.stringify(r)), t.send(r));
            }),
            (DayPilot.createXmlHttp = function () {
                return new XMLHttpRequest();
            }),
            (DayPilot.Http = {}),
            (DayPilot.Http.ajax = function (e) {
                DayPilot.ajax(e);
            }),
            (DayPilot.Http.get = function (e, t) {
                return (
                    (t = t || {}),
                        new Promise(function (a, r) {
                            var o = {};
                            (o.url = e),
                                (o.method = "GET"),
                                (o.success = function (e) {
                                    a(e);
                                }),
                                (o.error = function (e) {
                                    r(e);
                                }),
                                (o.contentType = t.contentType),
                                (o.headers = t.headers),
                                DayPilot.ajax(o);
                        })
                );
            }),
            (DayPilot.Http.post = function (e, t, a) {
                return (
                    (a = a || {}),
                        new Promise(function (r, o) {
                            var n = {};
                            (n.url = e),
                                (n.method = "POST"),
                                (n.data = t),
                                (n.success = function (e) {
                                    r(e);
                                }),
                                (n.error = function (e) {
                                    o(e);
                                }),
                                (n.contentType = a.contentType),
                                (n.headers = a.headers),
                                DayPilot.ajax(n);
                        })
                );
            }),
            (DayPilot.Http.put = function (e, t, a) {
                return (
                    (a = a || {}),
                        new Promise(function (r, o) {
                            var n = {};
                            (n.url = e),
                                (n.method = "PUT"),
                                (n.data = t),
                                (n.success = function (e) {
                                    r(e);
                                }),
                                (n.error = function (e) {
                                    o(e);
                                }),
                                (n.contentType = a.contentType),
                                (n.headers = a.headers),
                                DayPilot.ajax(n);
                        })
                );
            }),
            (DayPilot.Http.delete = function (e, t) {
                return (
                    (t = t || {}),
                        new Promise(function (a, r) {
                            var o = {};
                            (o.url = e),
                                (o.method = "DELETE"),
                                (o.success = function (e) {
                                    a(e);
                                }),
                                (o.error = function (e) {
                                    r(e);
                                }),
                                (o.contentType = t.contentType),
                                (o.headers = t.headers),
                                DayPilot.ajax(o);
                        })
                );
            }),
            (DayPilot.Util = {}),
            (DayPilot.Util.addClass = function (e, t) {
                if (e) {
                    if (!e.className) return void (e.className = t);
                    new RegExp("(^|\\s)" + t + "($|\\s)").test(e.className) || (e.className = e.className + " " + t);
                }
            }),
            (DayPilot.Util.removeClass = function (e, t) {
                if (e) {
                    var a = new RegExp("(^|\\s)" + t + "($|\\s)");
                    e.className = e.className
                        .replace(a, " ")
                        .replace(/^\s\s*/, "")
                        .replace(/\s\s*$/, "");
                }
            }),
            (DayPilot.Util.ownPropsAsArray = function (e) {
                var t = [];
                if (!e) return t;
                for (var a in e)
                    if (e.hasOwnProperty(a)) {
                        var r = {};
                        (r.key = a), (r.val = e[a]), t.push(r);
                    }
                return t;
            }),
            (DayPilot.Util.replaceCharAt = function (e, t, a) {
                return e.substr(0, t) + a + e.substr(t + a.length);
            }),
            (DayPilot.Util.isNullOrUndefined = function (e) {
                return null === e || "undefined" == typeof e;
            }),
            (DayPilot.Util.escapeHtml = function (e) {
                var t = document.createElement("div");
                return (t.innerText = e), t.innerHTML;
            }),
            (DayPilot.Util.escapeTextHtml = function (e, t) {
                return DayPilot.Util.isNullOrUndefined(t) ? (DayPilot.Util.isNullOrUndefined(e) ? "" : DayPilot.Util.escapeHtml(e)) : t;
            }),
            (DayPilot.Exception = function (e) {
                return new Error(e);
            }),
            (DayPilot.Locale = function (e, t) {
                if (
                    ((this.id = e),
                        (this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]),
                        (this.dayNamesShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]),
                        (this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]),
                        (this.datePattern = "M/d/yyyy"),
                        (this.timePattern = "H:mm"),
                        (this.dateTimePattern = "M/d/yyyy H:mm"),
                        (this.timeFormat = "Clock12Hours"),
                        (this.weekStarts = 0),
                        t)
                )
                    for (var a in t) this[a] = t[a];
            }),
            (DayPilot.Locale.all = {}),
            (DayPilot.Locale.find = function (e) {
                if (!e) return null;
                var t = e.toLowerCase();
                return t.length > 2 && (t = DayPilot.Util.replaceCharAt(t, 2, "-")), DayPilot.Locale.all[t];
            }),
            (DayPilot.Locale.register = function (e) {
                DayPilot.Locale.all[e.id] = e;
            }),
            DayPilot.Locale.register(
                new DayPilot.Locale("ca-es", {
                    dayNames: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
                    dayNamesShort: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
                    monthNames: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre", ""],
                    monthNamesShort: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des.", ""],
                    timePattern: "H:mm",
                    datePattern: "dd/MM/yyyy",
                    dateTimePattern: "dd/MM/yyyy H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("cs-cz", {
                    dayNames: ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"],
                    dayNamesShort: ["ne", "po", "út", "st", "čt", "pá", "so"],
                    monthNames: ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec", ""],
                    monthNamesShort: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", ""],
                    timePattern: "H:mm",
                    datePattern: "d. M. yyyy",
                    dateTimePattern: "d. M. yyyy H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("da-dk", {
                    dayNames: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
                    dayNamesShort: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
                    monthNames: ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december", ""],
                    monthNamesShort: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd-MM-yyyy",
                    dateTimePattern: "dd-MM-yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("de-at", {
                    dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                    dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                    monthNames: ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
                    monthNamesShort: ["Jän", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd.MM.yyyy",
                    dateTimePattern: "dd.MM.yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("de-ch", {
                    dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                    dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                    monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
                    monthNamesShort: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd.MM.yyyy",
                    dateTimePattern: "dd.MM.yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("de-de", {
                    dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                    dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                    monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
                    monthNamesShort: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd.MM.yyyy",
                    dateTimePattern: "dd.MM.yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("de-lu", {
                    dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                    dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                    monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],
                    monthNamesShort: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd.MM.yyyy",
                    dateTimePattern: "dd.MM.yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("en-au", {
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
                    timePattern: "h:mm tt",
                    datePattern: "d/MM/yyyy",
                    dateTimePattern: "d/MM/yyyy h:mm tt",
                    timeFormat: "Clock12Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("en-ca", {
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
                    timePattern: "h:mm tt",
                    datePattern: "yyyy-MM-dd",
                    dateTimePattern: "yyyy-MM-dd h:mm tt",
                    timeFormat: "Clock12Hours",
                    weekStarts: 0,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("en-gb", {
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd/MM/yyyy",
                    dateTimePattern: "dd/MM/yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("en-us", {
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],
                    timePattern: "h:mm tt",
                    datePattern: "M/d/yyyy",
                    dateTimePattern: "M/d/yyyy h:mm tt",
                    timeFormat: "Clock12Hours",
                    weekStarts: 0,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("es-es", {
                    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
                    dayNamesShort: ["D", "L", "M", "X", "J", "V", "S"],
                    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre", ""],
                    monthNamesShort: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic.", ""],
                    timePattern: "H:mm",
                    datePattern: "dd/MM/yyyy",
                    dateTimePattern: "dd/MM/yyyy H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("es-mx", {
                    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
                    dayNamesShort: ["do.", "lu.", "ma.", "mi.", "ju.", "vi.", "sá."],
                    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre", ""],
                    monthNamesShort: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic.", ""],
                    timePattern: "hh:mm tt",
                    datePattern: "dd/MM/yyyy",
                    dateTimePattern: "dd/MM/yyyy hh:mm tt",
                    timeFormat: "Clock12Hours",
                    weekStarts: 0,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("eu-es", {
                    dayNames: ["igandea", "astelehena", "asteartea", "asteazkena", "osteguna", "ostirala", "larunbata"],
                    dayNamesShort: ["ig", "al", "as", "az", "og", "or", "lr"],
                    monthNames: ["urtarrila", "otsaila", "martxoa", "apirila", "maiatza", "ekaina", "uztaila", "abuztua", "iraila", "urria", "azaroa", "abendua", ""],
                    monthNamesShort: ["urt.", "ots.", "mar.", "api.", "mai.", "eka.", "uzt.", "abu.", "ira.", "urr.", "aza.", "abe.", ""],
                    timePattern: "H:mm",
                    datePattern: "yyyy/MM/dd",
                    dateTimePattern: "yyyy/MM/dd H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("fi-fi", {
                    dayNames: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
                    dayNamesShort: ["su", "ma", "ti", "ke", "to", "pe", "la"],
                    monthNames: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu", ""],
                    monthNamesShort: ["tammi", "helmi", "maalis", "huhti", "touko", "kesä", "heinä", "elo", "syys", "loka", "marras", "joulu", ""],
                    timePattern: "H:mm",
                    datePattern: "d.M.yyyy",
                    dateTimePattern: "d.M.yyyy H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("fr-be", {
                    dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
                    dayNamesShort: ["di", "lu", "ma", "me", "je", "ve", "sa"],
                    monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", ""],
                    monthNamesShort: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd-MM-yy",
                    dateTimePattern: "dd-MM-yy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("fr-ch", {
                    dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
                    dayNamesShort: ["di", "lu", "ma", "me", "je", "ve", "sa"],
                    monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", ""],
                    monthNamesShort: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd.MM.yyyy",
                    dateTimePattern: "dd.MM.yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("fr-fr", {
                    dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
                    dayNamesShort: ["di", "lu", "ma", "me", "je", "ve", "sa"],
                    monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", ""],
                    monthNamesShort: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd/MM/yyyy",
                    dateTimePattern: "dd/MM/yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("fr-lu", {
                    dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
                    dayNamesShort: ["di", "lu", "ma", "me", "je", "ve", "sa"],
                    monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", ""],
                    monthNamesShort: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd/MM/yyyy",
                    dateTimePattern: "dd/MM/yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("gl-es", {
                    dayNames: ["domingo", "luns", "martes", "mércores", "xoves", "venres", "sábado"],
                    dayNamesShort: ["do", "lu", "ma", "mé", "xo", "ve", "sá"],
                    monthNames: ["xaneiro", "febreiro", "marzo", "abril", "maio", "xuño", "xullo", "agosto", "setembro", "outubro", "novembro", "decembro", ""],
                    monthNamesShort: ["xan", "feb", "mar", "abr", "maio", "xuño", "xul", "ago", "set", "out", "nov", "dec", ""],
                    timePattern: "H:mm",
                    datePattern: "dd/MM/yyyy",
                    dateTimePattern: "dd/MM/yyyy H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("it-it", {
                    dayNames: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
                    dayNamesShort: ["do", "lu", "ma", "me", "gi", "ve", "sa"],
                    monthNames: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre", ""],
                    monthNamesShort: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd/MM/yyyy",
                    dateTimePattern: "dd/MM/yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("it-ch", {
                    dayNames: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
                    dayNamesShort: ["do", "lu", "ma", "me", "gi", "ve", "sa"],
                    monthNames: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre", ""],
                    monthNamesShort: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd.MM.yyyy",
                    dateTimePattern: "dd.MM.yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("ja-jp", {
                    dayNames: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
                    dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
                    monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""],
                    monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""],
                    timePattern: "H:mm",
                    datePattern: "yyyy/MM/dd",
                    dateTimePattern: "yyyy/MM/dd H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 0,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("nb-no", {
                    dayNames: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
                    dayNamesShort: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
                    monthNames: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember", ""],
                    monthNamesShort: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd.MM.yyyy",
                    dateTimePattern: "dd.MM.yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("nl-nl", {
                    dayNames: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
                    dayNamesShort: ["zo", "ma", "di", "wo", "do", "vr", "za"],
                    monthNames: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december", ""],
                    monthNamesShort: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],
                    timePattern: "HH:mm",
                    datePattern: "d-M-yyyy",
                    dateTimePattern: "d-M-yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("nl-be", {
                    dayNames: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
                    dayNamesShort: ["zo", "ma", "di", "wo", "do", "vr", "za"],
                    monthNames: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december", ""],
                    monthNamesShort: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],
                    timePattern: "H:mm",
                    datePattern: "d/MM/yyyy",
                    dateTimePattern: "d/MM/yyyy H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("nn-no", {
                    dayNames: ["søndag", "måndag", "tysdag", "onsdag", "torsdag", "fredag", "laurdag"],
                    dayNamesShort: ["sø", "må", "ty", "on", "to", "fr", "la"],
                    monthNames: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember", ""],
                    monthNamesShort: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd.MM.yyyy",
                    dateTimePattern: "dd.MM.yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("pt-br", {
                    dayNames: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
                    dayNamesShort: ["D", "S", "T", "Q", "Q", "S", "S"],
                    monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro", ""],
                    monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd/MM/yyyy",
                    dateTimePattern: "dd/MM/yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 0,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("pl-pl", {
                    dayNames: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"],
                    dayNamesShort: ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
                    monthNames: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień", ""],
                    monthNamesShort: ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru", ""],
                    timePattern: "HH:mm",
                    datePattern: "yyyy-MM-dd",
                    dateTimePattern: "yyyy-MM-dd HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("pt-pt", {
                    dayNames: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
                    dayNamesShort: ["D", "S", "T", "Q", "Q", "S", "S"],
                    monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro", ""],
                    monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez", ""],
                    timePattern: "HH:mm",
                    datePattern: "dd/MM/yyyy",
                    dateTimePattern: "dd/MM/yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 0,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("ro-ro", {
                    dayNames: ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"],
                    dayNamesShort: ["D", "L", "Ma", "Mi", "J", "V", "S"],
                    monthNames: ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie", ""],
                    monthNamesShort: ["ian.", "feb.", "mar.", "apr.", "mai.", "iun.", "iul.", "aug.", "sep.", "oct.", "nov.", "dec.", ""],
                    timePattern: "H:mm",
                    datePattern: "dd.MM.yyyy",
                    dateTimePattern: "dd.MM.yyyy H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("ru-ru", {
                    dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
                    dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ""],
                    monthNamesShort: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""],
                    timePattern: "H:mm",
                    datePattern: "dd.MM.yyyy",
                    dateTimePattern: "dd.MM.yyyy H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("sk-sk", {
                    dayNames: ["nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota"],
                    dayNamesShort: ["ne", "po", "ut", "st", "št", "pi", "so"],
                    monthNames: ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december", ""],
                    monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""],
                    timePattern: "H:mm",
                    datePattern: "d.M.yyyy",
                    dateTimePattern: "d.M.yyyy H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("sv-se", {
                    dayNames: ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"],
                    dayNamesShort: ["sö", "må", "ti", "on", "to", "fr", "lö"],
                    monthNames: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december", ""],
                    monthNamesShort: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],
                    timePattern: "HH:mm",
                    datePattern: "yyyy-MM-dd",
                    dateTimePattern: "yyyy-MM-dd HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("tr-tr", {
                    dayNames: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
                    dayNamesShort: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
                    monthNames: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık", ""],
                    monthNamesShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara", ""],
                    timePattern: "HH:mm",
                    datePattern: "d.M.yyyy",
                    dateTimePattern: "d.M.yyyy HH:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("uk-ua", {
                    dayNames: ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"],
                    dayNamesShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                    monthNames: ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень", ""],
                    monthNamesShort: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру", ""],
                    timePattern: "H:mm",
                    datePattern: "dd.MM.yyyy",
                    dateTimePattern: "dd.MM.yyyy H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            DayPilot.Locale.register(
                new DayPilot.Locale("zh-cn", {
                    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                    dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
                    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""],
                    monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""],
                    timePattern: "H:mm",
                    datePattern: "yyyy/M/d",
                    dateTimePattern: "yyyy/M/d H:mm",
                    timeFormat: "Clock24Hours",
                    weekStarts: 1,
                })
            ),
            (DayPilot.Locale.US = DayPilot.Locale.find("en-us")),
            (DayPilot.Duration = function (e) {
                var t = this,
                    a = 864e5,
                    r = 36e5,
                    o = 6e4,
                    n = 1e3;
                if (2 === arguments.length) {
                    var i = arguments[0],
                        d = arguments[1];
                    if (!(i instanceof DayPilot.Date) && "string" != typeof i) throw "DayPilot.Duration(): Invalid start argument, DayPilot.Date expected";
                    if (!(d instanceof DayPilot.Date) && "string" != typeof d) throw "DayPilot.Duration(): Invalid end argument, DayPilot.Date expected";
                    "string" == typeof i && (i = new DayPilot.Date(i)), "string" == typeof d && (d = new DayPilot.Date(d)), (e = d.getTime() - i.getTime());
                }
                return (
                    (this.ticks = e),
                        DayPilot.Date.Cache.DurationCtor["" + e]
                            ? DayPilot.Date.Cache.DurationCtor["" + e]
                            : ((DayPilot.Date.Cache.DurationCtor["" + e] = this),
                                (this.toString = function (e) {
                                    if (!e) return t.days() + "." + t.hours() + ":" + t.minutes() + ":" + t.seconds() + "." + t.milliseconds();
                                    var a = t.minutes();
                                    a = (a < 10 ? "0" : "") + a;
                                    var r = e;
                                    return (r = r.replace("mm", a)), (r = r.replace("m", t.minutes())), (r = r.replace("H", t.hours())), (r = r.replace("h", t.hours())), (r = r.replace("d", t.days())), (r = r.replace("s", t.seconds()));
                                }),
                                (this.totalHours = function () {
                                    return t.ticks / r;
                                }),
                                (this.totalDays = function () {
                                    return t.ticks / a;
                                }),
                                (this.totalMinutes = function () {
                                    return t.ticks / o;
                                }),
                                (this.totalSeconds = function () {
                                    return t.ticks / n;
                                }),
                                (this.days = function () {
                                    return Math.floor(t.totalDays());
                                }),
                                (this.hours = function () {
                                    var e = t.ticks - t.days() * a;
                                    return Math.floor(e / r);
                                }),
                                (this.minutes = function () {
                                    var e = t.ticks - Math.floor(t.totalHours()) * r;
                                    return Math.floor(e / o);
                                }),
                                (this.seconds = function () {
                                    var e = t.ticks - Math.floor(t.totalMinutes()) * o;
                                    return Math.floor(e / n);
                                }),
                                void (this.milliseconds = function () {
                                    return t.ticks % n;
                                }))
                );
            }),
            (DayPilot.Duration.weeks = function (e) {
                return new DayPilot.Duration(1e3 * e * 60 * 60 * 24 * 7);
            }),
            (DayPilot.Duration.days = function (e) {
                return new DayPilot.Duration(1e3 * e * 60 * 60 * 24);
            }),
            (DayPilot.Duration.hours = function (e) {
                return new DayPilot.Duration(1e3 * e * 60 * 60);
            }),
            (DayPilot.Duration.minutes = function (e) {
                return new DayPilot.Duration(1e3 * e * 60);
            }),
            (DayPilot.Duration.seconds = function (e) {
                return new DayPilot.Duration(1e3 * e);
            }),
            (DayPilot.TimeSpan = function () {
                throw "Please use DayPilot.Duration class instead of DayPilot.TimeSpan.";
            });
        try {
            DayPilot.TimeSpan.prototype = Object.create(DayPilot.Duration.prototype);
        } catch (e) {}
        (DayPilot.Date = function (t, a) {
            if (t instanceof DayPilot.Date) return t;
            var r;
            DayPilot.Util.isNullOrUndefined(t) && ((r = DayPilot.DateUtil.fromLocal().getTime()), (t = r));
            var o = DayPilot.Date.Cache.Ctor;
            if (o[t]) return (DayPilot.Stats.cacheHitsCtor += 1), o[t];
            var n = !1;
            if ("string" == typeof t) (r = DayPilot.DateUtil.fromStringSortable(t, a).getTime()), (n = !0);
            else if ("number" == typeof t) {
                if (isNaN(t)) throw "Cannot create DayPilot.Date from NaN";
                r = t;
            } else {
                if (!(t instanceof Date)) throw "Unrecognized parameter: use Date, number or string in ISO 8601 format";
                r = a ? DayPilot.DateUtil.fromLocal(t).getTime() : t.getTime();
            }
            var i = e(r);
            return o[i]
                ? o[i]
                : ((o[i] = this),
                    (o[r] = this),
                n && i !== t && DayPilot.DateUtil.hasTzSpec(t) && (o[t] = this),
                    Object.defineProperty && !DayPilot.browser.ielt9
                        ? (Object.defineProperty(this, "ticks", {
                            get: function () {
                                return r;
                            },
                        }),
                            Object.defineProperty(this, "value", { value: i, writable: !1, enumerable: !0 }))
                        : ((this.ticks = r), (this.value = i)),
                DayPilot.Date.Config.legacyShowD && (this.d = new Date(r)),
                    void (DayPilot.Stats.dateObjects += 1));
        }),
            (DayPilot.Date.Config = {}),
            (DayPilot.Date.Config.legacyShowD = !1),
            (DayPilot.Date.Cache = {}),
            (DayPilot.Date.Cache.Parsing = {}),
            (DayPilot.Date.Cache.Ctor = {}),
            (DayPilot.Date.Cache.Ticks = {}),
            (DayPilot.Date.Cache.DurationCtor = {}),
            (DayPilot.Date.Cache.clear = function () {
                (DayPilot.Date.Cache.Parsing = {}), (DayPilot.Date.Cache.Ctor = {}), (DayPilot.Date.Cache.Ticks = {}), (DayPilot.Date.Cache.DurationCtor = {});
            }),
            (DayPilot.Date.prototype.addDays = function (e) {
                return e ? new DayPilot.Date(this.ticks + 24 * e * 60 * 60 * 1e3) : this;
            }),
            (DayPilot.Date.prototype.addHours = function (e) {
                return e ? this.addTime(60 * e * 60 * 1e3) : this;
            }),
            (DayPilot.Date.prototype.addMilliseconds = function (e) {
                return e ? this.addTime(e) : this;
            }),
            (DayPilot.Date.prototype.addMinutes = function (e) {
                return e ? this.addTime(60 * e * 1e3) : this;
            }),
            (DayPilot.Date.prototype.addMonths = function (e) {
                if (!e) return this;
                var t = new Date(this.ticks),
                    a = t.getUTCFullYear(),
                    r = t.getUTCMonth() + 1;
                if (e > 0) {
                    for (; e >= 12; ) (e -= 12), a++;
                    e > 12 - r ? (a++, (r = e - (12 - r))) : (r += e);
                } else {
                    for (; e <= -12; ) (e += 12), a--;
                    r + e <= 0 ? (a--, (r = 12 + r + e)) : (r += e);
                }
                var o = new Date(t.getTime());
                o.setUTCDate(1), o.setUTCFullYear(a), o.setUTCMonth(r - 1);
                var n = new DayPilot.Date(o).daysInMonth();
                return o.setUTCDate(Math.min(n, t.getUTCDate())), new DayPilot.Date(o);
            }),
            (DayPilot.Date.prototype.addSeconds = function (e) {
                return e ? this.addTime(1e3 * e) : this;
            }),
            (DayPilot.Date.prototype.addTime = function (e) {
                return e ? (e instanceof DayPilot.Duration && (e = e.ticks), new DayPilot.Date(this.ticks + e)) : this;
            }),
            (DayPilot.Date.prototype.addYears = function (e) {
                var t = new Date(this.ticks),
                    a = new Date(this.ticks),
                    r = this.getYear() + e,
                    o = this.getMonth();
                a.setUTCDate(1), a.setUTCFullYear(r), a.setUTCMonth(o);
                var n = new DayPilot.Date(a).daysInMonth();
                return a.setUTCDate(Math.min(n, t.getUTCDate())), new DayPilot.Date(a);
            }),
            (DayPilot.Date.prototype.dayOfWeek = function () {
                return new Date(this.ticks).getUTCDay();
            }),
            (DayPilot.Date.prototype.getDayOfWeek = function () {
                return new Date(this.ticks).getUTCDay();
            }),
            (DayPilot.Date.prototype.getDayOfYear = function () {
                var e = this.firstDayOfYear();
                return DayPilot.DateUtil.daysDiff(e, this) + 1;
            }),
            (DayPilot.Date.prototype.daysInMonth = function () {
                var e = new Date(this.ticks),
                    t = e.getUTCMonth() + 1,
                    a = e.getUTCFullYear(),
                    r = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                return 2 !== t ? r[t - 1] : a % 4 !== 0 ? r[1] : a % 100 === 0 && a % 400 !== 0 ? r[1] : r[1] + 1;
            }),
            (DayPilot.Date.prototype.daysInYear = function () {
                var e = this.getYear();
                return e % 4 !== 0 ? 365 : e % 100 === 0 && e % 400 !== 0 ? 365 : 366;
            }),
            (DayPilot.Date.prototype.dayOfYear = function () {
                return Math.ceil((this.getDatePart().getTime() - this.firstDayOfYear().getTime()) / 864e5) + 1;
            }),
            (DayPilot.Date.prototype.equals = function (e) {
                if (null === e) return !1;
                if (e instanceof DayPilot.Date) return this === e;
                throw "The parameter must be a DayPilot.Date object (DayPilot.Date.equals())";
            }),
            (DayPilot.Date.prototype.firstDayOfMonth = function () {
                var e = new Date();
                return e.setUTCFullYear(this.getYear(), this.getMonth(), 1), e.setUTCHours(0), e.setUTCMinutes(0), e.setUTCSeconds(0), e.setUTCMilliseconds(0), new DayPilot.Date(e);
            }),
            (DayPilot.Date.prototype.firstDayOfYear = function () {
                var e = this.getYear(),
                    t = new Date();
                return t.setUTCFullYear(e, 0, 1), t.setUTCHours(0), t.setUTCMinutes(0), t.setUTCSeconds(0), t.setUTCMilliseconds(0), new DayPilot.Date(t);
            }),
            (DayPilot.Date.prototype.firstDayOfWeek = function (e) {
                var t = this;
                if (e instanceof DayPilot.Locale) e = e.weekStarts;
                else if ("string" == typeof e && DayPilot.Locale.find(e)) {
                    var a = DayPilot.Locale.find(e);
                    e = a.weekStarts;
                } else e = e || 0;
                for (var r = t.dayOfWeek(); r !== e; ) (t = t.addDays(-1)), (r = t.dayOfWeek());
                return new DayPilot.Date(t);
            }),
            (DayPilot.Date.prototype.getDay = function () {
                return new Date(this.ticks).getUTCDate();
            }),
            (DayPilot.Date.prototype.getDatePart = function () {
                var e = new Date(this.ticks);
                return e.setUTCHours(0), e.setUTCMinutes(0), e.setUTCSeconds(0), e.setUTCMilliseconds(0), new DayPilot.Date(e);
            }),
            (DayPilot.Date.prototype.getYear = function () {
                return new Date(this.ticks).getUTCFullYear();
            }),
            (DayPilot.Date.prototype.getHours = function () {
                return new Date(this.ticks).getUTCHours();
            }),
            (DayPilot.Date.prototype.getMilliseconds = function () {
                return new Date(this.ticks).getUTCMilliseconds();
            }),
            (DayPilot.Date.prototype.getMinutes = function () {
                return new Date(this.ticks).getUTCMinutes();
            }),
            (DayPilot.Date.prototype.getMonth = function () {
                return new Date(this.ticks).getUTCMonth();
            }),
            (DayPilot.Date.prototype.getSeconds = function () {
                return new Date(this.ticks).getUTCSeconds();
            }),
            (DayPilot.Date.prototype.getTotalTicks = function () {
                return this.getTime();
            }),
            (DayPilot.Date.prototype.getTime = function () {
                return this.ticks;
            }),
            (DayPilot.Date.prototype.getTimePart = function () {
                var e = this.getDatePart();
                return DayPilot.DateUtil.diff(this, e);
            }),
            (DayPilot.Date.prototype.lastDayOfMonth = function () {
                var e = new Date(this.firstDayOfMonth().getTime()),
                    t = this.daysInMonth();
                return e.setUTCDate(t), new DayPilot.Date(e);
            }),
            (DayPilot.Date.prototype.weekNumber = function () {
                var e = this.firstDayOfYear(),
                    t = (this.getTime() - e.getTime()) / 864e5;
                return Math.ceil((t + e.dayOfWeek() + 1) / 7);
            }),
            (DayPilot.Date.prototype.weekNumberISO = function () {
                var e = !1,
                    t = this.dayOfYear(),
                    a = this.firstDayOfYear().dayOfWeek(),
                    r = this.firstDayOfYear().addYears(1).addDays(-1).dayOfWeek();
                0 === a && (a = 7), 0 === r && (r = 7);
                var o = 8 - a;
                (4 !== a && 4 !== r) || (e = !0);
                var n = Math.ceil((t - o) / 7),
                    i = n;
                return o >= 4 && (i += 1), i > 52 && !e && (i = 1), 0 === i && (i = this.firstDayOfYear().addDays(-1).weekNumberISO()), i;
            }),
            (DayPilot.Date.prototype.toDateLocal = function () {
                var e = new Date(this.ticks),
                    t = new Date();
                return t.setFullYear(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()), t.setHours(e.getUTCHours()), t.setMinutes(e.getUTCMinutes()), t.setSeconds(e.getUTCSeconds()), t.setMilliseconds(e.getUTCMilliseconds()), t;
            }),
            (DayPilot.Date.prototype.toDate = function () {
                return new Date(this.ticks);
            }),
            (DayPilot.Date.prototype.toJSON = function () {
                return this.value;
            }),
            (DayPilot.Date.prototype.toString = function (e, t) {
                return e ? new a(e, t).print(this) : this.toStringSortable();
            }),
            (DayPilot.Date.prototype.toStringSortable = function () {
                return e(this.ticks);
            }),
            (DayPilot.Date.parse = function (e, t, r) {
                return new a(t, r).parse(e);
            });
        (DayPilot.Date.today = function () {
            return new DayPilot.Date(DayPilot.DateUtil.localToday(), !0);
        }),
            (DayPilot.Date.now = function () {
                return new DayPilot.Date();
            }),
            (DayPilot.Date.fromYearMonthDay = function (e, t, a) {
                (t = t || 1), (a = a || 1);
                var r = new Date(0);
                return r.setUTCFullYear(e), r.setUTCMonth(t - 1), r.setUTCDate(a), new DayPilot.Date(r);
            }),
            (DayPilot.DateUtil = {}),
            (DayPilot.DateUtil.fromStringSortable = function (e, t) {
                if (!e) throw "Can't create DayPilot.Date from an empty string";
                var a = e.length,
                    r = 10 === a,
                    o = 19 === a,
                    n = a > 19;
                if (!r && !o && !n) throw "Invalid string format (use '2010-01-01' or '2010-01-01T00:00:00'): " + e;
                if (DayPilot.Date.Cache.Parsing[e] && !t) return (DayPilot.Stats.cacheHitsParsing += 1), DayPilot.Date.Cache.Parsing[e];
                var i = e.substring(0, 4),
                    d = e.substring(5, 7),
                    l = e.substring(8, 10),
                    s = new Date(0);
                if ((s.setUTCFullYear(i, d - 1, l), r)) return (DayPilot.Date.Cache.Parsing[e] = s), s;
                var u = e.substring(11, 13),
                    c = e.substring(14, 16),
                    f = e.substring(17, 19);
                if ((s.setUTCHours(u), s.setUTCMinutes(c), s.setUTCSeconds(f), o)) return (DayPilot.Date.Cache.Parsing[e] = s), s;
                var m = e[19],
                    y = 0;
                if ("." === m) {
                    var h = parseInt(e.substring(20, 23));
                    s.setUTCMilliseconds(h), (y = DayPilot.DateUtil.getTzOffsetMinutes(e.substring(23)));
                } else y = DayPilot.DateUtil.getTzOffsetMinutes(e.substring(19));
                var g = new DayPilot.Date(s);
                return t || (g = g.addMinutes(-y)), (s = g.toDate()), (DayPilot.Date.Cache.Parsing[e] = s), s;
            }),
            (DayPilot.DateUtil.getTzOffsetMinutes = function (e) {
                if (DayPilot.Util.isNullOrUndefined(e) || "" === e) return 0;
                if ("Z" === e) return 0;
                var t = e[0],
                    a = parseInt(e.substring(1, 3)),
                    r = parseInt(e.substring(4)),
                    o = 60 * a + r;
                if ("-" === t) return -o;
                if ("+" === t) return o;
                throw "Invalid timezone spec: " + e;
            }),
            (DayPilot.DateUtil.hasTzSpec = function (e) {
                return !!e.indexOf("+") || !!e.indexOf("-");
            }),
            (DayPilot.DateUtil.daysDiff = function (e, t) {
                if (
                    ((e && t) ||
                    (function () {
                        throw "two parameters required";
                    })(),
                        (e = new DayPilot.Date(e)),
                        (t = new DayPilot.Date(t)),
                    e.getTime() > t.getTime())
                )
                    return null;
                for (var a = 0, r = e.getDatePart(), o = t.getDatePart(); r < o; ) (r = r.addDays(1)), a++;
                return a;
            }),
            (DayPilot.DateUtil.daysSpan = function (e, t) {
                if (
                    ((e && t) ||
                    (function () {
                        throw "two parameters required";
                    })(),
                        (e = new DayPilot.Date(e)),
                        (t = new DayPilot.Date(t)),
                    e === t)
                )
                    return 0;
                var a = DayPilot.DateUtil.daysDiff(e, t);
                return t == t.getDatePart() && a--, a;
            }),
            (DayPilot.DateUtil.diff = function (e, t) {
                if (!(e && t && e.getTime && t.getTime)) throw "Both compared objects must be Date objects (DayPilot.Date.diff).";
                return e.getTime() - t.getTime();
            }),
            (DayPilot.DateUtil.fromLocal = function (e) {
                e || (e = new Date());
                var t = new Date();
                return t.setUTCFullYear(e.getFullYear(), e.getMonth(), e.getDate()), t.setUTCHours(e.getHours()), t.setUTCMinutes(e.getMinutes()), t.setUTCSeconds(e.getSeconds()), t.setUTCMilliseconds(e.getMilliseconds()), t;
            }),
            (DayPilot.DateUtil.localToday = function () {
                var e = new Date();
                return e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0), e;
            }),
            (DayPilot.DateUtil.hours = function (e, t) {
                var a = e.getUTCMinutes();
                a < 10 && (a = "0" + a);
                var r = e.getUTCHours();
                if (t) {
                    var o = r < 12,
                        r = r % 12;
                    0 === r && (r = 12);
                    return r + ":" + a + " " + (o ? "AM" : "PM");
                }
                return r + ":" + a;
            }),
            (DayPilot.DateUtil.max = function (e, t) {
                return e.getTime() > t.getTime() ? e : t;
            }),
            (DayPilot.DateUtil.min = function (e, t) {
                return e.getTime() < t.getTime() ? e : t;
            });
        var a = function (e, t) {
            "string" == typeof t && (t = DayPilot.Locale.find(t));
            var t = t || DayPilot.Locale.US,
                a = [
                    {
                        seq: "yyyy",
                        expr: "[0-9]{4,4}",
                        str: function (e) {
                            return e.getYear();
                        },
                    },
                    {
                        seq: "yy",
                        expr: "[0-9]{2,2}",
                        str: function (e) {
                            return e.getYear() % 100;
                        },
                    },
                    {
                        seq: "mm",
                        expr: "[0-9]{2,2}",
                        str: function (e) {
                            var t = e.getMinutes();
                            return t < 10 ? "0" + t : t;
                        },
                    },
                    {
                        seq: "m",
                        expr: "[0-9]{1,2}",
                        str: function (e) {
                            return e.getMinutes();
                        },
                    },
                    {
                        seq: "HH",
                        expr: "[0-9]{2,2}",
                        str: function (e) {
                            var t = e.getHours();
                            return t < 10 ? "0" + t : t;
                        },
                    },
                    {
                        seq: "H",
                        expr: "[0-9]{1,2}",
                        str: function (e) {
                            return e.getHours();
                        },
                    },
                    {
                        seq: "hh",
                        expr: "[0-9]{2,2}",
                        str: function (e) {
                            var t = e.getHours(),
                                t = t % 12;
                            0 === t && (t = 12);
                            var a = t;
                            return a < 10 ? "0" + a : a;
                        },
                    },
                    {
                        seq: "h",
                        expr: "[0-9]{1,2}",
                        str: function (e) {
                            var t = e.getHours(),
                                t = t % 12;
                            return 0 === t && (t = 12), t;
                        },
                    },
                    {
                        seq: "ss",
                        expr: "[0-9]{2,2}",
                        str: function (e) {
                            var t = e.getSeconds();
                            return t < 10 ? "0" + t : t;
                        },
                    },
                    {
                        seq: "s",
                        expr: "[0-9]{1,2}",
                        str: function (e) {
                            return e.getSeconds();
                        },
                    },
                    {
                        seq: "MMMM",
                        expr: "[^\\s0-9]*",
                        str: function (e) {
                            return t.monthNames[e.getMonth()];
                        },
                        transform: function (e) {
                            var a = DayPilot.indexOf(t.monthNames, e, equalsIgnoreCase);
                            return a < 0 ? null : a + 1;
                        },
                    },
                    {
                        seq: "MMM",
                        expr: "[^\\s0-9]*",
                        str: function (e) {
                            return t.monthNamesShort[e.getMonth()];
                        },
                        transform: function (e) {
                            var a = DayPilot.indexOf(t.monthNamesShort, e, equalsIgnoreCase);
                            return a < 0 ? null : a + 1;
                        },
                    },
                    {
                        seq: "MM",
                        expr: "[0-9]{2,2}",
                        str: function (e) {
                            var t = e.getMonth() + 1;
                            return t < 10 ? "0" + t : t;
                        },
                    },
                    {
                        seq: "M",
                        expr: "[0-9]{1,2}",
                        str: function (e) {
                            return e.getMonth() + 1;
                        },
                    },
                    {
                        seq: "dddd",
                        expr: "[^\\s0-9]*",
                        str: function (e) {
                            return t.dayNames[e.getDayOfWeek()];
                        },
                    },
                    {
                        seq: "ddd",
                        expr: "[^\\s0-9]*",
                        str: function (e) {
                            return t.dayNamesShort[e.getDayOfWeek()];
                        },
                    },
                    {
                        seq: "dd",
                        expr: "[0-9]{2,2}",
                        str: function (e) {
                            var t = e.getDay();
                            return t < 10 ? "0" + t : t;
                        },
                    },
                    {
                        seq: "%d",
                        expr: "[0-9]{1,2}",
                        str: function (e) {
                            return e.getDay();
                        },
                    },
                    {
                        seq: "d",
                        expr: "[0-9]{1,2}",
                        str: function (e) {
                            return e.getDay();
                        },
                    },
                    {
                        seq: "tt",
                        expr: "(AM|PM|am|pm)",
                        str: function (e) {
                            return e.getHours() < 12 ? "AM" : "PM";
                        },
                        transform: function (e) {
                            return e.toUpperCase();
                        },
                    },
                ],
                r = function (e) {
                    return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                };
            (this.init = function () {
                (this.year = this.findSequence("yyyy")),
                    (this.month = this.findSequence("MMMM") || this.findSequence("MMM") || this.findSequence("MM") || this.findSequence("M")),
                    (this.day = this.findSequence("dd") || this.findSequence("d")),
                    (this.hours = this.findSequence("HH") || this.findSequence("H")),
                    (this.minutes = this.findSequence("mm") || this.findSequence("m")),
                    (this.seconds = this.findSequence("ss") || this.findSequence("s")),
                    (this.ampm = this.findSequence("tt")),
                    (this.hours12 = this.findSequence("hh") || this.findSequence("h"));
            }),
                (this.findSequence = function (t) {
                    function o(e) {
                        return parseInt(e);
                    }
                    return e.indexOf(t) === -1
                        ? null
                        : {
                            findValue: function (n) {
                                for (var i = r(e), d = null, l = 0; l < a.length; l++) {
                                    var s = (a[l].length, t === a[l].seq),
                                        u = a[l].expr;
                                    s && ((u = "(" + u + ")"), (d = a[l].transform)), (i = i.replace(a[l].seq, u));
                                }
                                i = "^" + i + "$";
                                try {
                                    var c = new RegExp(i),
                                        f = c.exec(n);
                                    return f ? (d = d || o)(f[1]) : null;
                                } catch (e) {
                                    throw "unable to create regex from: " + i;
                                }
                            },
                        };
                }),
                (this.print = function (t) {
                    for (
                        var r = function (e) {
                                for (var t = 0; t < a.length; t++) if (a[t] && a[t].seq === e) return a[t];
                                return null;
                            },
                            o = e.length <= 0,
                            n = 0,
                            i = [];
                        !o;

                    ) {
                        var d = e.substring(n),
                            l = /%?(.)\1*/.exec(d);
                        if (l && l.length > 0) {
                            var s = l[0],
                                u = r(s);
                            u ? i.push(u) : i.push(s), (n += s.length), (o = e.length <= n);
                        } else o = !0;
                    }
                    for (var c = 0; c < i.length; c++) {
                        var f = i[c];
                        "string" != typeof f && (i[c] = f.str(t));
                    }
                    return i.join("");
                }),
                (this.parse = function (e) {
                    var t = this.year.findValue(e);
                    if (!t) return null;
                    var a = this.month.findValue(e);
                    if (DayPilot.Util.isNullOrUndefined(a)) return null;
                    if (a > 12 || a < 1) return null;
                    var r = this.day.findValue(e),
                        o = DayPilot.Date.fromYearMonthDay(t, a).daysInMonth();
                    if (r < 1 || r > o) return null;
                    var n = this.hours ? this.hours.findValue(e) : 0,
                        i = this.minutes ? this.minutes.findValue(e) : 0,
                        d = this.seconds ? this.seconds.findValue(e) : 0,
                        l = this.ampm ? this.ampm.findValue(e) : null;
                    if (this.ampm && this.hours12) {
                        var s = this.hours12.findValue(e);
                        if (s < 1 || s > 12) return null;
                        n = "PM" === l ? (12 === s ? 12 : s + 12) : 12 === s ? 0 : s;
                    }
                    if (n < 0 || n > 23) return null;
                    if (i < 0 || i > 59) return null;
                    if (d < 0 || d > 59) return null;
                    var u = new Date();
                    return u.setUTCFullYear(t, a - 1, r), u.setUTCHours(n), u.setUTCMinutes(i), u.setUTCSeconds(d), u.setUTCMilliseconds(0), new DayPilot.Date(u);
                }),
                this.init();
        };
        (DayPilot.ColorUtil = {}),
            (DayPilot.ColorUtil.hexToRgb = function (e) {
                if (!/^#[0-9a-f]{6}$/i.test(e)) throw new DayPilot.Exception("Invalid color, only full hex color string accepted, eg. '#ffaaff'.");
                return (e = e.replace("#", "")), { r: parseInt(e.substring(0, 2), 16), g: parseInt(e.substring(2, 4), 16), b: parseInt(e.substring(4, 6), 16) };
            }),
            (DayPilot.ColorUtil.rgbToHex = function (e) {
                return "#" + t(e.r) + t(e.g) + t(e.b);
            }),
            (DayPilot.ColorUtil.adjustLuminance = function (e, t) {
                return { r: e.r + t, g: e.g + t, b: e.b + t };
            }),
            (DayPilot.ColorUtil.darker = function (e, t) {
                var a = DayPilot.ColorUtil.hexToRgb(e);
                t = t || 1;
                var r = 17,
                    o = t * r,
                    n = DayPilot.ColorUtil.adjustLuminance(a, -o);
                return DayPilot.ColorUtil.rgbToHex(n);
            }),
            (DayPilot.Event = function (e, t, a) {
                var r = this;
                (this.calendar = t), (this.data = e ? e : {}), (this.part = a ? a : {}), "undefined" == typeof this.data.id && (this.data.id = this.data.value);
                var o = {},
                    n = ["id", "text", "start", "end", "resource"];
                (this.isEvent = !0),
                    (this.temp = function () {
                        if (o.dirty) return o;
                        for (var e = 0; e < n.length; e++) o[n[e]] = r.data[n[e]];
                        return (o.dirty = !0), o;
                    }),
                    (this.copy = function () {
                        for (var e = {}, t = 0; t < n.length; t++) e[n[t]] = r.data[n[t]];
                        return e;
                    }),
                    (this.commit = function () {
                        if (o.dirty) {
                            for (var e = 0; e < n.length; e++) r.data[n[e]] = o[n[e]];
                            o.dirty = !1;
                        }
                    }),
                    (this.dirty = function () {
                        return o.dirty;
                    }),
                    (this.id = function (e) {
                        return "undefined" == typeof e ? r.data.id : void (this.temp().id = e);
                    }),
                    (this.value = function (e) {
                        return "undefined" == typeof e ? r.id() : void r.id(e);
                    }),
                    (this.text = function (e) {
                        return "undefined" == typeof e ? r.data.text : ((this.temp().text = e), void this.client.innerHTML(e));
                    }),
                    (this.start = function (e) {
                        return "undefined" == typeof e ? new DayPilot.Date(r.data.start) : void (this.temp().start = new DayPilot.Date(e));
                    }),
                    (this.end = function (e) {
                        return "undefined" == typeof e ? new DayPilot.Date(r.data.end) : void (this.temp().end = new DayPilot.Date(e));
                    }),
                    (this.resource = function (e) {
                        return "undefined" == typeof e ? r.data.resource : void (this.temp().resource = e);
                    }),
                    (this.partStart = function () {
                        return new DayPilot.Date(this.part.start);
                    }),
                    (this.partEnd = function () {
                        return new DayPilot.Date(this.part.end);
                    }),
                    (this.tag = function (e) {
                        var t = r.data.tag;
                        if (!t) return null;
                        if ("undefined" == typeof e) return r.data.tag;
                        for (var a = r.calendar.tagFields, o = -1, n = 0; n < a.length; n++) e === a[n] && (o = n);
                        if (o === -1) throw "Field name not found.";
                        return t[o];
                    }),
                    (this.client = {}),
                    (this.client.innerHTML = function (e) {
                        if ("undefined" == typeof e) {
                            var t = r.cache || r.data,
                                a = r.calendar && r.calendar.internal && r.calendar.internal.xssTextHtml;
                            return a ? a(t.text, t.html) : DayPilot.Util.escapeTextHtml(t.text, t.html);
                        }
                        r.data.html = e;
                    }),
                    (this.client.html = this.client.innerHTML),
                    (this.client.header = function (e) {
                        return "undefined" == typeof e ? r.data.header : void (r.data.header = e);
                    }),
                    (this.client.cssClass = function (e) {
                        return "undefined" == typeof e ? r.data.cssClass : void (r.data.cssClass = e);
                    }),
                    (this.client.toolTip = function (e) {
                        return "undefined" == typeof e ? (r.cache && "undefined" != typeof r.cache.toolTip ? r.cache.toolTip : "undefined" != typeof r.data.toolTip ? r.data.toolTip : r.data.text) : void (r.data.toolTip = e);
                    }),
                    (this.client.barVisible = function (e) {
                        return "undefined" == typeof e ? (r.cache && "undefined" != typeof r.cache.barHidden ? !r.cache.barHidden : r.calendar.durationBarVisible && !r.data.barHidden) : void (r.data.barHidden = !e);
                    }),
                    (this.client.backColor = function (e) {
                        return "undefined" == typeof e
                            ? r.cache && "undefined" != typeof r.cache.backColor
                                ? r.cache.backColor
                                : "undefined" != typeof r.data.backColor
                                    ? r.data.backColor
                                    : r.calendar.eventBackColor
                            : void (r.data.backColor = e);
                    }),
                    /*
                    added lines to change barColor
                     */
                    (this.client.barColor = function (e) {
                        return "undefined" == typeof e
                            ? r.cache && "undefined" != typeof r.cache.barColor
                                ? r.cache.barColor
                                : "undefined" != typeof r.data.barColor
                                    ? r.data.barColor
                                    : r.calendar.eventBarColor
                            : void (r.data.barColor = e);
                    }),
                    (this.client.borderColor = function (e) {
                        return "undefined" == typeof e
                            ? r.cache && "undefined" != typeof r.cache.borderColor
                                ? r.cache.borderColor
                                : "undefined" != typeof r.data.borderColor
                                    ? r.data.borderColor
                                    : r.calendar.eventBorderColor
                            : void (r.data.borderColor = e);
                    }),
                    (this.client.moveEnabled = function (e) {
                        return "undefined" == typeof e ? "Disabled" !== r.calendar.eventMoveHandling && !r.data.moveDisabled : void (r.data.moveDisabled = !e);
                    }),
                    (this.client.resizeEnabled = function (e) {
                        return "undefined" == typeof e ? "Disabled" !== r.calendar.eventResizeHandling && !r.data.resizeDisabled : void (r.data.resizeDisabled = !e);
                    }),
                    (this.client.clickEnabled = function (e) {
                        return "undefined" == typeof e ? "Disabled" !== r.calendar.eventClickHandling && !r.data.clickDisabled : void (r.data.clickDisabled = !e);
                    }),
                    (this.toJSON = function (e) {
                        var t = {};
                        if (((t.value = this.id()), (t.id = this.id()), (t.text = this.text()), (t.start = this.start()), (t.end = this.end()), (t.tag = {}), r.calendar && r.calendar.tagFields))
                            for (var a = r.calendar.tagFields, o = 0; o < a.length; o++) t.tag[a[o]] = this.tag(a[o]);
                        return t;
                    });
            });
    }
})(),
    (DayPilot.JSON = {}),
    (function () {
        function e(e) {
            return e < 10 ? "0" + e : e;
        }
        function t(e) {
            return (
                (i.lastIndex = 0),
                    i.test(e)
                        ? '"' +
                        e.replace(i, function (e) {
                            var t = d[e];
                            return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
                        }) +
                        '"'
                        : '"' + e + '"'
            );
        }
        function a(e, i) {
            var d,
                l,
                s,
                u,
                c,
                f = r,
                m = i[e];
            switch (
                (m && "object" == typeof m && "function" == typeof m.toJSON2 ? (m = m.toJSON2(e)) : m && "object" == typeof m && "function" == typeof m.toJSON && !m.ignoreToJSON && (m = m.toJSON(e)),
                "function" == typeof n && (m = n.call(i, e, m)),
                    typeof m)
                ) {
                case "string":
                    return t(m);
                case "number":
                    return isFinite(m) ? String(m) : "null";
                case "boolean":
                case "null":
                    return String(m);
                case "object":
                    if (!m) return "null";
                    if (((r += o), (c = []), "number" == typeof m.length && !m.propertyIsEnumerable("length"))) {
                        for (u = m.length, d = 0; d < u; d += 1) c[d] = a(d, m) || "null";
                        return (s = 0 === c.length ? "[]" : r ? "[\n" + r + c.join(",\n" + r) + "\n" + f + "]" : "[" + c.join(",") + "]"), (r = f), s;
                    }
                    if (n && "object" == typeof n) for (u = n.length, d = 0; d < u; d += 1) (l = n[d]), "string" == typeof l && ((s = a(l, m)), s && c.push(t(l) + (r ? ": " : ":") + s));
                    else for (l in m) Object.hasOwnProperty.call(m, l) && ((s = a(l, m)), s && c.push(t(l) + (r ? ": " : ":") + s));
                    return (s = 0 === c.length ? "{}" : r ? "{\n" + r + c.join(",\n" + r) + "\n" + f + "}" : "{" + c.join(",") + "}"), (r = f), s;
            }
        }
        "function" != typeof Date.prototype.toJSON2 &&
        ((Date.prototype.toJSON2 = function (t) {
            return this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) + "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds());
        }),
            (String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
                return this.valueOf();
            }));
        var r,
            o,
            n,
            i = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            d = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" };
        "function" != typeof DayPilot.JSON.stringify &&
        (DayPilot.JSON.stringify = function (e, t, i) {
            var d;
            if (((r = ""), (o = ""), "number" == typeof i)) for (d = 0; d < i; d += 1) o += " ";
            else "string" == typeof i && (o = i);
            if (((n = t), t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length))) throw new Error("JSON.stringify");
            return a("", { "": e });
        });
    })();
if ("undefined" == typeof DayPilot) var DayPilot = {};
"undefined" == typeof DayPilot.Global && (DayPilot.Global = {}),
    (function () {
        var e = function () {};
        if ("undefined" == typeof DayPilot.Calendar || !DayPilot.Calendar.events) {
            var t = {};
            (t.selectedCells = []),
                (t.topSelectedCell = null),
                (t.bottomSelectedCell = null),
                (t.selecting = !1),
                (t.column = null),
                (t.firstSelected = null),
                (t.firstMousePos = null),
                (t.originalMouse = null),
                (t.originalHeight = null),
                (t.originalTop = null),
                (t.resizing = null),
                (t.globalHandlers = !1),
                (t.moving = null),
                (t.register = function (e) {
                    t.registered || (t.registered = []);
                    for (var i = t.registered, n = 0; n < i.length; n++) if (i[n] === e) return;
                    i.push(e);
                }),
                (t.unregister = function (e) {
                    var i = t.registered;
                    if (i) {
                        var n = DayPilot.indexOf(i, e);
                        n !== -1 && i.splice(n, 1);
                    }
                }),
                (t.getCellsAbove = function (e) {
                    for (var i = [], n = t.getColumn(e), s = e.parentNode, a = null; s && a !== t.firstSelected; ) for (a = s.getElementsByTagName("td")[n], i.push(a), s = s.previousSibling; s && "TR" !== s.tagName; ) s = s.previousSibling;
                    return i;
                }),
                (t.getCellsBelow = function (e) {
                    for (var i = [], n = t.getColumn(e), s = e.parentNode, a = null; s && a !== t.firstSelected; ) for (a = s.getElementsByTagName("td")[n], i.push(a), s = s.nextSibling; s && "TR" !== s.tagName; ) s = s.nextSibling;
                    return i;
                }),
                (t.getColumn = function (e) {
                    for (var t = 0; e.previousSibling; ) (e = e.previousSibling), "TD" === e.tagName && t++;
                    return t;
                }),
                (t.gUnload = function (e) {
                    if (t.registered)
                        for (var i = t.registered, n = 0; n < i.length; n++) {
                            var s = i[n];
                            s.dispose(), t.unregister(s);
                        }
                }),
                (t.gMouseUp = function (i) {
                    if (t.resizing) {
                        if (!t.resizingShadow) return (t.resizing.style.cursor = "default"), (document.body.style.cursor = "default"), void (t.resizing = null);
                        var n = t.resizing.event,
                            s = t.resizingShadow.clientHeight + 4,
                            a = t.resizingShadow.offsetTop,
                            l = t.resizing.dpBorder;
                        t.deleteShadow(t.resizingShadow),
                            (t.resizingShadow = null),
                            (t.resizing.style.cursor = "default"),
                            (n.calendar.nav.top.style.cursor = "auto"),
                            (t.resizing.onclick = null),
                            (t.resizing = null),
                            n.calendar.a(n, s, a, l);
                    } else if (t.moving) {
                        if (!t.movingShadow) return (t.moving = null), void (document.body.style.cursor = "default");
                        var a = t.movingShadow.offsetTop;
                        t.deleteShadow(t.movingShadow);
                        var n = t.moving.event,
                            o = t.movingShadow.column;
                        (t.moving = null), (t.movingShadow = null), (n.calendar.nav.top.style.cursor = "auto"), n.calendar.b(n, o, a, i);
                    } else if (t.selecting && null !== t.topSelectedCell) {
                        var r = t.selecting.calendar;
                        t.selecting = !1;
                        var h = r.getSelection();
                        r.c(h.start, h.end, h.resource), "Hold" !== r.timeRangeSelectedHandling && "HoldForever" !== r.timeRangeSelectedHandling && e();
                    } else t.selecting = !1;
                }),
                (t.deleteShadow = function (e) {
                    e && e.parentNode && e.parentNode.removeChild(e);
                }),
                (t.moveShadow = function (e) {
                    var i = t.movingShadow,
                        n = i.parentNode;
                    (n.style.display = "none"), i.parentNode.removeChild(i), e.firstChild.appendChild(i), (i.style.left = "0px"), (n.style.display = ""), (i.style.width = t.movingShadow.parentNode.offsetWidth + 1 + "px");
                }),
                (t.Calendar = function (e, i) {
                    var n = !1;
                    if ((this instanceof t.Calendar && !this.d && ((n = !0), (this.d = !0)), !n)) throw "DayPilot.Calendar() is a constructor and must be called as 'var c = new DayPilot.Calendar(id);'";
                    var s = this;
                    (this.uniqueID = null),
                        (this.v = "2022.2.384-lite"),
                        (this.id = e),
                        (this.clientName = e),
                        (this.cache = {}),
                        (this.cache.pixels = {}),
                        (this.elements = {}),
                        (this.elements.events = []),
                        (this.elements.selection = []),
                        (this.nav = {}),
                        (this.afterRender = function () {}),
                        (this.fasterDispose = !0),
                        (this.angularAutoApply = !1),
                        (this.api = 2),
                        (this.businessBeginsHour = 9),
                        (this.businessEndsHour = 18),
                        (this.cellHeight = 30),
                        (this.columnMarginRight = 5),
                        (this.columnsLoadMethod = "GET"),
                        (this.days = 1),
                        (this.durationBarVisible = !0),
                        (this.eventHeaderHeight = 14),
                        (this.eventHeaderVisible = !0),
                        (this.eventsLoadMethod = "GET"),
                        (this.headerHeight = 30),
                        (this.height = 300),
                        (this.heightSpec = "BusinessHours"),
                        (this.hideUntilInit = !0),
                        (this.hourWidth = 60),
                        (this.initScrollPos = "Auto"),
                        (this.loadingLabelText = "Loading..."),
                        (this.loadingLabelVisible = !0),
                        (this.loadingLabelBackColor = "ff0000"),
                        (this.loadingLabelFontColor = "#ffffff"),
                        (this.loadingLabelFontFamily = "Tahoma, Arial, Helvetica, sans-serif"),
                        (this.loadingLabelFontSize = "10pt"),
                        (this.locale = "en-us"),
                        (this.showToolTip = !0),
                        (this.startDate = new DayPilot.Date().getDatePart()),
                        (this.cssClassPrefix = "calendar_default"),
                        (this.theme = null),
                        (this.timeFormat = "Auto"),
                        (this.viewType = "Days"),
                        (this.visible = !0),
                        (this.xssProtection = "Enabled"),
                        (this.timeRangeSelectedHandling = "Enabled"),
                        (this.eventClickHandling = "Enabled"),
                        (this.eventResizeHandling = "Update"),
                        (this.eventMoveHandling = "Update"),
                        (this.eventDeleteHandling = "Disabled"),
                        (this.onBeforeEventRender = null),
                        (this.onEventClick = null),
                        (this.onEventClicked = null),
                        (this.onEventDelete = null),
                        (this.onEventDeleted = null),
                        (this.onEventMove = null),
                        (this.onEventMoved = null),
                        (this.onEventResize = null),
                        (this.onEventResized = null),
                        (this.onTimeRangeSelect = null),
                        (this.onTimeRangeSelected = null),
                        (this.clearSelection = function () {
                            (t.topSelectedCell = null), (t.bottomSelectedCell = null), this.f();
                        }),
                        (this.f = function () {
                            DayPilot.de(s.elements.selection), (s.elements.selection = []), (s.nav.activeSelection = null);
                        }),
                        (this.g = navigator && navigator.userAgent && navigator.userAgent.indexOf("MSIE") !== -1),
                        (this.h = navigator && navigator.userAgent && navigator.userAgent.indexOf("Firefox") !== -1),
                        (this.i = (function () {
                            if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                                return Number(RegExp.$1) >= 10.5;
                            }
                            return !1;
                        })()),
                        (this.j = (function () {
                            if (/AppleWebKit[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                                return Number(RegExp.$1) >= 522;
                            }
                            return !1;
                        })()),
                        (this.cleanSelection = this.clearSelection),
                        (this.k = function (e, t, i) {
                            var n = {};
                            (n.action = e), (n.parameters = i), (n.data = t), (n.header = this.l());
                            var a = "JSON" + DayPilot.JSON.stringify(n);
                            __doPostBack(s.uniqueID, a);
                        }),
                        (this.m = function (e, t, i) {
                            this.callbackTimeout && window.clearTimeout(this.callbackTimeout),
                                (this.callbackTimeout = window.setTimeout(function () {
                                    s.loadingStart();
                                }, 100));
                            var n = {};
                            (n.action = e), (n.parameters = i), (n.data = t), (n.header = this.l());
                            var a = "JSON" + DayPilot.JSON.stringify(n);
                            this.backendUrl ? DayPilot.request(this.backendUrl, this.n, a, this.ajaxError) : "function" == typeof WebForm_DoCallback && WebForm_DoCallback(this.uniqueID, a, this.o, this.clientName, this.onCallbackError, !0);
                        }),
                        (this.onCallbackError = function (e, t) {
                            alert("Error!\r\nResult: " + e + "\r\nContext:" + t);
                        }),
                        (this.dispose = function () {
                            var e = s;
                            e.p(),
                                (e.nav.scroll.root = null),
                                DayPilot.pu(e.nav.loading),
                                e.q(),
                                e.r(),
                                (e.nav.select = null),
                                (e.nav.cornerRight = null),
                                (e.nav.scrollable = null),
                                (e.nav.zoom = null),
                                (e.nav.loading = null),
                                (e.nav.header = null),
                                (e.nav.hourTable = null),
                                (e.nav.scrolltop = null),
                                (e.nav.scroll = null),
                                (e.nav.main = null),
                                (e.nav.message = null),
                                (e.nav.messageClose = null),
                                (e.nav.top = null),
                                t.unregister(e);
                        }),
                        (this.s = function () {
                            this.nav.top.dispose = this.dispose;
                        }),
                        (this.n = function (e) {
                            s.o(e.responseText);
                        }),
                        (this.l = function () {
                            var e = {};
                            return (
                                (e.control = "dpc"),
                                    (e.id = this.id),
                                    (e.v = this.v),
                                    (e.days = s.days),
                                    (e.startDate = s.startDate),
                                    (e.heightSpec = s.heightSpec),
                                    (e.businessBeginsHour = s.businessBeginsHour),
                                    (e.businessEndsHour = s.businessEndsHour),
                                    (e.hashes = s.hashes),
                                    (e.timeFormat = s.timeFormat),
                                    (e.viewType = s.viewType),
                                    (e.locale = s.locale),
                                    e
                            );
                        }),
                        (this.t = function (e, t) {
                            for (var i = e.parentNode; i && "TD" !== i.tagName; ) i = i.parentNode;
                            var n = document.createElement("div");
                            n.setAttribute("unselectable", "on"),
                                (n.style.position = "absolute"),
                                (n.style.width = e.offsetWidth + "px"),
                                (n.style.height = e.offsetHeight + "px"),
                                (n.style.left = e.offsetLeft + "px"),
                                (n.style.top = e.offsetTop + "px"),
                                (n.style.boxSizing = "border-box"),
                                (n.style.zIndex = 101),
                                (n.className = s.u("_shadow"));
                            var a = document.createElement("div");
                            return (a.className = s.u("_shadow_inner")), n.appendChild(a), i.firstChild.appendChild(n), n;
                        }),
                        (this.w = {}),
                        (this.w.locale = function () {
                            var e = DayPilot.Locale.find(s.locale);
                            return e ? e : DayPilot.Locale.US;
                        }),
                        (this.w.timeFormat = function () {
                            return "Auto" !== s.timeFormat ? s.timeFormat : this.locale().timeFormat;
                        }),
                        (this.w.z = function () {
                            return "Disabled" !== s.xssProtection;
                        });
                    var a = this.w;
                    (this.o = function (e, t) {
                        if (e && 0 === e.indexOf("$$$")) {
                            if (!window.console) throw "Error received from the server side: " + e;
                            return void console.log("Error received from the server side: " + e);
                        }
                        var e = JSON.parse(e);
                        if (e.CallBackRedirect) return void (document.location.href = e.CallBackRedirect);
                        if ("None" === e.UpdateType) return s.loadingStop(), void s.A();
                        if (
                            (s.p(),
                            "Full" === e.UpdateType &&
                            ((s.columns = e.Columns),
                                (s.days = e.Days),
                                (s.startDate = new DayPilot.Date(e.StartDate)),
                                (s.heightSpec = e.HeightSpec ? e.HeightSpec : s.heightSpec),
                                (s.businessBeginsHour = e.BusinessBeginsHour ? e.BusinessBeginsHour : s.businessBeginsHour),
                                (s.businessEndsHour = e.BusinessEndsHour ? e.BusinessEndsHour : s.businessEndsHour),
                                (s.headerDateFormat = e.HeaderDateFormat ? e.HeaderDateFormat : s.headerDateFormat),
                                (s.viewType = e.ViewType),
                                (s.backColor = e.BackColor ? e.BackColor : s.backColor),
                                (s.eventHeaderVisible = e.EventHeaderVisible ? e.EventHeaderVisible : s.eventHeaderVisible),
                                (s.timeFormat = e.TimeFormat ? e.TimeFormat : s.timeFormat),
                                (s.locale = e.Locale ? e.Locale : s.locale),
                                s.B()),
                                e.Hashes)
                        )
                            for (var i in e.Hashes) s.hashes[i] = e.Hashes[i];
                        (s.events.list = e.Events), s.C(), s.D(), "Full" === e.UpdateType && (s.E(), s.F(), s.G(), s.H()), s.A(), s.I(), s.clearSelection(), s.afterRender(e.CallBackData, !0), s.loadingStop();
                    }),
                        (this.J = function () {
                            return this.K() / 36e5;
                        }),
                        (this.L = function () {
                            return this.businessBeginsHour > this.businessEndsHour ? 24 - this.businessBeginsHour + this.businessEndsHour : this.businessEndsHour - this.businessBeginsHour;
                        }),
                        (this.M = function () {
                            return this.K() / 18e5;
                        }),
                        (this.K = function () {
                            var e = 0;
                            return (e = "BusinessHoursNoScroll" === this.heightSpec ? this.L() : 24), 60 * e * 60 * 1e3;
                        }),
                        (this.N = function () {
                            return "BusinessHoursNoScroll" === this.heightSpec ? this.businessBeginsHour : 0;
                        }),
                        (this.O = function () {
                            return 2 === s.api;
                        }),
                        (this.eventClickCallBack = function (e, t) {
                            this.m("EventClick", t, e);
                        }),
                        (this.eventClickPostBack = function (e, t) {
                            this.k("EventClick", t, e);
                        }),
                        (this.P = function (e) {
                            var t = this,
                                i = t.event;
                            if (s.O()) {
                                var n = {};
                                if (
                                    ((n.e = i),
                                        (n.originalEvent = e),
                                        (n.meta = e.metaKey),
                                        (n.ctrl = e.ctrlKey),
                                        (n.control = s),
                                        (n.preventDefault = function () {
                                            this.preventDefault.value = !0;
                                        }),
                                    "function" == typeof s.onEventClick &&
                                    (s.Q.apply(function () {
                                        s.onEventClick(n);
                                    }),
                                        n.preventDefault.value))
                                )
                                    return;
                                switch (s.eventClickHandling) {
                                    case "CallBack":
                                        s.eventClickCallBack(i);
                                        break;
                                    case "PostBack":
                                        s.eventClickPostBack(i);
                                }
                                "function" == typeof s.onEventClicked &&
                                s.Q.apply(function () {
                                    s.onEventClicked(n);
                                });
                            } else
                                switch (s.eventClickHandling) {
                                    case "PostBack":
                                        s.eventClickPostBack(i);
                                        break;
                                    case "CallBack":
                                        s.eventClickCallBack(i);
                                        break;
                                    case "JavaScript":
                                        s.onEventClick(i);
                                }
                        }),
                        (this.eventDeleteCallBack = function (e, t) {
                            this.m("EventDelete", t, e);
                        }),
                        (this.eventDeletePostBack = function (e, t) {
                            this.k("EventDelete", t, e);
                        }),
                        (this.R = function (e) {
                            if (s.O()) {
                                var t = {};
                                if (
                                    ((t.e = e),
                                        (t.control = s),
                                        (t.preventDefault = function () {
                                            this.preventDefault.value = !0;
                                        }),
                                    "function" == typeof s.onEventDelete &&
                                    (s.Q.apply(function () {
                                        s.onEventDelete(t);
                                    }),
                                        t.preventDefault.value))
                                )
                                    return;
                                switch (s.eventDeleteHandling) {
                                    case "CallBack":
                                        s.eventDeleteCallBack(e);
                                        break;
                                    case "PostBack":
                                        s.eventDeletePostBack(e);
                                        break;
                                    case "Update":
                                        s.events.remove(e);
                                }
                                "function" == typeof s.onEventDeleted &&
                                s.Q.apply(function () {
                                    s.onEventDeleted(t);
                                });
                            } else
                                switch (s.eventDeleteHandling) {
                                    case "PostBack":
                                        s.eventDeletePostBack(e);
                                        break;
                                    case "CallBack":
                                        s.eventDeleteCallBack(e);
                                        break;
                                    case "JavaScript":
                                        s.onEventDelete(e);
                                }
                        }),
                        (this.eventResizeCallBack = function (e, t, i, n) {
                            if (!t) throw "newStart is null";
                            if (!i) throw "newEnd is null";
                            var s = {};
                            (s.e = e), (s.newStart = t), (s.newEnd = i), this.m("EventResize", n, s);
                        }),
                        (this.eventResizePostBack = function (e, t, i, n) {
                            if (!t) throw "newStart is null";
                            if (!i) throw "newEnd is null";
                            var s = {};
                            (s.e = e), (s.newStart = t), (s.newEnd = i), this.k("EventResize", n, s);
                        }),
                        (this.a = function (e, t, i, n) {
                            var a = 1,
                                l = new Date(),
                                o = new Date(),
                                r = e.start(),
                                h = e.end();
                            if ("top" === n) {
                                var c = r.getDatePart(),
                                    d = Math.floor((i - a) / s.cellHeight),
                                    u = 30 * d,
                                    v = 60 * u * 1e3,
                                    p = 60 * s.N() * 60 * 1e3;
                                (l = c.addTime(v + p)), (o = e.end());
                            } else if ("bottom" === n) {
                                var c = h.getDatePart(),
                                    d = Math.floor((i + t - a) / s.cellHeight),
                                    u = 30 * d,
                                    v = 60 * u * 1e3,
                                    p = 60 * s.N() * 60 * 1e3;
                                (l = r), (o = c.addTime(v + p));
                            }
                            if (s.O()) {
                                var f = {};
                                if (
                                    ((f.e = e),
                                        (f.control = s),
                                        (f.newStart = l),
                                        (f.newEnd = o),
                                        (f.preventDefault = function () {
                                            this.preventDefault.value = !0;
                                        }),
                                    "function" == typeof s.onEventResize &&
                                    (s.Q.apply(function () {
                                        s.onEventResize(f);
                                    }),
                                        f.preventDefault.value))
                                )
                                    return;
                                switch (s.eventResizeHandling) {
                                    case "PostBack":
                                        s.eventResizePostBack(e, l, o);
                                        break;
                                    case "CallBack":
                                        s.eventResizeCallBack(e, l, o);
                                        break;
                                    case "Update":
                                        e.start(l), e.end(o), s.events.update(e);
                                }
                                "function" == typeof s.onEventResized &&
                                s.Q.apply(function () {
                                    s.onEventResized(f);
                                });
                            } else
                                switch (s.eventResizeHandling) {
                                    case "PostBack":
                                        s.eventResizePostBack(e, l, o);
                                        break;
                                    case "CallBack":
                                        s.eventResizeCallBack(e, l, o);
                                        break;
                                    case "JavaScript":
                                        s.onEventResize(e, l, o);
                                }
                        }),
                        (this.eventMovePostBack = function (e, t, i, n, s) {
                            if (!t) throw "newStart is null";
                            if (!i) throw "newEnd is null";
                            var a = {};
                            (a.e = e), (a.newStart = t), (a.newEnd = i), this.k("EventMove", s, a);
                        }),
                        (this.eventMoveCallBack = function (e, t, i, n, s) {
                            if (!t) throw "newStart is null";
                            if (!i) throw "newEnd is null";
                            var a = {};
                            (a.e = e), (a.newStart = t), (a.newEnd = i), this.m("EventMove", s, a);
                        }),
                        (this.b = function (e, t, i, n) {
                            var a = 1,
                                l = Math.floor((i - a) / s.cellHeight),
                                o = 30 * l * 60 * 1e3,
                                r = e.start(),
                                h = e.end(),
                                c = new Date();
                            r instanceof DayPilot.Date && (r = r.toDate()), c.setTime(Date.UTC(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()));
                            var d = r.getTime() - (c.getTime() + 3600 * r.getUTCHours() * 1e3 + 30 * Math.floor(r.getUTCMinutes() / 30) * 60 * 1e3),
                                u = h.getTime() - r.getTime(),
                                v = this.S[t],
                                p = v.id,
                                f = v.start.getTime(),
                                g = new Date();
                            g.setTime(f + o + d);
                            var m = new DayPilot.Date(g),
                                y = m.addTime(u);
                            if (s.O()) {
                                var b = {};
                                if (
                                    ((b.e = e),
                                        (b.newStart = m),
                                        (b.newEnd = y),
                                        (b.newResource = p),
                                        (b.ctrl = n.ctrlKey),
                                        (b.shift = n.shiftKey),
                                        (b.control = s),
                                        (b.preventDefault = function () {
                                            this.preventDefault.value = !0;
                                        }),
                                    "function" == typeof s.onEventMove &&
                                    (s.Q.apply(function () {
                                        s.onEventMove(b);
                                    }),
                                        b.preventDefault.value))
                                )
                                    return;
                                switch (s.eventMoveHandling) {
                                    case "PostBack":
                                        s.eventMovePostBack(e, m, y, v.id);
                                        break;
                                    case "CallBack":
                                        s.eventMoveCallBack(e, m, y, v.id);
                                        break;
                                    case "Update":
                                        e.start(m), e.end(y), e.resource(p), s.events.update(e);
                                }
                                "function" == typeof s.onEventMoved &&
                                s.Q.apply(function () {
                                    s.onEventMoved(b);
                                });
                            } else
                                switch (s.eventMoveHandling) {
                                    case "PostBack":
                                        s.eventMovePostBack(e, m, y, v.id);
                                        break;
                                    case "CallBack":
                                        s.eventMoveCallBack(e, m, y, v.id);
                                        break;
                                    case "JavaScript":
                                        s.onEventMove(e, m, y, v.id, !1);
                                }
                        }),
                        (this.timeRangeSelectedPostBack = function (e, t, i, n) {
                            var s = {};
                            (s.start = e), (s.end = t), this.k("TimeRangeSelected", n, s);
                        }),
                        (this.timeRangeSelectedCallBack = function (e, t, i, n) {
                            var s = {};
                            (s.start = e), (s.end = t), this.m("TimeRangeSelected", n, s);
                        }),
                        (this.c = function (e, t, i) {
                            if (((e = new DayPilot.Date(e)), (t = new DayPilot.Date(t)), this.O())) {
                                var n = {};
                                if (
                                    ((n.start = e),
                                        (n.end = t),
                                        (n.resource = i),
                                        (n.control = s),
                                        (n.preventDefault = function () {
                                            this.preventDefault.value = !0;
                                        }),
                                    "function" == typeof s.onTimeRangeSelect &&
                                    (s.Q.apply(function () {
                                        s.onTimeRangeSelect(n);
                                    }),
                                        n.preventDefault.value))
                                )
                                    return;
                                switch (s.timeRangeSelectedHandling) {
                                    case "PostBack":
                                        s.timeRangeSelectedPostBack(e, t);
                                        break;
                                    case "CallBack":
                                        s.timeRangeSelectedCallBack(e, t);
                                }
                                "function" == typeof s.onTimeRangeSelected &&
                                s.Q.apply(function () {
                                    s.onTimeRangeSelected(n);
                                });
                            } else
                                switch (s.timeRangeSelectedHandling) {
                                    case "PostBack":
                                        s.timeRangeSelectedPostBack(e, t);
                                        break;
                                    case "CallBack":
                                        s.timeRangeSelectedCallBack(e, t);
                                        break;
                                    case "JavaScript":
                                        s.onTimeRangeSelected(e, t);
                                }
                        }),
                        (this.T = function (e) {
                            if (!t.selecting && "Disabled" !== s.timeRangeSelectedHandling) {
                                var i = e.which;
                                if (1 === i || 0 === i)
                                    return (
                                        (t.firstMousePos = DayPilot.mc(e)),
                                            (t.selecting = {}),
                                            (t.selecting.calendar = s),
                                        t.selectedCells && (s.clearSelection(), (t.selectedCells = [])),
                                            (t.column = t.getColumn(this)),
                                            t.selectedCells.push(this),
                                            (t.firstSelected = this),
                                            (t.topSelectedCell = this),
                                            (t.bottomSelectedCell = this),
                                            s.U(),
                                            !1
                                    );
                            }
                        }),
                        (this.U = function () {
                            this.getSelection();
                            !(function () {
                                var e = t.topSelectedCell,
                                    i = t.bottomSelectedCell,
                                    n = (function () {
                                        if (e.data) return e.data.x;
                                        for (var t = e.parentNode.cells, i = 0; i < t.length; i++) if (t[i] === e) return i;
                                        return -1;
                                    })(),
                                    a = s.S[n];
                                if (a) {
                                    var l = a.start,
                                        o = s.getPixels(e.start, l).boxTop,
                                        r = s.getPixels(i.end, l).boxBottom,
                                        h = r - o,
                                        c = (function () {
                                            if (s.nav.activeSelection) return s.nav.activeSelection;
                                            var e = document.createElement("div");
                                            e.setAttribute("unselectable", "on"), (e.style.position = "absolute"), (e.style.left = "0px"), (e.style.width = "100%");
                                            var t = document.createElement("div");
                                            return (
                                                t.setAttribute("unselectable", "on"),
                                                    (t.className = s.u("_shadow_inner")),
                                                    e.appendChild(t),
                                                    s.nav.events.rows[0].cells[n].selection.appendChild(e),
                                                    s.elements.selection.push(e),
                                                    (s.nav.activeSelection = e),
                                                    e
                                            );
                                        })();
                                    (c.className = s.u("_shadow")), (c.firstChild.innerHTML = ""), (c.style.top = o + "px"), (c.style.height = h + "px");
                                }
                            })();
                        }),
                        (this.V = function (e) {
                            if ("undefined" != typeof t && t.selecting) {
                                var i = DayPilot.mc(e);
                                t.getColumn(this) === t.column &&
                                (s.clearSelection(),
                                    i.y < t.firstMousePos.y
                                        ? ((t.selectedCells = t.getCellsBelow(this)), (t.topSelectedCell = t.selectedCells[0]), (t.bottomSelectedCell = t.firstSelected))
                                        : ((t.selectedCells = t.getCellsAbove(this)), (t.topSelectedCell = t.firstSelected), (t.bottomSelectedCell = t.selectedCells[0])),
                                    s.U());
                            }
                        }),
                        (this.getSelection = function () {
                            var e = t.topSelectedCell.start,
                                i = t.bottomSelectedCell.end,
                                n = t.topSelectedCell.resource;
                            return new DayPilot.Selection(e, i, n, s);
                        }),
                        (this.W = function (e) {
                            if (e < 0) return null;
                            for (var t = 0, i = s.nav.events.rows[0].cells, n = 0; n < i.length; n++) {
                                if (((t += i[n].offsetWidth), e < t)) return n;
                            }
                            return null;
                        }),
                        (this.X = {}),
                        (this.X.getCellCoords = function () {
                            var e = {};
                            if (((e.x = 0), (e.y = 0), !s.coords)) return null;
                            e.x = s.W(s.coords.x);
                            var t = 0,
                                i = Math.floor((s.coords.y - t) / s.cellHeight);
                            return (e.y = i), e.x < 0 ? null : e;
                        }),
                        (this.columns = {}),
                        (this.columns.list = []),
                        (this.columns.load = function (e, t, i) {
                            if (!e) throw new DayPilot.Exception("columns.load(): 'url' parameter required");
                            var n = function (e) {
                                    var t = {};
                                    (t.exception = e.exception), (t.request = e.request), "function" == typeof i && i(t);
                                },
                                a = function (e) {
                                    var i,
                                        a = e.request;
                                    try {
                                        i = JSON.parse(a.responseText);
                                    } catch (e) {
                                        var l = {};
                                        return (l.exception = e), void n(l);
                                    }
                                    if (DayPilot.isArray(i)) {
                                        var o = {};
                                        if (
                                            ((o.preventDefault = function () {
                                                this.preventDefault.value = !0;
                                            }),
                                                (o.data = i),
                                            "function" == typeof t && t(o),
                                                o.preventDefault.value)
                                        )
                                            return;
                                        (s.columns.list = i), s.Y && s.update();
                                    }
                                };
                            s.columnsLoadMethod && "POST" === s.columnsLoadMethod.toUpperCase() ? DayPilot.ajax({ method: "POST", url: e, success: a, error: n }) : DayPilot.ajax({ method: "GET", url: e, success: a, error: n });
                        }),
                        (this.B = function () {
                            var e;
                            (e = "Resources" !== s.viewType ? this.Z() : s.columns.list), (this.S = []);
                            for (var t = 0; t < e.length; t++) {
                                var i = this.$(e[t]);
                                this.S.push(i);
                            }
                        }),
                        (this.$ = function (e) {
                            var t = {};
                            return (
                                (t.name = e.name),
                                    (t.html = e.html),
                                    (t.id = e.id),
                                    (t.toolTip = e.toolTip),
                                    e.start ? (t.start = new DayPilot.Date(e.start)) : (t.start = new DayPilot.Date(s.startDate)),
                                    (t.putIntoBlock = function (e) {
                                        for (var t = 0; t < this.blocks.length; t++) {
                                            var i = this.blocks[t];
                                            if (i.overlapsWith(e.part.top, e.part.height)) return i.events.push(e), (i.min = Math.min(i.min, e.part.top)), (i.max = Math.max(i.max, e.part.top + e.part.height)), t;
                                        }
                                        var i = [];
                                        return (
                                            (i.lines = []),
                                                (i.events = []),
                                                (i.overlapsWith = function (e, t) {
                                                    return !(e + t - 1 < this.min || e > this.max - 1);
                                                }),
                                                (i.putIntoLine = function (e) {
                                                    for (var t = 0; t < this.lines.length; t++) {
                                                        var i = this.lines[t];
                                                        if (i.isFree(e.part.top, e.part.height)) return i.push(e), t;
                                                    }
                                                    var i = [];
                                                    return (
                                                        (i.isFree = function (e, t) {
                                                            for (var i = e + t - 1, n = this.length, s = 0; s < n; s++) {
                                                                var a = this[s];
                                                                if (!(i < a.part.top || e > a.part.top + a.part.height - 1)) return !1;
                                                            }
                                                            return !0;
                                                        }),
                                                            i.push(e),
                                                            this.lines.push(i),
                                                        this.lines.length - 1
                                                    );
                                                }),
                                                i.events.push(e),
                                                (i.min = e.part.top),
                                                (i.max = e.part.top + e.part.height),
                                                this.blocks.push(i),
                                            this.blocks.length - 1
                                        );
                                    }),
                                    (t.putIntoLine = function (e) {
                                        for (var t = 0; t < this.lines.length; t++) {
                                            var i = this.lines[t];
                                            if (i.isFree(e.part.top, e.part.height)) return i.push(e), t;
                                        }
                                        var i = [];
                                        return (
                                            (i.isFree = function (e, t) {
                                                for (var i = e + t - 1, n = this.length, s = 0; s < n; s++) {
                                                    var a = this[s];
                                                    if (!(i < a.part.top || e > a.part.top + a.part.height - 1)) return !1;
                                                }
                                                return !0;
                                            }),
                                                i.push(e),
                                                this.lines.push(i),
                                            this.lines.length - 1
                                        );
                                    }),
                                    t
                            );
                        }),
                        (this.Z = function () {
                            var e = [],
                                t = this.startDate.getDatePart(),
                                i = this.days;
                            switch (this.viewType) {
                                case "Day":
                                    i = 1;
                                    break;
                                case "Week":
                                    (i = 7), (t = t.firstDayOfWeek(a.locale().weekStarts));
                                    break;
                                case "WorkWeek":
                                    (i = 5), (t = t.firstDayOfWeek(1));
                            }
                            "BusinessHoursNoScroll" === this.heightSpec && (t = t.addHours(this.businessBeginsHour));
                            for (var n = 0; n < i; n++) {
                                var l = s.headerDateFormat ? s.headerDateFormat : a.locale().datePattern,
                                    o = {};
                                (o.start = t.addDays(n)), (o.name = o.start.toString(l, a.locale())), e.push(o);
                            }
                            return e;
                        }),
                        (this.visibleStart = function () {
                            if ("Resources" === s.viewType) {
                                if (0 === s.S.length) return DayPilot.Date.today();
                                var e = s.S.map(function (e) {
                                        return e.start.getTime();
                                    }),
                                    t = Math.min.apply(null, e);
                                return new DayPilot.Date(t);
                            }
                            return this.S[0].start;
                        }),
                        (this.visibleEnd = function () {
                            if ("Resources" === s.viewType) {
                                if (0 === s.S.length) return DayPilot.Date.today().addDays(1);
                                var e = s.S.map(function (e) {
                                        return e.start.getTime();
                                    }),
                                    t = Math.max.apply(null, e);
                                return new DayPilot.Date(t).addDays(1);
                            }
                            var t = this.S.length - 1;
                            return this.S[t].start.addDays(1);
                        }),
                        (this.u = function (e) {
                            var t = this.theme || this.cssClassPrefix;
                            return t ? t + e : "";
                        }),
                        (this.p = function () {
                            if (this.elements.events)
                                for (var e = 0; e < this.elements.events.length; e++) {
                                    var t = this.elements.events[e],
                                        i = t.event;
                                    if (
                                        (i && (i.calendar = null),
                                            (t.onclick = null),
                                            (t.onclickSave = null),
                                            (t.onmouseover = null),
                                            (t.onmouseout = null),
                                            (t.onmousemove = null),
                                            (t.onmousedown = null),
                                        t.firstChild && t.firstChild.firstChild && t.firstChild.firstChild.tagName && "IMG" === t.firstChild.firstChild.tagName.toUpperCase())
                                    ) {
                                        var n = t.firstChild.firstChild;
                                        (n.onmousedown = null), (n.onmousemove = null), (n.onclick = null);
                                    }
                                    (t.helper = null), (t.data = null), (t.event = null), DayPilot.de(t);
                                }
                            this.elements.events = [];
                        }),
                        (this._ = function (e) {
                            var i = e.cache || e.data,
                                n = this.nav.events,
                                a = document.createElement("div");
                            (a.style.position = "absolute"),
                                (a.style.left = e.part.left + "%"),
                                (a.style.top = e.part.top + "px"),
                                (a.style.width = e.part.width + "%"),
                                (a.style.height = Math.max(e.part.height, 2) + "px"),
                                (a.style.overflow = "hidden"),
                                (a.data = e),
                                (a.event = e),
                                (a.unselectable = "on"),
                                (a.style.MozUserSelect = "none"),
                                (a.style.KhtmlUserSelect = "none"),
                                (a.className = this.u("_event")),
                            i.cssClass && DayPilot.Util.addClass(a, i.cssClass),
                                (a.isFirst = e.part.start.getTime() === e.start().getTime()),
                                (a.isLast = e.part.end.getTime() === e.end().getTime()),
                                (a.onclick = this.P),
                                (a.onmouseout = function (e) {
                                    a.deleteIcon && (a.deleteIcon.style.display = "none");
                                }),
                                (a.onmousemove = function (e) {
                                    var i = s.eventHeaderVisible ? s.eventHeaderHeight : 10;
                                    if ("undefined" != typeof t) {
                                        var n = DayPilot.mo3(a, e);
                                        if (n && !t.resizing && !t.moving) {
                                            a.deleteIcon && (a.deleteIcon.style.display = "");
                                            var l = this.isLast;
                                            n.y <= i && "Disabled" !== s.eventResizeHandling
                                                ? ((this.style.cursor = "n-resize"), (this.dpBorder = "top"))
                                                : this.offsetHeight - n.y <= 5 && "Disabled" !== s.eventResizeHandling
                                                    ? l
                                                        ? ((this.style.cursor = "s-resize"), (this.dpBorder = "bottom"))
                                                        : (this.style.cursor = "not-allowed")
                                                    : t.resizing || t.moving || ("Disabled" !== s.eventClickHandling ? (this.style.cursor = "pointer") : (this.style.cursor = "default"));
                                        }
                                    }
                                }),
                                (a.onmousedown = function (e) {
                                    var i = e.which || e.button;
                                    if (("n-resize" !== this.style.cursor && "s-resize" !== this.style.cursor) || 1 !== i) {
                                        if (1 === i && "Disabled" !== s.eventMoveHandling) {
                                            (t.moving = this), (t.moving.event = this.event);
                                            var n = (t.moving.helper = {});
                                            (n.oldColumn = s.S[this.data.part.dayIndex].id), (t.originalMouse = DayPilot.mc(e)), (t.originalTop = this.offsetTop);
                                            var a = DayPilot.mo3(this, e);
                                            a ? (t.moveOffsetY = a.y) : (t.moveOffsetY = 0), (s.nav.top.style.cursor = "move");
                                        }
                                    } else (t.resizing = this), (t.originalMouse = DayPilot.mc(e)), (t.originalHeight = this.offsetHeight), (t.originalTop = this.offsetTop), (s.nav.top.style.cursor = this.style.cursor);
                                    return !1;
                                });
                            var l = document.createElement("div");
                            if (
                                (l.setAttribute("unselectable", "on"),
                                    (l.className = s.u("_event_inner")),
                                    (l.innerHTML = e.client.html()),
                                    "darker" === i.borderColor && i.backColor ? (l.style.borderColor = DayPilot.ColorUtil.darker(i.backColor, 2)) : (l.style.borderColor = i.borderColor),
                                i.backColor && ((l.style.background = i.backColor), (DayPilot.browser.ie9 || DayPilot.browser.ielt9) && (l.style.filter = "")),
                                i.fontColor && (l.style.color = i.fontColor),
                                    a.appendChild(l),
                                    e.client.barVisible())
                            ) {
                                var o = e.part.height - 2,
                                    r = (100 * e.part.barTop) / o,
                                    h = Math.ceil((100 * e.part.barHeight) / o),
                                    c = document.createElement("div");
                                c.setAttribute("unselectable", "on"), (c.className = this.u("_event_bar")), (c.style.position = "absolute"), i.barBackColor && (c.style.backgroundColor = i.barBackColor);
                                var d = document.createElement("div");
                                d.setAttribute("unselectable", "on"),
                                    (d.className = this.u("_event_bar_inner")),
                                    (d.style.top = r + "%"),
                                    0 < h && h <= 1 ? (d.style.height = "1px") : (d.style.height = h + "%"),
                                i.barColor && (d.style.backgroundColor = i.barColor),
                                    c.appendChild(d),
                                    a.appendChild(c);
                            }
                            if ("Disabled" !== s.eventDeleteHandling) {
                                var u = document.createElement("div");
                                (u.style.position = "absolute"),
                                    (u.style.right = "2px"),
                                    (u.style.top = "2px"),
                                    (u.style.width = "17px"),
                                    (u.style.height = "17px"),
                                    (u.className = s.u("_event_delete")),
                                    (u.onmousedown = function (e) {
                                        e.stopPropagation();
                                    }),
                                    (u.onclick = function (e) {
                                        var t = this.parentNode.event;
                                        t && s.R(t);
                                    }),
                                    (u.style.display = "none"),
                                    (a.deleteIcon = u),
                                    a.appendChild(u);
                            }
                            if (n.rows[0].cells[e.part.dayIndex]) {
                                n.rows[0].cells[e.part.dayIndex].firstChild.appendChild(a), s.aa(a);
                            }
                            s.elements.events.push(a);
                        }),
                        (this.aa = function (e) {
                            for (var t = e && e.childNodes ? e.childNodes.length : 0, i = 0; i < t; i++)
                                try {
                                    var n = e.childNodes[i];
                                    1 === n.nodeType && ((n.unselectable = "on"), this.aa(n));
                                } catch (e) {}
                        }),
                        (this.I = function () {
                            for (var e = 0; e < this.S.length; e++) {
                                var t = this.S[e];
                                if (t.blocks)
                                    for (var i = 0; i < t.blocks.length; i++)
                                        for (var n = t.blocks[i], s = 0; s < n.lines.length; s++)
                                            for (var a = n.lines[s], l = 0; l < a.length; l++) {
                                                var o = a[l];
                                                (o.part.width = 100 / n.lines.length), (o.part.left = o.part.width * s);
                                                var r = s === n.lines.length - 1;
                                                r || (o.part.width = 1.5 * o.part.width), this._(o);
                                            }
                            }
                        }),
                        (this.ba = function () {
                            (this.nav.top.innerHTML = ""),
                                DayPilot.Util.addClass(this.nav.top, this.u("_main")),
                                (this.nav.top.style.MozUserSelect = "none"),
                                (this.nav.top.style.KhtmlUserSelect = "none"),
                                (this.nav.top.style.position = "relative"),
                                (this.nav.top.style.width = this.width ? this.width : "100%"),
                            this.hideUntilInit && (this.nav.top.style.visibility = "hidden"),
                            this.visible || (this.nav.top.style.display = "none"),
                                (this.nav.scroll = document.createElement("div")),
                                (this.nav.scroll.style.height = this.ca() + "px"),
                                "BusinessHours" === this.heightSpec ? (this.nav.scroll.style.overflow = "auto") : (this.nav.scroll.style.overflow = "hidden"),
                                (this.nav.scroll.style.position = "relative");
                            var e = this.da();
                            this.nav.top.appendChild(e), (this.nav.scroll.style.zoom = 1);
                            var t = this.ea();
                            (this.nav.scrollable = t.firstChild),
                                this.nav.scroll.appendChild(t),
                                this.nav.top.appendChild(this.nav.scroll),
                                (this.nav.scrollLayer = document.createElement("div")),
                                (this.nav.scrollLayer.style.position = "absolute"),
                                (this.nav.scrollLayer.style.top = "0px"),
                                (this.nav.scrollLayer.style.left = "0px"),
                                this.nav.top.appendChild(this.nav.scrollLayer),
                                (this.nav.loading = document.createElement("div")),
                                (this.nav.loading.style.position = "absolute"),
                                (this.nav.loading.style.top = "0px"),
                                (this.nav.loading.style.left = this.hourWidth + 5 + "px"),
                                (this.nav.loading.style.backgroundColor = this.loadingLabelBackColor),
                                (this.nav.loading.style.fontSize = this.loadingLabelFontSize),
                                (this.nav.loading.style.fontFamily = this.loadingLabelFontFamily),
                                (this.nav.loading.style.color = this.loadingLabelFontColor),
                                (this.nav.loading.style.padding = "2px"),
                                (this.nav.loading.innerHTML = this.loadingLabelText),
                                (this.nav.loading.style.display = "none"),
                                this.nav.top.appendChild(this.nav.loading);
                        }),
                        (this.G = function () {
                            this.fasterDispose || DayPilot.pu(this.nav.hourTable),
                                (this.nav.scrollable.rows[0].cells[0].innerHTML = ""),
                                (this.nav.hourTable = this.fa()),
                                this.nav.scrollable.rows[0].cells[0].appendChild(this.nav.hourTable);
                        }),
                        (this.ea = function () {
                            var e = document.createElement("div");
                            (e.style.zoom = 1), (e.style.position = "relative");
                            var t = document.createElement("table");
                            (t.cellSpacing = "0"), (t.cellPadding = "0"), (t.border = "0"), (t.style.border = "0px none"), (t.style.width = "100%"), (t.style.position = "absolute");
                            var i,
                                n = t.insertRow(-1);
                            (i = n.insertCell(-1)),
                                (i.valign = "top"),
                                (i.style.padding = "0px"),
                                (i.style.border = "0px none"),
                                (this.nav.hourTable = this.fa()),
                                i.appendChild(this.nav.hourTable),
                                (i = n.insertCell(-1)),
                                (i.valign = "top"),
                                (i.width = "100%"),
                                (i.style.padding = "0px"),
                                (i.style.border = "0px none");
                            var s = document.createElement("div");
                            return (s.style.position = "relative"), i.appendChild(s), s.appendChild(this.ga()), s.appendChild(this.ha()), e.appendChild(t), (this.nav.zoom = e), e;
                        }),
                        (this.ga = function () {
                            var e = document.createElement("table");
                            return (e.cellPadding = "0"), (e.cellSpacing = "0"), (e.border = "0"), (e.style.width = "100%"), (e.style.border = "0px none"), (e.style.tableLayout = "fixed"), (this.nav.main = e), (this.nav.events = e), e;
                        }),
                        (this.ha = function () {
                            var e = document.createElement("table");
                            (e.style.top = "0px"),
                                (e.cellPadding = "0"),
                                (e.cellSpacing = "0"),
                                (e.border = "0"),
                                (e.style.position = "absolute"),
                                (e.style.width = "100%"),
                                (e.style.border = "0px none"),
                                (e.style.tableLayout = "fixed"),
                                (this.nav.events = e);
                            for (var t = this.S, i = t.length, n = e.insertRow(-1), a = 0; a < i; a++) {
                                var l = n.insertCell(-1);
                                (l.style.padding = "0px"), (l.style.border = "0px none"), (l.style.height = "0px"), (l.style.overflow = "visible"), s.rtl || (l.style.textAlign = "left");
                                var o = document.createElement("div");
                                (o.style.marginRight = s.columnMarginRight + "px"), (o.style.position = "relative"), (o.style.height = "1px"), (o.style.marginTop = "-1px");
                                var r = document.createElement("div");
                                (l.selection = r), l.appendChild(o), l.appendChild(r);
                            }
                            return e;
                        }),
                        (this.fa = function () {
                            var e = document.createElement("table");
                            (e.cellSpacing = "0"),
                                (e.cellPadding = "0"),
                                (e.border = "0"),
                                (e.style.border = "0px none"),
                                (e.style.width = this.hourWidth + "px"),
                                (e.oncontextmenu = function () {
                                    return !1;
                                });
                            for (var t = s.J(), i = 0; i < t; i++) this.ia(e, i);
                            return e;
                        }),
                        (this.ia = function (e, t) {
                            var i = 2 * this.cellHeight,
                                n = e.insertRow(-1);
                            n.style.height = i + "px";
                            var l = n.insertCell(-1);
                            (l.valign = "bottom"), (l.unselectable = "on"), (l.style.cursor = "default"), (l.style.padding = "0px"), (l.style.border = "0px none");
                            var o = document.createElement("div");
                            (o.style.position = "relative"), (o.className = this.u("_rowheader")), (o.style.width = this.hourWidth + "px"), (o.style.height = i + "px"), (o.style.overflow = "hidden"), (o.unselectable = "on");
                            var r = document.createElement("div");
                            (r.className = this.u("_rowheader_inner")), (r.unselectable = "on");
                            var h = document.createElement("div");
                            h.unselectable = "on";
                            var c = this.startDate.addHours(t).addHours(s.N()),
                                d = c.getHours(),
                                u = d < 12,
                                v = a.timeFormat();
                            "Clock12Hours" === v && ((d %= 12), 0 === d && (d = 12)), (h.innerHTML = d);
                            var p = document.createElement("span");
                            (p.unselectable = "on"), (p.className = this.u("_rowheader_minutes"));
                            var f;
                            (f = "Clock12Hours" === v ? (u ? "AM" : "PM") : "00"), (p.innerHTML = f), h.appendChild(p), r.appendChild(h), o.appendChild(r), l.appendChild(o);
                        }),
                        (this.ca = function () {
                            switch (this.heightSpec) {
                                case "Full":
                                    return 48 * this.cellHeight;
                                case "BusinessHours":
                                    var e = this.L();
                                    return e * this.cellHeight * 2;
                                case "BusinessHoursNoScroll":
                                    var e = this.L();
                                    return e * this.cellHeight * 2;
                                default:
                                    throw "DayPilot.Calendar: Unexpected 'heightSpec' value.";
                            }
                        }),
                        (this.ja = function () {
                            var e = s.nav.corner ? s.nav.corner.parentNode : null;
                            if (e) {
                                e.innerHTML = "";
                                var t = this.ka();
                                e.appendChild(t), (s.nav.corner = t);
                            }
                        }),
                        (this.da = function () {
                            var e = document.createElement("div");
                            e.style.overflow = "auto";
                            var t = document.createElement("table");
                            (t.cellPadding = "0"), (t.cellSpacing = "0"), (t.border = "0"), (t.style.width = "100%"), (t.style.borderCollapse = "separate"), (t.style.border = "0px none");
                            var i = t.insertRow(-1),
                                n = i.insertCell(-1);
                            (n.style.padding = "0px"), (n.style.border = "0px none");
                            var s = this.ka();
                            n.appendChild(s),
                                (this.nav.corner = s),
                                (n = i.insertCell(-1)),
                                (n.style.width = "100%"),
                                (n.valign = "top"),
                                (n.style.position = "relative"),
                                (n.style.padding = "0px"),
                                (n.style.border = "0px none"),
                                (this.nav.header = document.createElement("table")),
                                (this.nav.header.cellPadding = "0"),
                                (this.nav.header.cellSpacing = "0"),
                                (this.nav.header.border = "0"),
                                (this.nav.header.width = "100%"),
                                (this.nav.header.style.tableLayout = "fixed"),
                                (this.nav.header.oncontextmenu = function () {
                                    return !1;
                                });
                            var a = "hidden" !== this.nav.scroll.style.overflow;
                            if ((n.appendChild(this.nav.header), a)) {
                                (n = i.insertCell(-1)), (n.unselectable = "on");
                                var l = document.createElement("div");
                                (l.unselectable = "on"), (l.style.position = "relative"), (l.style.width = "16px"), (l.style.height = this.headerHeight + "px"), (l.className = this.u("_cornerright"));
                                var o = document.createElement("div");
                                (o.className = this.u("_cornerright_inner")), l.appendChild(o), n.appendChild(l), (this.nav.cornerRight = l);
                            }
                            return e.appendChild(t), e;
                        }),
                        (this.ka = function () {
                            var e = document.createElement("div");
                            (e.style.position = "relative"),
                                (e.className = this.u("_corner")),
                                (e.style.width = this.hourWidth + "px"),
                                (e.style.height = this.headerHeight + "px"),
                                (e.oncontextmenu = function () {
                                    return !1;
                                });
                            var t = document.createElement("div");
                            return (t.unselectable = "on"), (t.className = this.u("_corner_inner")), e.appendChild(t), e;
                        }),
                        (this.q = function () {
                            var e = this.nav.main;
                            (e.root = null), (e.onmouseup = null);
                            for (var t = 0; t < e.rows.length; t++)
                                for (var i = e.rows[t], n = 0; n < i.cells.length; n++) {
                                    var s = i.cells[n];
                                    (s.root = null), (s.onmousedown = null), (s.onmousemove = null), (s.onmouseout = null), (s.onmouseup = null);
                                }
                            this.fasterDispose || DayPilot.pu(e);
                        }),
                        (this.F = function () {
                            var e = this.nav.main,
                                i = 18e5,
                                n = this.M(),
                                a = s.S;
                            for (e && this.q(); e && e.rows && e.rows.length > 0; ) this.fasterDispose || DayPilot.pu(e.rows[0]), e.deleteRow(0);
                            this.tableCreated = !0;
                            for (var l = a.length, o = this.nav.events; o && o.rows && o.rows.length > 0; ) this.fasterDispose || DayPilot.pu(o.rows[0]), o.deleteRow(0);
                            for (var l = a.length, r = o.insertRow(-1), h = 0; h < l; h++) {
                                var c = r.insertCell(-1);
                                (c.style.padding = "0px"), (c.style.border = "0px none"), (c.style.height = "0px"), (c.style.overflow = "visible"), s.rtl || (c.style.textAlign = "left");
                                var d = document.createElement("div");
                                (d.style.marginRight = s.columnMarginRight + "px"), (d.style.position = "relative"), (d.style.height = "1px"), (d.style.marginTop = "-1px");
                                var u = document.createElement("div");
                                (u.style.position = "relative"), (c.selection = u), c.appendChild(d), c.appendChild(u);
                            }
                            for (var v = 0; v < n; v++) {
                                var r = e.insertRow(-1);
                                (r.style.MozUserSelect = "none"), (r.style.KhtmlUserSelect = "none");
                                for (var h = 0; h < l; h++) {
                                    var p = this.S[h],
                                        c = r.insertCell(-1);
                                    (c.start = p.start.addTime(v * i)),
                                        (c.end = c.start.addTime(i)),
                                        (c.resource = p.id),
                                        (c.onmousedown = this.T),
                                        (c.onmouseup = function () {
                                            return !1;
                                        }),
                                        (c.onclick = function () {
                                            return !1;
                                        }),
                                        (c.root = this),
                                        (c.style.padding = "0px"),
                                        (c.style.border = "0px none"),
                                        (c.style.verticalAlign = "top"),
                                        (c.style.height = s.cellHeight + "px"),
                                        (c.style.overflow = "hidden"),
                                        (c.unselectable = "on");
                                    var d = document.createElement("div");
                                    (d.unselectable = "on"), (d.style.height = s.cellHeight + "px"), (d.style.position = "relative"), (d.className = this.u("_cell"));
                                    this.la(c.start, c.end) && DayPilot.Util.addClass(d, s.u("_cell_business"));
                                    var f = document.createElement("div");
                                    f.setAttribute("unselectable", "on"), (f.className = this.u("_cell_inner")), d.appendChild(f), c.appendChild(d), c.appendChild(d);
                                }
                            }
                            (e.root = this),
                                (s.nav.scrollable.onmousemove = function (e) {
                                    var i = s.nav.scrollable;
                                    s.coords = DayPilot.mo3(i, e);
                                    var n = DayPilot.mc(e);
                                    if (t.resizing) {
                                        t.resizingShadow || (t.resizingShadow = s.t(t.resizing, !1, s.shadow));
                                        var a = s.cellHeight,
                                            l = 1,
                                            o = n.y - t.originalMouse.y;
                                        if ("bottom" === t.resizing.dpBorder) {
                                            var r = Math.floor((t.originalHeight + t.originalTop + o + a / 2) / a) * a - t.originalTop + l;
                                            r < a && (r = a);
                                            var h = s.nav.main.clientHeight;
                                            t.originalTop + r > h && (r = h - t.originalTop), (t.resizingShadow.style.height = r + "px");
                                        } else if ("top" === t.resizing.dpBorder) {
                                            var c = Math.floor((t.originalTop + o - l + a / 2) / a) * a + l;
                                            c < l && (c = l), c > t.originalTop + t.originalHeight - a && (c = t.originalTop + t.originalHeight - a);
                                            var r = t.originalHeight - (c - t.originalTop);
                                            r < a ? (r = a) : (t.resizingShadow.style.top = c + "px"), (t.resizingShadow.style.height = r + "px");
                                        }
                                    } else if (t.moving) {
                                        if ((t.movingShadow || ((t.movingShadow = s.t(t.moving, !s.g, s.shadow)), (t.movingShadow.style.width = t.movingShadow.parentNode.offsetWidth + 1 + "px")), !s.coords)) return;
                                        var a = s.cellHeight,
                                            l = 1,
                                            d = t.moveOffsetY;
                                        d || (d = a / 2);
                                        var c = Math.floor((s.coords.y - d - l + a / 2) / a) * a + l;
                                        c < l && (c = l);
                                        var u = s.nav.events,
                                            h = s.nav.main.clientHeight,
                                            v = parseInt(t.movingShadow.style.height);
                                        c + v > h && (c = h - v), (t.movingShadow.parentNode.style.display = "none"), (t.movingShadow.style.top = c + "px"), (t.movingShadow.parentNode.style.display = "");
                                        var p = u.clientWidth / u.rows[0].cells.length,
                                            f = Math.floor((s.coords.x - 45) / p);
                                        f < 0 && (f = 0), f < u.rows[0].cells.length && f >= 0 && t.movingShadow.column !== f && ((t.movingShadow.column = f), t.moveShadow(u.rows[0].cells[f]));
                                    } else if (t.selecting) {
                                        var n = DayPilot.mc(e),
                                            g = s.X.getCellCoords(),
                                            m = t.column,
                                            y = s.nav.main.rows[g.y].cells[m];
                                        n.y < t.firstMousePos.y
                                            ? ((t.selectedCells = t.getCellsBelow(y)), (t.topSelectedCell = t.selectedCells[0]), (t.bottomSelectedCell = t.firstSelected))
                                            : ((t.selectedCells = t.getCellsAbove(y)), (t.topSelectedCell = t.firstSelected), (t.bottomSelectedCell = t.selectedCells[0])),
                                            s.U();
                                    }
                                }),
                                (s.nav.scrollable.style.display = "");
                        }),
                        (this.la = function (e, t) {
                            return this.businessBeginsHour < this.businessEndsHour
                                ? !(e.getHours() < this.businessBeginsHour || e.getHours() >= this.businessEndsHour || 6 === e.getDayOfWeek() || 0 === e.getDayOfWeek())
                                : e.getHours() >= this.businessBeginsHour || e.getHours() < this.businessEndsHour;
                        }),
                        (this.r = function () {
                            var e = this.nav.header;
                            if (e && e.rows)
                                for (var t = 0; t < e.rows.length; t++)
                                    for (var i = e.rows[t], n = 0; n < i.cells.length; n++) {
                                        var s = i.cells[n];
                                        (s.onclick = null), (s.onmousemove = null), (s.onmouseout = null);
                                    }
                            this.fasterDispose || DayPilot.pu(e);
                        }),
                        (this.ma = function (e) {
                            for (var t = e ? this.nav.header.insertRow(-1) : this.nav.header.rows[0], i = this.S, n = i.length, a = 0; a < n; a++) {
                                var l = i[a],
                                    o = e ? t.insertCell(-1) : t.cells[a];
                                (o.data = l), (o.style.overflow = "hidden"), (o.style.padding = "0px"), (o.style.border = "0px none"), (o.style.height = this.headerHeight + "px");
                                var r = e ? document.createElement("div") : o.firstChild;
                                if (e) {
                                    (r.unselectable = "on"), (r.style.MozUserSelect = "none"), (r.style.cursor = "default"), (r.style.position = "relative"), (r.className = s.u("_colheader")), (r.style.height = this.headerHeight + "px");
                                    var h = document.createElement("div");
                                    (h.className = s.u("_colheader_inner")), (h.unselectable = "on"), r.appendChild(h), o.appendChild(r);
                                }
                                l.toolTip && (h.title = l.toolTip);
                                var h = r.firstChild;
                                h.innerHTML = s.na(l.name, l.html);
                            }
                        }),
                        (this.oa = function () {
                            return this.width && this.width.indexOf("px") !== -1 ? "Pixel" : "Percentage";
                        }),
                        (this.E = function () {
                            var e = this.nav.header,
                                t = !0,
                                i = this.S;
                            for (i.length; this.headerCreated && e && e.rows && e.rows.length > 0; ) this.fasterDispose || DayPilot.pu(e.rows[0]), e.deleteRow(0);
                            this.headerCreated = !0;
                            this.ma(t);
                        }),
                        (this.loadingStart = function () {
                            this.loadingLabelVisible && ((this.nav.loading.innerHTML = this.loadingLabelText), (this.nav.loading.style.top = this.headerHeight + 5 + "px"), (this.nav.loading.style.display = ""));
                        }),
                        (this.commandCallBack = function (e, t) {
                            var i = {};
                            (i.command = e), this.m("Command", t, i);
                        }),
                        (this.loadingStop = function (e) {
                            this.callbackTimeout && window.clearTimeout(this.callbackTimeout), (this.nav.loading.style.display = "none");
                        }),
                        (this.pa = function () {
                            var e = this.nav.scroll;
                            e.onscroll ||
                            (e.onscroll = function () {
                                s.qa();
                            });
                            var t = "undefined" != typeof this.ra.scrollpos ? this.ra.scrollpos : this.initScrollPos;
                            t && ("Auto" === t && (t = "BusinessHours" === this.heightSpec ? 2 * this.cellHeight * this.businessBeginsHour : 0), (e.root = this), 0 === e.scrollTop && (e.scrollTop = t));
                        }),
                        (this.callbackError = function (e, t) {
                            alert("Error!\r\nResult: " + e + "\r\nContext:" + t);
                        }),
                        (this.sa = function () {
                            var e = DayPilot.sw(this.nav.scroll),
                                t = this.nav.cornerRight;
                            t && e > 0 && (t.style.width = e + "px");
                        }),
                        (this.ta = function () {
                            t.globalHandlers || ((t.globalHandlers = !0), DayPilot.re(document, "mouseup", t.gMouseUp), DayPilot.re(window, "unload", t.gUnload));
                        }),
                        (this.events = {}),
                        (this.events.add = function (e) {
                            var t = null;
                            if (e instanceof DayPilot.Event) t = e.data;
                            else {
                                if ("object" != typeof e) throw "DayPilot.Calendar.events.add() expects an object or DayPilot.Event instance.";
                                t = e;
                            }
                            s.events.list || (s.events.list = []), s.events.list.push(t), s.update(), s.Q.notify();
                        }),
                        (this.events.find = function (e) {
                            if (!s.events.list) return null;
                            for (var t = 0; t < s.events.list.length; t++) {
                                var i = s.events.list[t];
                                if (i.id === e) return new DayPilot.Event(i, s);
                            }
                            return null;
                        }),
                        (this.events.update = function (e) {
                            if (e instanceof DayPilot.Event) e.commit();
                            else if ("object" == typeof e) {
                                var t = s.events.find(e.id);
                                if (t) {
                                    var i = DayPilot.indexOf(s.events.list, t.data);
                                    s.events.list.splice(i, 1, e);
                                }
                            }
                            s.update(), s.Q.notify();
                        }),
                        (this.events.remove = function (e) {
                            var t;
                            if (e instanceof DayPilot.Event) t = e.data;
                            else if ("object" == typeof e) {
                                var i = s.events.find(e.id);
                                i && (t = i.data);
                            } else if ("string" == typeof e || "number" == typeof e) {
                                var i = s.events.find(e);
                                i && (t = i.data);
                            }
                            var n = DayPilot.indexOf(s.events.list, t);
                            s.events.list.splice(n, 1), s.update(), s.Q.notify();
                        }),
                        (this.events.load = function (e, t, i) {
                            var n = function (e) {
                                    var t = {};
                                    (t.exception = e.exception), (t.request = e.request), "function" == typeof i && i(t);
                                },
                                a = function (e) {
                                    var i,
                                        a = e.request;
                                    try {
                                        i = JSON.parse(a.responseText);
                                    } catch (e) {
                                        var l = {};
                                        return (l.exception = e), void n(l);
                                    }
                                    if (DayPilot.isArray(i)) {
                                        var o = {};
                                        if (
                                            ((o.preventDefault = function () {
                                                this.preventDefault.value = !0;
                                            }),
                                                (o.data = i),
                                            "function" == typeof t && t(o),
                                                o.preventDefault.value)
                                        )
                                            return;
                                        (s.events.list = i), s.Y && s.update();
                                    }
                                };
                            if (s.eventsLoadMethod && "POST" === s.eventsLoadMethod.toUpperCase())
                                DayPilot.Http.ajax({ method: "POST", data: { start: s.visibleStart().toString(), end: s.visibleEnd().toString() }, url: e, success: a, error: n });
                            else {
                                var l = e,
                                    o = "start=" + s.visibleStart().toString() + "&end=" + s.visibleEnd().toString();
                                (l += l.indexOf("?") > -1 ? "&" + o : "?" + o), DayPilot.Http.ajax({ method: "GET", url: l, success: a, error: n });
                            }
                        }),
                        (this.update = function (e) {
                            s.ua(e), s.va(), s.p(), (s.nav.top.style.cursor = "auto");
                            s.B(), s.E(), s.F(), s.G(), s.H(), s.ja(), s.wa(), s.C(), s.D(), s.A(), s.I(), s.clearSelection(), this.visible ? this.show() : this.hide();
                        }),
                        (this.xa = null),
                        (this.ua = function (e) {
                            if (e) {
                                var t = {
                                    events: {
                                        preInit: function () {
                                            var e = this.data;
                                            e && (DayPilot.isArray(e.list) ? (s.events.list = e.list) : (s.events.list = e));
                                        },
                                    },
                                    columns: {
                                        preInit: function () {
                                            s.columns.list = this.data;
                                        },
                                    },
                                };
                                this.xa = t;
                                for (var i in e)
                                    if (t[i]) {
                                        var n = t[i];
                                        (n.data = e[i]), n.preInit && n.preInit();
                                    } else s[i] = e[i];
                            }
                        }),
                        (this.ya = function () {
                            var e = this.xa;
                            for (var t in e) {
                                var i = e[t];
                                i.postInit && i.postInit();
                            }
                        }),
                        (this.za = function () {
                            if (this.id && this.id.tagName) this.nav.top = this.id;
                            else {
                                if ("string" != typeof this.id) throw "DayPilot.Calendar() constructor requires the target element or its ID as a parameter";
                                if (((this.nav.top = document.getElementById(this.id)), !this.nav.top)) throw "DayPilot.Calendar: The placeholder element not found: '" + e + "'.";
                            }
                        }),
                        (this.Aa = {}),
                        (this.Aa.events = []),
                        (this.Ba = function (e) {
                            var t = this.Aa.events,
                                i = this.events.list[e],
                                n = {};
                            for (var s in i) n[s] = i[s];
                            if ("function" == typeof this.onBeforeEventRender) {
                                var a = {};
                                (a.data = n), this.onBeforeEventRender(a);
                            }
                            t[e] = n;
                        }),
                        (this.C = function () {
                            var e = this.events.list;
                            if (((s.Aa.events = []), e)) {
                                var t = e.length,
                                    i = 864e5;
                                this.cache.pixels = {};
                                var n = [];
                                (this.scrollLabels = []), (this.minStart = 1e4), (this.maxEnd = 0);
                                for (var a = 0; a < t; a++) {
                                    var l = e[a];
                                    (l.start = new DayPilot.Date(l.start)), (l.end = new DayPilot.Date(l.end));
                                }
                                if ("function" == typeof this.onBeforeEventRender) for (var a = 0; a < t; a++) this.Ba(a);
                                for (var a = 0; a < this.S.length; a++) {
                                    var o = {};
                                    (o.minEnd = 1e6), (o.maxStart = -1), this.scrollLabels.push(o);
                                    var r = this.S[a];
                                    (r.events = []), (r.lines = []), (r.blocks = []);
                                    for (var h = new DayPilot.Date(r.start), c = h.getTime(), d = h.addTime(i), u = d.getTime(), v = 0; v < t; v++)
                                        if (!n[v]) {
                                            var l = e[v],
                                                p = l.start,
                                                f = l.end,
                                                g = p.getTime(),
                                                m = f.getTime();
                                            if (!(m < g)) {
                                                var y = !(m <= c || g >= u);
                                                if (("Resources" === s.viewType && (y = y && r.id === l.resource), y)) {
                                                    var b = new DayPilot.Event(l, s);
                                                    (b.part.dayIndex = a), (b.part.start = c < g ? l.start : h), (b.part.end = u > m ? l.end : d);
                                                    var C = this.getPixels(b.part.start, r.start),
                                                        w = this.getPixels(b.part.end, r.start),
                                                        D = C.top,
                                                        S = w.top;
                                                    if (D === S && (C.cut || w.cut)) continue;
                                                    var x = w.boxBottom;
                                                    (b.part.top = Math.floor(D / this.cellHeight) * this.cellHeight + 1),
                                                        (b.part.height = Math.max(Math.ceil(x / this.cellHeight) * this.cellHeight - b.part.top, this.cellHeight - 1) + 1),
                                                        (b.part.barTop = Math.max(D - b.part.top - 1, 0)),
                                                        (b.part.barHeight = Math.max(S - D - 2, 1));
                                                    var p = b.part.top,
                                                        f = b.part.top + b.part.height;
                                                    p > o.maxStart && (o.maxStart = p),
                                                    f < o.minEnd && (o.minEnd = f),
                                                    p < this.minStart && (this.minStart = p),
                                                    f > this.maxEnd && (this.maxEnd = f),
                                                        r.events.push(b),
                                                    "function" == typeof this.onBeforeEventRender && (b.cache = this.Aa.events[v]),
                                                    b.part.start.getTime() === g && b.part.end.getTime() === m && (n[v] = !0);
                                                }
                                            }
                                        }
                                }
                                for (var a = 0; a < this.S.length; a++) {
                                    var r = this.S[a];
                                    r.events.sort(this.Ca);
                                    for (var v = 0; v < r.events.length; v++) {
                                        var l = r.events[v];
                                        r.putIntoBlock(l);
                                    }
                                    for (var v = 0; v < r.blocks.length; v++) {
                                        var k = r.blocks[v];
                                        k.events.sort(this.Ca);
                                        for (var H = 0; H < k.events.length; H++) {
                                            var l = k.events[H];
                                            k.putIntoLine(l);
                                        }
                                    }
                                }
                            }
                        }),
                        (this.Ca = function (e, t) {
                            if (!(e && t && e.start && t.start)) return 0;
                            var i = e.start().getTime() - t.start().getTime();
                            return 0 !== i ? i : t.end().getTime() - e.end().getTime();
                        }),
                        (this.debug = function (e, t) {
                            this.debuggingEnabled && (s.debugMessages || (s.debugMessages = []), s.debugMessages.push(e), "undefined" != typeof console && console.log(e));
                        }),
                        (this.getPixels = function (e, t) {
                            t || (t = this.startDate);
                            var i = t.getTime(),
                                n = e.getTime(),
                                s = this.cache.pixels[n + "_" + i];
                            if (s) return s;
                            i = t.getTime();
                            var a = 18e5,
                                l = n - i,
                                o = l % a,
                                r = l - o,
                                h = r + a;
                            0 === o && (h = r);
                            var c = {};
                            return (c.cut = !1), (c.top = this.Da(l)), (c.boxTop = this.Da(r)), (c.boxBottom = this.Da(h)), (this.cache.pixels[n + "_" + i] = c), c;
                        }),
                        (this.Da = function (e) {
                            return Math.floor((this.cellHeight * e) / 18e5);
                        }),
                        (this.va = function () {
                            this.startDate = new DayPilot.Date(this.startDate).getDatePart();
                        }),
                        (this.D = function () {
                            this.nav.corner && (this.nav.corner.style.height = this.headerHeight + "px");
                        }),
                        (this.H = function () {
                            var e = this.ca();
                            this.nav.scroll && e > 0 && (this.nav.scroll.style.height = e + "px");
                        }),
                        (this.Q = {}),
                        (this.Q.scope = null),
                        (this.Q.notify = function () {
                            s.Q.scope && s.Q.scope["$apply"]();
                        }),
                        (this.Q.apply = function (e) {
                            e();
                        }),
                        (this.qa = function () {
                            var e = s.nav.scroll.scrollTop,
                                t = e / (2 * s.cellHeight);
                            s.ra.scrollHour = t;
                        }),
                        (this.wa = function () {
                            var e = 0;
                            s.ra.scrollHour ? (e = 2 * s.cellHeight * s.ra.scrollHour) : "Auto" === s.initScrollPos && (e = "BusinessHours" === this.heightSpec ? 2 * this.cellHeight * this.businessBeginsHour : 0),
                                (s.nav.scroll.scrollTop = e);
                        }),
                        (this.Ea = function () {
                            return !(!this.backendUrl && "function" != typeof WebForm_DoCallback) && ("undefined" == typeof s.events.list || !s.events.list);
                        }),
                        (this.A = function () {
                            "hidden" === this.nav.top.style.visibility && (this.nav.top.style.visibility = "visible");
                        }),
                        (this.show = function () {
                            (s.visible = !0), (s.nav.top.style.display = "");
                        }),
                        (this.hide = function () {
                            (s.visible = !1), (s.nav.top.style.display = "none");
                        }),
                        (this.Fa = function () {
                            this.va(), this.B(), this.ba(), this.E(), this.F(), this.sa(), this.pa(), this.ta(), t.register(this), this.Ga(), this.m("Init");
                        }),
                        (this.ra = {}),
                    (this.Ha = function () {
                        (this.ra.themes = []), this.ra.themes.push(this.theme || this.cssClassPrefix);
                    }),
                    (this.Ia = function () {
                        for (var e = this.ra.themes, t = 0; t < e.length; t++) {
                            var i = e[t];
                            DayPilot.Util.removeClass(this.nav.top, i + "_main");
                        }
                        this.ra.themes = [];
                    }),
                    (this.Ja = function () {
                        if ((this.afterRender(null, !1), "function" == typeof this.onAfterRender)) {
                            var e = {};
                            (e.isCallBack = !1), this.onAfterRender(e);
                        }
                    }),
                    (this.Ka = function () {
                        if ("function" == typeof this.onInit && !this.La) {
                            this.La = !0;
                            var e = {};
                            this.onInit(e);
                        }
                    }),
                    (this.Ma = function () {
                        var e = s.nav.top;
                        return e.offsetWidth > 0 && e.offsetHeight > 0;
                    }),
                    (this.Ga = function () {
                        var e = s.Ma;
                        e() ||
                        (s.Na = setInterval(function () {
                            e() && (s.pa(), s.sa(), clearInterval(s.Na));
                        }, 100));
                    }),
                    (this.na = function (e, t) {
                        return s.w.z() ? DayPilot.Util.escapeTextHtml(e, t) : DayPilot.Util.isNullOrUndefined(t) ? (DayPilot.Util.isNullOrUndefined(e) ? "" : e) : t;
                    }),
                    (this.internal = {}),
                    (this.internal.xssTextHtml = s.na),
                    (this.init = function () {
                        this.za();
                        var e = this.Ea();
                        return (
                            this.Ha(),
                                e
                                    ? void this.Fa()
                                    : (this.va(),
                                        this.B(),
                                        this.C(),
                                        this.ba(),
                                        this.E(),
                                        this.F(),
                                        this.A(),
                                        this.sa(),
                                        this.pa(),
                                        this.ta(),
                                        t.register(this),
                                    this.events && (this.D(), this.I()),
                                        this.Ja(),
                                        this.Ka(),
                                        this.Ga(),
                                        (this.Y = !0),
                                        this)
                        );
                    }),
                    (this.Init = this.init),
                    this.ua(i);
                }),
                (t.Cell = function (e, t, i) {
                    (this.start = e), (this.end = t), (this.column = function () {});
                }),
                (t.Column = function (e, t, i) {
                    (this.value = e), (this.name = t), (this.date = new DayPilot.Date(i));
                }),
                (DayPilot.Calendar = t.Calendar),
            "undefined" != typeof jQuery &&
            !(function (e) {
                e.fn.daypilotCalendar = function (e) {
                    var t = null,
                        i = this.each(function () {
                            if (!this.daypilot) {
                                var i = new DayPilot.Calendar(this.id);
                                this.daypilot = i;
                                for (name in e) i[name] = e[name];
                                i.init(), t || (t = i);
                            }
                        });
                    return 1 === this.length ? t : i;
                };
            })(jQuery),
                (function () {
                    var e = DayPilot.am();
                    e &&
                    e.directive("daypilotCalendar", [
                        "$parse",
                        function (e) {
                            return {
                                restrict: "E",
                                template: "<div></div>",
                                replace: !0,
                                link: function (t, i, n) {
                                    var s = new DayPilot.Calendar(i[0]);
                                    (s.Q.scope = t), s.init();
                                    var a = n["id"];
                                    a && (t[a] = s);
                                    var l = n["publishAs"];
                                    if (l) {
                                        (0, e(l).assign)(t, s);
                                    }
                                    for (var o in n)
                                        0 === o.indexOf("on") &&
                                        !(function (i) {
                                            s[i] = function (s) {
                                                var a = e(n[i]);
                                                t["$apply"](function () {
                                                    a(t, { args: s });
                                                });
                                            };
                                        })(o);
                                    var r = t["$watch"],
                                        h = n["config"] || n["daypilotConfig"],
                                        c = n["events"] || n["daypilotEvents"];
                                    r.call(
                                        t,
                                        h,
                                        function (e) {
                                            for (var t in e) s[t] = e[t];
                                            s.update(), s.Ka();
                                        },
                                        !0
                                    ),
                                        r.call(
                                            t,
                                            c,
                                            function (e) {
                                                (s.events.list = e), s.update();
                                            },
                                            !0
                                        );
                                },
                            };
                        },
                    ]);
                })();
        }
    })();
if ("undefined" == typeof DayPilot) var DayPilot = {};
!(function () {
    ("undefined" != typeof DayPilot.DatePicker && DayPilot.DatePicker.close) ||
    (DayPilot.DatePicker = function (t) {
        this.v = "2022.2.384-lite";
        var e = "navigator_" + new Date().getTime(),
            i = this;
        (this.prepare = function () {
            if (((this.locale = "en-us"), (this.target = null), (this.resetTarget = !0), (this.pattern = this.a.locale().datePattern), (this.cssClassPrefix = "navigator_default"), (this.theme = null), (this.patterns = []), t))
                for (var e in t) this[e] = t[e];
            this.init();
        }),
            (this.init = function () {
                this.date = new DayPilot.Date(this.date);
                var t = this.b();
                this.resetTarget && !t && this.c(this.date),
                    DayPilot.re(document, "mousedown", function () {
                        i.close();
                    });
            }),
            (this.close = function () {
                this.d && (this.navigator && this.navigator.dispose(), (this.div.innerHTML = ""), this.div && this.div.parentNode === document.body && document.body.removeChild(this.div));
            }),
            (this.b = function () {
                var t = this.e();
                if (!t) return this.date;
                var e = null;
                if (((e = "INPUT" === t.tagName ? t.value : t.innerText), !e)) return null;
                for (var a = DayPilot.Date.parse(e, i.pattern), n = 0; n < i.patterns.length; n++) {
                    if (a) return a;
                    a = DayPilot.Date.parse(e, i.patterns[n]);
                }
                return a;
            }),
            (this.c = function (t) {
                var e = this.e();
                if (e) {
                    var a = t.toString(i.pattern, i.locale);
                    "INPUT" === e.tagName ? (e.value = a) : (e.innerHTML = a);
                }
            }),
            (this.a = {}),
            (this.a.locale = function () {
                return DayPilot.Locale.find(i.locale);
            }),
            (this.e = function () {
                var t = this.target;
                return t && t.nodeType && 1 === t.nodeType ? t : document.getElementById(t);
            }),
            (this.show = function () {
                var t = this.e(),
                    a = this.navigator,
                    a = new DayPilot.Navigator(e);
                (a.api = 2),
                    (a.theme = i.theme || i.cssClassPrefix),
                    (a.weekStarts = "Auto"),
                    (a.locale = i.locale),
                    (a.timeRangeSelectedHandling = "JavaScript"),
                    (a.onTimeRangeSelected = function (t) {
                        i.date = t.start;
                        var e = t.start,
                            a = e.toString(i.pattern, i.locale),
                            t = {};
                        (t.start = e),
                            (t.date = e),
                            (t.preventDefault = function () {
                                this.preventDefault.value = !0;
                            }),
                        ("function" == typeof i.onTimeRangeSelect && (i.onTimeRangeSelect(t), t.preventDefault.value)) || (i.c(a), i.close(), "function" == typeof i.onTimeRangeSelected && i.onTimeRangeSelected(t));
                    }),
                    (this.navigator = a);
                var n = DayPilot.abs(t),
                    o = t.offsetHeight,
                    r = document.createElement("div");
                (r.style.position = "absolute"), (r.style.left = n.x + "px"), (r.style.top = n.y + o + "px");
                var s = document.createElement("div");
                (s.id = e),
                    r.appendChild(s),
                    DayPilot.re(r, "mousedown", function (t) {
                        var t = t || window.event;
                        (t.cancelBubble = !0), t.stopPropagation && t.stopPropagation();
                    }),
                    document.body.appendChild(r),
                    (this.div = r);
                var l = i.b() || new DayPilot.Date().getDatePart();
                (a.startDate = l), (a.selectionDay = l), a.init(), (this.d = !0);
            }),
            this.prepare();
    });
})();
"undefined" == typeof DayPilot && (DayPilot = {}),
    (function (DayPilot) {
        "use strict";
        function e(t, i, a) {
            var n = i.indexOf(".");
            if (n === -1) return void ("__proto__" !== i && "constructor" !== i && (t[i] = a));
            var o = i.substring(0, n);
            if ("__proto__" !== o && "constructor" !== o) {
                var l = i.substring(n + 1),
                    d = t[o];
                ("object" == typeof d && null !== d) || ((t[o] = {}), (d = t[o])), e(d, l, a);
            }
        }
        function t(e, i, a) {
            (i = i || {}), (a = a || "");
            for (var n in e) {
                var o = e[n];
                "object" == typeof o ? ("[object Array]" === Object.prototype.toString.call(o) ? (i[a + n] = o) : o && o.toJSON ? (i[a + n] = o.toJSON()) : t(o, i, a + n + ".")) : (i[a + n] = o);
            }
            return i;
        }
        if (!DayPilot.ModalStatic) {
            (DayPilot.ModalStatic = {}),
                (DayPilot.ModalStatic.list = []),
                (DayPilot.ModalStatic.hide = function () {
                    if (this.list.length > 0) {
                        var e = this.list.pop();
                        e && e.hide();
                    }
                }),
                (DayPilot.ModalStatic.remove = function (e) {
                    for (var t = DayPilot.ModalStatic.list, i = 0; i < t.length; i++) if (t[i] === e) return void t.splice(i, 1);
                }),
                (DayPilot.ModalStatic.close = function (e) {
                    DayPilot.ModalStatic.result(e), DayPilot.ModalStatic.hide();
                }),
                (DayPilot.ModalStatic.result = function (e) {
                    var t = DayPilot.ModalStatic.list;
                    t.length > 0 && (t[t.length - 1].result = e);
                }),
                (DayPilot.ModalStatic.displayed = function (e) {
                    for (var t = DayPilot.ModalStatic.list, i = 0; i < t.length; i++) if (t[i] === e) return !0;
                    return !1;
                }),
                (DayPilot.ModalStatic.stretch = function () {
                    if (this.list.length > 0) {
                        var e = this.list[this.list.length - 1];
                        e && e.stretch();
                    }
                }),
                (DayPilot.ModalStatic.last = function () {
                    var e = DayPilot.ModalStatic.list;
                    return e.length > 0 ? e[e.length - 1] : null;
                });
            var i = function () {
                    var e = document.createElement("style");
                    e.setAttribute("type", "text/css"), e.styleSheet || e.appendChild(document.createTextNode("")), (document.head || document.getElementsByTagName("head")[0]).appendChild(e);
                    var t = !!e.styleSheet,
                        i = {};
                    return (
                        (i.rules = []),
                            (i.commit = function () {
                                try {
                                    t && (e.styleSheet.cssText = this.rules.join("\n"));
                                } catch (e) {}
                            }),
                            (i.add = function (i, a, n) {
                                if (t) return void this.rules.push(i + "{" + a + "}");
                                if (e.sheet.insertRule) "undefined" == typeof n && (n = e.sheet.cssRules.length), e.sheet.insertRule(i + "{" + a + "}", n);
                                else {
                                    if (!e.sheet.addRule) throw "No CSS registration method found";
                                    e.sheet.addRule(i, a, n);
                                }
                            }),
                            i
                    );
                },
                a = new i();
            a.add(".modal_default_main", "border: 0.6em solid var(--clr-accent); max-width: 90%;"),
                a.add(".modal_default_main:focus", "outline: none;"),
                a.add(".modal_default_content", "padding: 10px 0px;"),
                a.add(".modal_default_inner", "padding: 0.4em;"),
                a.add(".modal_default_input", "padding: 0em;"),
                a.add(".modal_default_input > div", "display: flex; flex-wrap: wrap; justify-content: space-evenly;"),
                a.add(".modal_default_buttons", "margin-top: 1em; display: flex; justify-content: space-evenly;"),
                a.add(".modal_default_buttons button", "padding: 0.3em; width: 12ch; font-size: 1rem; font-weight: 600; background-color: var(--clr-accent); color: var(--clr-light); border: 0.2em solid var(--clr-accent);"),
                a.add(".modal_default_buttons button:hover", "background-color: var(--clr-light); color: var(--clr-accent); cursor: pointer;"),
                a.add(".modal_default_form_item", "padding: 10px 0px; position: relative;"),
                a.add(".modal_default_form_item_level1", "border-left: 2px solid #ccc; margin-left: 10px; padding-left: 20px;"),
                a.add(".modal_default_form_item.modal_default_form_title", "font-size: 1.5rem; font-weight: bold;"),
                a.add(".modal_default_form_item input[type=text]", "width: 100%; box-sizing: border-box;"),
                a.add(".modal_default_form_item textarea", "width: 100%; height: 200px; box-sizing: border-box;"),
                a.add(".modal_default_form_item input[type=select]", "width: 100%; box-sizing: border-box;"),
                a.add(".modal_default_form_item_radio", "font-size: 1.1rem; font-weight: 600;"),
                a.add(".modal_default_form_item_radio label", "padding: 0.4em;"),
                a.add(".modal_default_form_item_radio input", "margin-right: 0.2em;"),
                a.add(".modal_default_form_item select", "width: 100%; box-sizing: border-box;"),
                a.add(".modal_default_form_item_label", "background-color: var(--clr-accent); color: var(--clr-light); font-size: 1.3rem; font-weight: 600; width: 100%; margin-bottom: 1em;"),
                a.add(".modal_default_form_item_label > div", "padding-left: 1em; margin-bottom: 0;"),
                a.add(".modal_default_form_item_image img", "max-width: 100%; height: auto;"),
                a.add(".modal_default_form_item_invalid", ""),
                a.add(".modal_default_form_item_invalid_message", "position: absolute; right: 0px; top: 9px; background-color: red; color: #ffffff; padding: 2px; border-radius: 2px;"),
                a.add(".modal_default_background", "opacity: 0.5; background-color: #000;"),
                a.add(".modal_default_form_item_date", "position: relative;"),
                a.add(
                    ".modal_default_form_item_date:after",
                    "content: ''; position: absolute; right: 7px; top: 50%; margin-top: 3px; width: 10px; height: 15px; background-image:url(" +
                    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB3aWR0aD0iMTAiCiAgIGhlaWdodD0iMTUiCj4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDUpIj4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojY2NjY2NjO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjM4MDM3MzM2O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBpZD0icmVjdDE5MjgiCiAgICAgICB3aWR0aD0iOS45MTUzMDYxIgogICAgICAgaGVpZ2h0PSIxMS4zNjkzNyIKICAgICAgIHg9IjAuMTE3MTg3NSIKICAgICAgIHk9Ii0zLjAwOTk5NTciCiAgICAgICByeT0iMS4zMTE4NTA1IiAvPgogICAgPHJlY3QKICAgICAgIHN0eWxlPSJmaWxsOiNjY2NjY2M7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNTk4MTQwMTI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGlkPSJyZWN0MTkzMCIKICAgICAgIHdpZHRoPSIxLjUzNDQxMzYiCiAgICAgICBoZWlnaHQ9IjIuMjE5ODI1IgogICAgICAgeD0iMi4xNTU4NDgzIgogICAgICAgeT0iLTQuMzkzNzAwMSIKICAgICAgIHJ5PSIwLjY3MTc4OTE3IiAvPgogICAgPHJlY3QKICAgICAgIHJ5PSIwLjI5NjAxNDciCiAgICAgICB5PSItMS4xNjU4NDY2IgogICAgICAgeD0iMS41MjM5NTA2IgogICAgICAgaGVpZ2h0PSIxLjgyOTkwOTEiCiAgICAgICB3aWR0aD0iMS44MzQyMjUxIgogICAgICAgaWQ9InJlY3QxOTQ4IgogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS40MjE4OTE5MztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiAvPgogICAgPHJlY3QKICAgICAgIHJ5PSIwLjY3MTc4OTE3IgogICAgICAgeT0iLTQuMzkzNzAwMSIKICAgICAgIHg9IjYuNDUyNzIzNSIKICAgICAgIGhlaWdodD0iMi4yMTk4MjUiCiAgICAgICB3aWR0aD0iMS41MzQ0MTM2IgogICAgICAgaWQ9InJlY3QyMDAzIgogICAgICAgc3R5bGU9ImZpbGw6I2NjY2NjYztmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS41OTgxNDAxMjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiAvPgogICAgPHJlY3QKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNDIxODkxOTM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGlkPSJyZWN0MjAwNSIKICAgICAgIHdpZHRoPSIxLjgzNDIyNTEiCiAgICAgICBoZWlnaHQ9IjEuODI5OTA5MSIKICAgICAgIHg9IjQuMjE5MjYzMSIKICAgICAgIHk9Ii0xLjE2NTg0NjYiCiAgICAgICByeT0iMC4yOTYwMTQ3IiAvPgogICAgPHJlY3QKICAgICAgIHJ5PSIwLjI5NjAxNDciCiAgICAgICB5PSItMS4xNjU4NDY2IgogICAgICAgeD0iNi45OTI3MDA2IgogICAgICAgaGVpZ2h0PSIxLjgyOTkwOTEiCiAgICAgICB3aWR0aD0iMS44MzQyMjUxIgogICAgICAgaWQ9InJlY3QyMDA3IgogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS40MjE4OTE5MztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiAvPgogICAgPHJlY3QKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNDIxODkxOTM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGlkPSJyZWN0MjAxMyIKICAgICAgIHdpZHRoPSIxLjgzNDIyNTEiCiAgICAgICBoZWlnaHQ9IjEuODI5OTA5MSIKICAgICAgIHg9IjEuNTIzOTUwNiIKICAgICAgIHk9IjEuODAyOTAzNCIKICAgICAgIHJ5PSIwLjI5NjAxNDciIC8+CiAgICA8cmVjdAogICAgICAgcnk9IjAuMjk2MDE0NyIKICAgICAgIHk9IjEuODAyOTAzNCIKICAgICAgIHg9IjQuMjE5MjYzMSIKICAgICAgIGhlaWdodD0iMS44Mjk5MDkxIgogICAgICAgd2lkdGg9IjEuODM0MjI1MSIKICAgICAgIGlkPSJyZWN0MjAxNSIKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNDIxODkxOTM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgLz4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjQyMTg5MTkzO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBpZD0icmVjdDIwMTciCiAgICAgICB3aWR0aD0iMS44MzQyMjUxIgogICAgICAgaGVpZ2h0PSIxLjgyOTkwOTEiCiAgICAgICB4PSI2Ljk5MjcwMDYiCiAgICAgICB5PSIxLjgwMjkwMzQiCiAgICAgICByeT0iMC4yOTYwMTQ3IiAvPgogICAgPHJlY3QKICAgICAgIHJ5PSIwLjI5NjAxNDciCiAgICAgICB5PSI0LjczMjU5MDciCiAgICAgICB4PSIxLjU2MzAxMzEiCiAgICAgICBoZWlnaHQ9IjEuODI5OTA5MSIKICAgICAgIHdpZHRoPSIxLjgzNDIyNTEiCiAgICAgICBpZD0icmVjdDIwMTkiCiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjQyMTg5MTkzO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIC8+CiAgICA8cmVjdAogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS40MjE4OTE5MztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgaWQ9InJlY3QyMDIxIgogICAgICAgd2lkdGg9IjEuODM0MjI1MSIKICAgICAgIGhlaWdodD0iMS44Mjk5MDkxIgogICAgICAgeD0iNC4yNTgzMjU2IgogICAgICAgeT0iNC43MzI1OTA3IgogICAgICAgcnk9IjAuMjk2MDE0NyIgLz4KICAgIDxyZWN0CiAgICAgICByeT0iMC4yOTYwMTQ3IgogICAgICAgeT0iNC43MzI1OTA3IgogICAgICAgeD0iNy4wMzE3NjMxIgogICAgICAgaGVpZ2h0PSIxLjgyOTkwOTEiCiAgICAgICB3aWR0aD0iMS44MzQyMjUxIgogICAgICAgaWQ9InJlY3QyMDIzIgogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS40MjE4OTE5MztzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiAvPgogIDwvZz4KPC9zdmc+Cg==" +
                    ")"
                ),
            navigator.userAgent.indexOf("Edge") !== -1 && a.add(".modal_default_form_item_date input::-ms-clear", "display: none;"),
                a.add(".modal_default_form_item_scrollable_scroll", "width: 100%; height: 200px; box-sizing: border-box; border: 1px solid #ccc; overflow-y: auto;"),
                a.add(".modal_default_form_item_scrollable_scroll_content", "padding: 5px;"),
                a.add(".modal_default_form_item_searchable", "position: relative;"),
                a.add(".modal_default_form_item_searchable_icon", ""),
                a.add(
                    ".modal_default_form_item_searchable_icon:after",
                    "content:''; position: absolute; right: 5px; top: 50%; margin-top: -8px; width: 10px; height: 15px; background-image:url(" +
                    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB3aWR0aD0iMTAiCiAgIGhlaWdodD0iMTUiCj4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDUpIj4KICAgIDxwYXRoCiAgICAgICBpZD0icGF0aDMxNzMiCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojOTk5OTk5O3N0cm9rZS13aWR0aDoxLjg1MTk2ODUzO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIKICAgICAgIGQ9Ik0gMC45NTQxNDgzOCwwLjY4MTYwMzEgNS4wMzkwNjI1LDUuNDExNTM4NiA5LjEyMzk3NjYsMC42ODE2MDMxIgogICAgICAgIC8+CiAgPC9nPgo8L3N2Zz4K" +
                    ");"
                ),
                a.add(".modal_default_form_item_searchable_list", "box-sizing: border-box; border: 1px solid #999; max-height: 150px; overflow-y: auto;"),
                a.add(".modal_default_form_item_searchable_list_item", "background: white; padding: 2px; cursor: default;"),
                a.add(".modal_default_form_item_searchable_list_item_highlight", "background: #ccc;"),
                a.add(".modal_default_form_item_tabular_main", "margin-top: 10px;"),
                a.add(".modal_default_form_item_tabular_table", "display: table; width: 100%; xbackground-color: #fff; border-collapse: collapse;"),
                a.add(".modal_default_form_item_tabular_tbody", "display: table-row-group;"),
                a.add(".modal_default_form_item_tabular_row", "display: table-row;"),
                a.add(".modal_default_form_item_tabular_row.modal_default_form_item_tabular_header", ""),
                a.add(".modal_default_form_item_tabular_cell.modal_default_form_item_tabular_rowaction", "padding: 0px; width: 23px;"),
                a.add(".modal_default_form_item_tabular_cell", "display: table-cell; border: 0px; padding: 2px 2px 2px 0px; cursor: default; vertical-align: bottom;"),
                a.add(".modal_default_form_item_tabular_header .modal_default_form_item_tabular_cell", "padding-left: 0px; padding-bottom: 0px;"),
                a.add(".modal_default_form_item_tabular_table input[type=text], .modal_default_form_item_tabular_table input[type=number]", "width:100%; box-sizing: border-box;"),
                a.add(".modal_default_form_item_tabular_table select", "width:100%; height:100%; box-sizing: border-box;"),
                a.add(
                    ".modal_default_form_item_tabular_plus",
                    "display: inline-block; background-color: #ccc; color: white; width: 20px; height: 20px; border-radius: 10px; box-sizing: border-box; position: relative; margin-left: 3px; margin-top: 3px; cursor: pointer;"
                ),
                a.add(
                    ".modal_default_form_item_tabular_plus:after",
                    "content: ''; position: absolute; left: 5px; top: 5px; width: 10px; height: 10px;   background-image: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTSA1LjAgMC41IEwgNS4wIDkuNSBNIDAuNSA1LjAgTCA5LjUgNS4wJyBzdHlsZT0nZmlsbDpub25lO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbGluZWNhcDpidXR0JyAvPjwvc3ZnPg==\")"
                ),
                a.add(
                    ".modal_default_form_item_tabular_delete",
                    "display: inline-block; background-color: #ccc; color: white; width: 20px; height: 20px; border-radius: 10px; box-sizing: border-box; position: relative; margin-left: 3px; margin-top: 3px; cursor: pointer;"
                ),
                a.add(
                    ".modal_default_form_item_tabular_delete:after",
                    "content: ''; position: absolute; left: 5px; top: 5px; width: 10px; height: 10px;   background-image: url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTSAwLjUgMC41IEwgOS41IDkuNSBNIDAuNSA5LjUgTCA5LjUgMC41JyBzdHlsZT0nZmlsbDpub25lO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbGluZWNhcDpidXR0JyAvPjwvc3ZnPg==\")"
                ),
                a.add(".modal_default_form_item_tabular_disabled .modal_default_form_item_tabular_plus", "display: none;"),
                a.add(".modal_default_form_item_tabular_plus_max.modal_default_form_item_tabular_plus", "display: none;"),
                a.add(".modal_default_form_item_tabular_disabled .modal_default_form_item_tabular_delete", "visibility: hidden;"),
                a.add(".modal_default_form_item_tabular_empty", "height: 1px; margin: 5px 23px 5px 0px; background-color: #ccc;"),
                a.add(".modal_default_form_item_tabular_spacer .modal_default_form_item_tabular_cell", "padding: 0px;"),
                a.add(".modal_min_main", "border: 1px solid #ccc; max-width: 90%;"),
                a.add(".modal_min_background", "opacity: 0.5; background-color: #000;"),
                a.add(".modal_min_ok", "padding: 3px 10px;"),
                a.add(".modal_min_cancel", "padding: 3px 10px;"),
                a.add(".navigator_modal_main", "border-left: 1px solid #c0c0c0;border-right: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;background-color: white;color: #000000; box-sizing: content-box;"),
                a.add(".navigator_modal_main *, .navigator_modal_main *:before, .navigator_modal_main *:after", "box-sizing: content-box;"),
                a.add(".navigator_modal_month", "font-size: 11px;"),
                a.add(".navigator_modal_day", "color: black;"),
                a.add(".navigator_modal_weekend", "background-color: #f0f0f0;"),
                a.add(".navigator_modal_dayheader", "color: black;"),
                a.add(".navigator_modal_line", "border-bottom: 1px solid #c0c0c0;"),
                a.add(".navigator_modal_dayother", "color: gray;"),
                a.add(".navigator_modal_todaybox", "border: 1px solid red;"),
                a.add(".navigator_modal_title, .navigator_modal_titleleft, .navigator_modal_titleright", "border-top: 1px solid #c0c0c0;border-bottom: 1px solid #c0c0c0;color: #333;background: #f3f3f3;"),
                a.add(".navigator_modal_busy", "font-weight: bold;"),
                a.add(".navigator_modal_cell", "text-align: center;"),
                a.add(".navigator_modal_select .navigator_modal_cell_box", "background-color: #FFE794; opacity: 0.5;"),
                a.add(".navigator_modal_title", "text-align: center;"),
                a.add(".navigator_modal_titleleft, .navigator_modal_titleright", "text-align: center;"),
                a.add(".navigator_modal_dayheader", "text-align: center;"),
                a.add(".navigator_modal_weeknumber", "text-align: center;"),
                a.add(".navigator_modal_cell_text", "cursor: pointer;"),
                a.commit(),
                (DayPilot.Modal = function (e) {
                    (this.autoFocus = !0),
                        (this.focus = null),
                        (this.autoStretch = !0),
                        (this.autoStretchFirstLoadOnly = !1),
                        (this.className = null),
                        (this.theme = "modal_default"),
                        (this.disposeOnClose = !0),
                        (this.dragDrop = !0),
                        (this.loadingHtml = null),
                        (this.maxHeight = null),
                        (this.scrollWithPage = !0),
                        (this.useIframe = !0),
                        (this.zIndex = 99999),
                        (this.left = null),
                        (this.width = 600),
                        (this.top = 20),
                        (this.height = 200),
                        (this.locale = null),
                        (this.closed = null),
                        (this.onClose = null),
                        (this.onClosed = null),
                        (this.onShow = null);
                    var t = this;
                    (this.id = "_" + new Date().getTime() + "n" + 10 * Math.random()),
                        (this.a = !1),
                        (this.b = null),
                        (this.c = null),
                        (this.showHtml = function (e) {
                            if (DayPilot.ModalStatic.displayed(this)) throw "This modal dialog is already displayed.";
                            if ((this.div || this.d(), this.e(), this.useIframe)) {
                                var t = function (e, t) {
                                    return function () {
                                        e.setInnerHTML(e.id + "iframe", t);
                                    };
                                };
                                window.setTimeout(t(this, e), 0);
                            } else e.nodeType ? this.div.appendChild(e) : (this.div.innerHTML = e);
                            this.e(), this.f(), this.g();
                        }),
                        (this.showUrl = function (e) {
                            if (DayPilot.ModalStatic.displayed(this)) throw "This modal dialog is already displayed.";
                            if (this.useIframe) {
                                this.div || this.d();
                                var i = this.loadingHtml;
                                i && ((this.iframe.src = "about:blank"), this.setInnerHTML(this.id + "iframe", i)), this.re(this.iframe, "load", this.h), (this.iframe.src = e), this.e(), this.f(), this.g();
                            } else
                                t.i({
                                    url: e,
                                    success: function (e) {
                                        var i = e.request.responseText;
                                        t.showHtml(i);
                                    },
                                    error: function (e) {
                                        t.showHtml("Error loading the modal dialog");
                                    },
                                });
                        }),
                        (this.g = function () {
                            if ("function" == typeof t.onShow) {
                                var e = {};
                                (e.root = t.j()), (e.modal = t), t.onShow(e);
                            }
                        }),
                        (this.j = function () {
                            return t.iframe ? t.iframe.contentWindow.document : t.div;
                        }),
                        (this.i = function (e) {
                            var t = new XMLHttpRequest();
                            if (t) {
                                var i = e.method || "GET",
                                    a = e.success || function () {},
                                    n = e.error || function () {},
                                    o = e.data,
                                    l = e.url;
                                t.open(i, l, !0),
                                    t.setRequestHeader("Content-type", "text/plain"),
                                    (t.onreadystatechange = function () {
                                        if (4 === t.readyState)
                                            if (200 === t.status || 304 === t.status) {
                                                var e = {};
                                                (e.request = t), a(e);
                                            } else if (n) {
                                                var e = {};
                                                (e.request = t), n(e);
                                            } else window.console && console.log("HTTP error " + t.status);
                                    }),
                                4 !== t.readyState && ("object" == typeof o && (o = JSON.stringify(o)), t.send(o));
                            }
                        }),
                        (this.e = function () {
                            delete this.result;
                            var e = window,
                                i = document,
                                a = e.pageYOffset ? e.pageYOffset : i.documentElement && i.documentElement.scrollTop ? i.documentElement.scrollTop : i.body.scrollTop;
                            this.theme && (this.hideDiv.className = this.theme + "_background"),
                            this.zIndex && (this.hideDiv.style.zIndex = this.zIndex),
                                (this.hideDiv.style.display = ""),
                                window.setTimeout(function () {
                                    t.hideDiv &&
                                    (t.hideDiv.onclick = function () {
                                        t.hide({ backgroundClick: !0 });
                                    });
                                }, 500),
                                this.theme ? (this.div.className = this.theme + "_main") : (this.div.className = ""),
                            this.className && (this.div.className += " " + this.className),
                                this.left ? (this.div.style.left = this.left + "px") : (this.div.style.marginLeft = "-" + Math.floor(this.width / 2) + "px"),
                                (this.div.style.position = "absolute"),
                                (this.div.style.boxSizing = "content-box"),
                                (this.div.style.top = a + this.top + "px"),
                                (this.div.style.width = this.width + "px"),
                            this.zIndex && (this.div.style.zIndex = this.zIndex),
                            this.height && (this.useIframe || !this.autoStretch ? (this.div.style.height = this.height + "px") : (this.div.style.height = "")),
                            this.useIframe && this.height && (this.iframe.style.height = this.height + "px"),
                                (this.div.style.display = ""),
                                this.l(),
                                DayPilot.ModalStatic.remove(this),
                                DayPilot.ModalStatic.list.push(this);
                        }),
                        (this.h = function () {
                            (t.iframe.contentWindow.modal = t), t.autoStretch && t.stretch();
                        }),
                        (this.stretch = function () {
                            var e = function () {
                                    return t.k().y;
                                },
                                i = function () {
                                    return t.k().x;
                                };
                            if (this.useIframe) {
                                for (var a = i() - 40, n = this.width; n < a && this.m(); n += 10) (this.div.style.width = n + "px"), (this.div.style.marginLeft = "-" + Math.floor(n / 2) + "px");
                                for (var o = this.maxHeight || e() - 2 * this.top, l = this.height; l < o && this.n(); l += 10) (this.iframe.style.height = l + "px"), (this.div.style.height = l + "px");
                                this.autoStretchFirstLoadOnly && this.ue(this.iframe, "load", this.h);
                            } else this.div.style.height = "";
                        }),
                        (this.m = function () {
                            for (var e = this.iframe.contentWindow.document, t = "BackCompat" === e.compatMode ? e.body : e.documentElement, i = t.scrollWidth, a = e.body.children, n = 0; n < a.length; n++) {
                                var o = a[n].offsetLeft + a[n].offsetWidth;
                                i = Math.max(i, o);
                            }
                            return i > t.clientWidth;
                        }),
                        (this.n = function () {
                            for (var e = this.iframe.contentWindow.document, t = "BackCompat" === e.compatMode ? e.body : e.documentElement, i = t.scrollHeight, a = e.body.children, n = 0; n < a.length; n++) {
                                var o = a[n].offsetTop + a[n].offsetHeight;
                                i = Math.max(i, o);
                            }
                            return i > t.clientHeight;
                        }),
                        (this.k = function () {
                            var e = document;
                            if ("CSS1Compat" === e.compatMode && e.documentElement && e.documentElement.clientWidth) {
                                var t = e.documentElement.clientWidth,
                                    i = e.documentElement.clientHeight;
                                return { x: t, y: i };
                            }
                            var t = e.body.clientWidth,
                                i = e.body.clientHeight;
                            return { x: t, y: i };
                        }),
                        (this.f = function () {
                            this.a || (this.re(window, "resize", this.o), this.re(window, "scroll", this.p), this.dragDrop && (this.re(document, "mousemove", this.q), this.re(document, "mouseup", this.r)), (this.a = !0));
                        }),
                        (this.s = function () {
                            this.ue(window, "resize", this.o), this.ue(window, "scroll", this.p), this.dragDrop && (this.ue(document, "mousemove", this.q), this.ue(document, "mouseup", this.r)), (this.a = !1);
                        }),
                        (this.t = function (e) {
                            e.target === t.div && (e.preventDefault(), (t.div.style.cursor = "move"), t.u(), (t.c = t.mc(e || window.event)), (t.b = { x: t.div.offsetLeft, y: t.div.offsetTop }));
                        }),
                        (this.q = function (e) {
                            if (t.c) {
                                var e = e || window.event,
                                    i = t.mc(e),
                                    a = i.x - t.c.x,
                                    n = i.y - t.c.y;
                                (t.div.style.marginLeft = "0px"), (t.div.style.top = t.b.y + n + "px"), (t.div.style.left = t.b.x + a + "px");
                            }
                        }),
                        (this.r = function (e) {
                            t.c && (t.v(), (t.div.style.cursor = null), (t.c = null));
                        }),
                        (this.u = function () {
                            if (this.useIframe) {
                                var e = document.createElement("div");
                                (e.style.backgroundColor = "#ffffff"),
                                    (e.style.filter = "alpha(opacity=80)"),
                                    (e.style.opacity = "0.80"),
                                    (e.style.width = "100%"),
                                    (e.style.height = this.height + "px"),
                                    (e.style.position = "absolute"),
                                    (e.style.left = "0px"),
                                    (e.style.top = "0px"),
                                    this.div.appendChild(e),
                                    (this.mask = e);
                            }
                        }),
                        (this.v = function () {
                            this.useIframe && (this.div.removeChild(this.mask), (this.mask = null));
                        }),
                        (this.o = function () {
                            t.w(), t.l();
                        }),
                        (this.p = function () {
                            t.w();
                        }),
                        (this.l = function () {
                            if (!t.left && t.div) {
                                var e = t.div.offsetWidth;
                                t.div.style.marginLeft = "-" + Math.floor(e / 2) + "px";
                            }
                        }),
                        (this.w = function () {
                            if (t.hideDiv && t.div && "none" !== t.hideDiv.style.display && "none" !== t.div.style.display) {
                                var e = t.z.scrollY();
                                t.scrollWithPage || (t.div.style.top = e + t.top + "px");
                            }
                        }),
                        (this.z = {}),
                        (this.z.container = function () {
                            return t.container || document.body;
                        }),
                        (this.z.scrollY = function () {
                            var e = t.z.container();
                            return e === document.body
                                ? window.pageYOffset
                                    ? window.pageYOffset
                                    : document.documentElement && document.documentElement.scrollTop
                                        ? document.documentElement.scrollTop
                                        : document.body.scrollTop
                                : e.scrollTop;
                        }),
                        (this.re = function (e, t, i) {
                            e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent && e.attachEvent("on" + t, i);
                        }),
                        (this.ue = function (e, t, i) {
                            e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent && e.detachEvent("on" + t, i);
                        }),
                        (this.mc = function (e) {
                            return e.pageX || e.pageY ? { x: e.pageX, y: e.pageY } : { x: e.clientX + document.documentElement.scrollLeft, y: e.clientY + document.documentElement.scrollTop };
                        }),
                        (this.abs = function (e) {
                            for (var t = { x: e.offsetLeft, y: e.offsetTop }; e.offsetParent; ) (e = e.offsetParent), (t.x += e.offsetLeft), (t.y += e.offsetTop);
                            return t;
                        }),
                        (this.d = function () {
                            var e = t.z.container(),
                                i = e === document.body,
                                a = i ? "fixed" : "absolute",
                                n = document.createElement("div");
                            (n.id = this.id + "hide"),
                                (n.style.position = a),
                                (n.style.left = "0px"),
                                (n.style.top = "0px"),
                                (n.style.right = "0px"),
                                (n.style.bottom = "0px"),
                                (n.oncontextmenu = function () {
                                    return !1;
                                }),
                                (n.onmousedown = function () {
                                    return !1;
                                }),
                                e.appendChild(n);
                            var o = document.createElement("div");
                            (o.id = this.id + "popup"),
                                (o.style.position = a),
                                (o.style.left = "50%"),
                                (o.style.top = "0px"),
                                (o.style.backgroundColor = "white"),
                                (o.style.width = "50px"),
                                (o.style.height = "50px"),
                            this.dragDrop && (o.onmousedown = this.t),
                                o.addEventListener("keydown", function (e) {
                                    e.stopPropagation();
                                });
                            var l = null;
                            this.useIframe &&
                            ((l = document.createElement("iframe")), (l.id = this.id + "iframe"), (l.name = this.id + "iframe"), (l.frameBorder = "0"), (l.style.width = "100%"), (l.style.height = "50px"), o.appendChild(l)),
                                e.appendChild(o),
                                (this.div = o),
                                (this.iframe = l),
                                (this.hideDiv = n);
                        }),
                        (this.setInnerHTML = function (e, i) {
                            var a = window.frames[e],
                                n = a.contentWindow || a.document || a.contentDocument;
                            n.document && (n = n.document),
                            null == n.body && n.write("<body></body>"),
                                i.nodeType ? n.body.appendChild(i) : (n.body.innerHTML = i),
                            t.autoStretch && ((t.autoStretchFirstLoadOnly && t.A) || (t.stretch(), (t.A = !0)));
                        }),
                        (this.close = function (e) {
                            (this.result = e), this.hide();
                        }),
                        (this.closeSerialized = function () {
                            for (var e = t.j(), i = e.querySelectorAll("input, textarea, select"), a = {}, n = 0; n < i.length; n++) {
                                var o = i[n],
                                    l = o.name;
                                if (l) {
                                    var d = o.value;
                                    a[l] = d;
                                }
                            }
                            t.close(a);
                        }),
                        (this.hide = function (e) {
                            e = e || {};
                            var i = {};
                            (i.backgroundClick = !!e.backgroundClick),
                                (i.result = this.result),
                                (i.canceled = "undefined" == typeof this.result),
                                (i.preventDefault = function () {
                                    this.preventDefault.value = !0;
                                }),
                            ("function" == typeof this.onClose && (this.onClose(i), i.preventDefault.value)) ||
                            (this.div && ((this.div.style.display = "none"), (this.hideDiv.style.display = "none"), this.useIframe || (this.div.innerHTML = null)),
                                window.focus(),
                                DayPilot.ModalStatic.remove(this),
                                "function" == typeof this.onClosed ? this.onClosed(i) : this.closed && this.closed(),
                                delete this.result,
                            this.disposeOnClose && (t.s(), t.B(t.div), t.B(t.hideDiv), (t.div = null), (t.hideDiv = null), (t.iframe = null)));
                        }),
                        (this.B = function (e) {
                            e && e.parentNode && e.parentNode.removeChild(e);
                        }),
                        (this.C = function () {
                            if (e) for (var t in e) this[t] = e[t];
                        }),
                        this.C();
                }),
                (DayPilot.Modal.alert = function (e, t) {
                    (t = t || {}), (t.height = t.height || 40), (t.useIframe = !1);
                    var i = t.okText || "OK";
                    t.cancelText || "Cancel";
                    return DayPilot.getPromise(function (a, n) {
                        t.onClosed = function (e) {
                            a(e);
                        };
                        var o = new DayPilot.Modal(t),
                            l = document.createElement("div");
                        l.className = o.theme + "_inner";
                        var d = document.createElement("div");
                        (d.className = o.theme + "_content"), (d.innerHTML = e);
                        var r = document.createElement("div");
                        r.className = o.theme + "_buttons";
                        var s = document.createElement("button");
                        (s.innerText = i),
                            (s.className = o.theme + "_ok"),
                            (s.onclick = function (e) {
                                DayPilot.ModalStatic.close("OK");
                            }),
                            r.appendChild(s),
                            l.appendChild(d),
                            l.appendChild(r),
                            o.showHtml(l),
                        o.autoFocus && s.focus();
                    });
                }),
                (DayPilot.Modal.confirm = function (e, t) {
                    (t = t || {}), (t.height = t.height || 40), (t.useIframe = !1);
                    var i = t.okText || "OK",
                        a = t.cancelText || "Cancel";
                    return DayPilot.getPromise(function (n, o) {
                        t.onClosed = function (e) {
                            n(e);
                        };
                        var l = new DayPilot.Modal(t),
                            d = document.createElement("div");
                        d.className = l.theme + "_inner";
                        var r = document.createElement("div");
                        (r.className = l.theme + "_content"), (r.innerHTML = e);
                        var s = document.createElement("div");
                        s.className = l.theme + "_buttons";
                        var c = document.createElement("button");
                        (c.innerText = i),
                            (c.className = l.theme + "_ok"),
                            (c.onclick = function (e) {
                                DayPilot.ModalStatic.close("OK");
                            });
                        var u = document.createTextNode(" "),
                            m = document.createElement("button");
                        (m.innerText = a),
                            (m.className = l.theme + "_cancel"),
                            (m.onclick = function (e) {
                                DayPilot.ModalStatic.close();
                            }),
                            s.appendChild(c),
                            s.appendChild(u),
                            s.appendChild(m),
                            d.appendChild(r),
                            d.appendChild(s),
                            l.showHtml(d),
                        l.autoFocus && c.focus();
                    });
                }),
                (DayPilot.Modal.prompt = function (e, t, i) {
                    "object" == typeof t && ((i = t), (t = "")), (i = i || {}), (i.height = i.height || 40), (i.useIframe = !1);
                    var a = i.okText || "OK",
                        n = i.cancelText || "Cancel",
                        o = t || "";
                    return DayPilot.getPromise(function (t, l) {
                        i.onClosed = function (e) {
                            t(e);
                        };
                        var d = new DayPilot.Modal(i),
                            r = document.createElement("div");
                        r.className = d.theme + "_inner";
                        var s = document.createElement("div");
                        (s.className = d.theme + "_content"), (s.innerHTML = e);
                        var c = document.createElement("div");
                        c.className = d.theme + "_input";
                        var u = document.createElement("input");
                        (u.value = o),
                            (u.style.width = "100%"),
                            (u.onkeydown = function (e) {
                                var t = !1;
                                switch (e.keyCode) {
                                    case 13:
                                        d.close(this.value);
                                        break;
                                    case 27:
                                        d.close();
                                        break;
                                    default:
                                        t = !0;
                                }
                                t || (e.preventDefault(), e.stopPropagation());
                            }),
                            c.appendChild(u);
                        var m = document.createElement("div");
                        m.className = d.theme + "_buttons";
                        var h = document.createElement("button");
                        (h.innerText = a),
                            (h.className = d.theme + "_ok"),
                            (h.onclick = function (e) {
                                d.close(u.value);
                            });
                        var p = document.createTextNode(" "),
                            f = document.createElement("button");
                        (f.innerText = n),
                            (f.className = d.theme + "_cancel"),
                            (f.onclick = function (e) {
                                d.close();
                            }),
                            m.appendChild(h),
                            m.appendChild(p),
                            m.appendChild(f),
                            r.appendChild(s),
                            r.appendChild(c),
                            r.appendChild(m),
                            d.showHtml(r),
                        d.autoFocus && u.focus();
                    });
                });
            var n = function (e) {
                return "[object Array]" === Object.prototype.toString.call(e);
            };
            (DayPilot.Modal.form = function (t, i, a) {
                if (1 === arguments.length) {
                    var l = t;
                    if (n(l)) i = {};
                    else {
                        if ("object" != typeof l) throw "Invalid DayPilot.Modal.form() parameter";
                        (i = t), (t = []);
                        for (var d in i) {
                            var r = {};
                            (r.name = d), (r.id = d), t.push(r);
                        }
                    }
                }
                var s = {};
                for (var d in a) s[d] = a[d];
                (s.height = s.height || 40), (s.useIframe = !1);
                var c = s.okText || "Einfügen",
                    u = s.cancelText || "Abbrechen";
                return DayPilot.getPromise(function (a, n) {
                    s.onClosed = function (t) {
                        if (t.result) {
                            var n = JSON.parse(JSON.stringify(i));
                            for (var o in t.result) e(n, o, t.result[o]);
                            t.result = n;
                        }
                        a(t);
                    };
                    var l = new DayPilot.Modal(s),
                        d = document.createElement("div");
                    d.className = l.theme + "_inner";
                    var r = document.createElement("div");
                    r.className = l.theme + "_input";
                    var m = new o({
                            theme: l.theme,
                            form: t,
                            data: i,
                            zIndex: l.zIndex,
                            locale: l.locale,
                            plugins: l.plugins,
                            onKey: function (e) {
                                switch (e.key) {
                                    case "Enter":
                                        m.validate() && l.close(m.serialize());
                                        break;
                                    case "Escape":
                                        l.close();
                                }
                            },
                            onChange: function (e) {
                                "function" == typeof l.onChange && l.onChange(e);
                            },
                        }),
                        h = m.create();
                    r.append(h);
                    var p = document.createElement("div");
                    p.className = l.theme + "_buttons";
                    var f = document.createElement("button");
                    (f.innerText = c),
                        (f.className = l.theme + "_ok"),
                    s.okDisabled && (f.disabled = !0),
                        (f.onclick = function (e) {
                            m.validate() && l.close(m.serialize());
                        });
                    var v = document.createTextNode(" "),
                        g = document.createElement("button");
                    if (
                        ((g.innerText = u),
                            (g.className = l.theme + "_cancel"),
                            (g.onclick = function (e) {
                                l.close();
                            }),
                            (g.onmousedown = function (e) {
                                m.canceling = !0;
                            }),
                            p.appendChild(f),
                            p.appendChild(v),
                            p.appendChild(g),
                            d.appendChild(r),
                            d.appendChild(p),
                            l.showHtml(d),
                            l.div.setAttribute("tabindex", "-1"),
                            l.div.addEventListener("keydown", function (e) {
                                switch (e.keyCode) {
                                    case 27:
                                        l.close();
                                        break;
                                    case 13:
                                        m.validate() && l.close(m.serialize());
                                }
                            }),
                            l.focus)
                    ) {
                        var b = null;
                        if ("object" == typeof l.focus) {
                            var y = l.focus.id,
                                I = l.focus.value;
                            b = m.findViewById(y, I);
                        } else "string" == typeof l.focus && (b = m.findViewById(l.focus));
                        b && b.focus();
                    } else {
                        var _ = m.firstFocusable();
                        l.autoFocus && _ ? _.focus() : l.div.focus();
                    }
                });
            }),
                (DayPilot.Modal.close = function (e) {
                    var t = DayPilot.Modal.opener();
                    t && t.close(e);
                }),
                (DayPilot.Modal.stretch = function (e) {
                    var t = DayPilot.Modal.opener();
                    if (!t) throw "Unable to find the opener DayPilot.Modal instance.";
                    t.stretch();
                }),
                (DayPilot.Modal.closeSerialized = function () {
                    var e = DayPilot.Modal.opener() || DayPilot.ModalStatic.last();
                    e && e.closeSerialized();
                }),
                (DayPilot.Modal.opener = function () {
                    return "undefined" != typeof DayPilot && "undefined" != typeof DayPilot.ModalStatic && DayPilot.ModalStatic.list.length > 0
                        ? DayPilot.ModalStatic.list[DayPilot.ModalStatic.list.length - 1]
                        : parent && parent.DayPilot && parent.DayPilot.ModalStatic && parent.DayPilot.ModalStatic.list[parent.DayPilot.ModalStatic.list.length - 1];
                }),
                (DayPilot.Modal.Experimental = {}),
                (DayPilot.Modal.Experimental.Form = o),
            "undefined" == typeof DayPilot.getPromise &&
            (DayPilot.getPromise = function (e) {
                return "undefined" != typeof Promise
                    ? new Promise(e)
                    : ((DayPilot.Promise = function (e) {
                        var t = this;
                        (this.then = function (t, i) {
                            return (t = t || function () {}), (i = i || function () {}), e(t, i), DayPilot.getPromise(e);
                        }),
                            (this["catch"] = function (i) {
                                return t.then(null, i), DayPilot.getPromise(e);
                            });
                    }),
                        new DayPilot.Promise(e));
            });
            var o = function (e) {
                (this.form = []),
                    (this.data = {}),
                    (this.theme = "form_default"),
                    (this.zIndex = 99999),
                    (this.locale = "en-us"),
                    (this.plugins = {}),
                    (this.onKey = null),
                    (this.D = []),
                    (this.E = null),
                    (this.canceling = !1),
                    (this.F = []),
                    (this.G = []),
                    (this.H = null),
                    (e = e || {});
                for (var t in e) this[t] = e[t];
            };
            (o.prototype.create = function () {
                return this.load(), this.render(), this.H;
            }),
                (o.prototype.render = function () {
                    var e = this;
                    (this.H = document.createElement("div")),
                        this.D.forEach(function (t) {
                            e.createView(t);
                        }),
                        this.applyState();
                }),
                (o.prototype.createView = function (e) {
                    var t = this.theme,
                        i = this,
                        a = document.createElement("div");
                    if (
                        ((a.className = t + "_form_item " + t + "_form_item_level" + e.level),
                            e.interactive || "title" !== e.type ? (a.className += " " + t + "_form_item_" + e.type) : (a.className += " " + t + "_form_title"),
                        e.data.cssClass && (a.className += " " + e.data.cssClass),
                            !e.isValue)
                    ) {
                        var n = document.createElement("div");
                        (n.className = t + "_form_item_label"), (n.innerText = e.text), a.appendChild(n);
                    }
                    var o = this.createInteractive(e);
                    (o.onInput = function (e) {
                        if (((e = e || {}), i.I(o, { debounce: !e.immediate }), "function" == typeof i.onChange)) {
                            var t = {};
                            (t.result = i.serialize()), i.onChange(t);
                        }
                    }),
                        (o.onBlur = function () {
                            i.canceling || i.I(o);
                        }),
                        o.apply(e),
                        (o.H = a),
                        (o.row = e),
                    o.element && a.appendChild(o.element),
                        this.G.push(o),
                        this.H.appendChild(a);
                }),
                (o.prototype.validate = function () {
                    var e = this,
                        t = !0;
                    return (
                        this.G.forEach(function (i) {
                            var a = e.I(i);
                            t = t && a;
                        }),
                            t
                    );
                }),
                (o.prototype.I = function (e, t) {
                    function i() {
                        e.J && (e.J.remove(), (e.J = null)), e.H.classList.add(u);
                        var t = document.createElement("div");
                        t.classList.add(m), (t.innerText = c.message), (e.J = t), e.H.appendChild(t);
                    }
                    t = t || {};
                    var a = t.debounce,
                        n = t.silent,
                        o = e.row,
                        l = !0,
                        d = "function" == typeof o.data.onValidate ? o.data.onValidate : null,
                        r = "function" == typeof o.data.validate ? o.data.validate : null,
                        s = d || r;
                    if (s) {
                        var c = {};
                        (c.valid = !0), (c.value = e.save()[o.field]), (c.message = "Error"), (c.values = this.serialize()), (c.result = this.serialize()), s(c);
                        var u = this.theme + "_form_item_invalid",
                            m = this.theme + "_form_item_invalid_message";
                        if (c.valid) clearTimeout(this.F[o.field]), e.J && (e.J.remove(), (e.J = null)), e.H.classList.remove(u);
                        else if (!n)
                            if (a) {
                                var h = 1e3;
                                clearTimeout(this.F[o.field]),
                                    (this.F[o.field] = setTimeout(function () {
                                        i();
                                    }, h));
                            } else i();
                        l = c.valid;
                    }
                    return l;
                }),
                (o.prototype.load = function () {
                    var e = this;
                    this.form.forEach(function (t) {
                        e.processFormItem(t, 0);
                    });
                    var i;
                    try {
                        var a = JSON.stringify(this.data);
                        i = t(JSON.parse(a));
                    } catch (e) {
                        throw new Error("The 'data' object is not serializable (it may contain circular dependencies): " + e);
                    }
                    for (var n in i) this.setValue(n, i[n]);
                }),
                (o.prototype.setValue = function (e, t) {
                    this.D.forEach(function (i) {
                        i.applyValue(e, t);
                    });
                }),
                (o.prototype.updateDependentState = function () {
                    var e = this,
                        t = [!0];
                    (this.E ? this.E : this.D).forEach(function (i) {
                        var a = e.updateState(i, { enabled: t[i.level] && !i.data.disabled });
                        a.isValue && (t[a.level + 1] = a.enabled && a.checked);
                    });
                }),
                (o.prototype.processFormItem = function (e, t) {
                    var i = this,
                        a = this.getFieldType(e),
                        n = [];
                    if ("radio" === a) {
                        if (e.name) {
                            var o = new l();
                            (o.field = e.id), (o.data = e), (o.level = t), (o.type = "label"), (o.interactive = !1), (o.text = e.name), i.D.push(o), n.push(o);
                        }
                        e.options.forEach(function (o) {
                            var d = new l();
                            (d.field = e.id),
                                (d.data = o),
                                (d.level = t),
                                (d.type = a),
                                (d.isValue = !0),
                                (d.text = o.name),
                                (d.resolved = o.id),
                                i.D.push(d),
                                n.push(d),
                            o.children &&
                            o.children.forEach(function (e) {
                                var a = i.processFormItem(e, t + 1);
                                n = n.concat(a);
                            });
                        });
                    } else if ("title" === a) {
                        var o = new l();
                        (o.field = e.id), (o.data = e), (o.level = t), (o.type = a), (o.interactive = !1), (o.text = e.name), i.D.push(o), n.push(o);
                    } else if ("image" === a) {
                        var o = new l();
                        (o.isValue = !0), (o.field = e.id), (o.data = e), (o.level = t), (o.type = a), (o.interactive = !1), (o.text = null), i.D.push(o), n.push(o);
                    } else if ("html" === a) {
                        var o = new l();
                        (o.isValue = !0), (o.field = e.id), (o.data = e), (o.level = t), (o.type = a), (o.interactive = !1), (o.text = null), i.D.push(o), n.push(o);
                    } else if ("scrollable" === a) {
                        var o = new l();
                        (o.isValue = !0), (o.field = e.id), (o.data = e), (o.level = t), (o.type = a), (o.interactive = !1), (o.text = null), i.D.push(o), n.push(o);
                    } else {
                        var o = new l();
                        (o.field = e.id), (o.data = e), (o.level = t), (o.type = a), (o.text = e.name), (o.children = []), i.D.push(o), n.push(o);
                    }
                    return (
                        "checkbox" === a &&
                        ((o.isValue = !0),
                            (o.resolved = !0),
                        e.children &&
                        e.children.forEach(function (e) {
                            var a = i.processFormItem(e, t + 1);
                            n = n.concat(a);
                        })),
                            n
                    );
                }),
                (o.prototype.doOnKey = function (e) {
                    if ("function" == typeof this.onKey) {
                        var t = { key: e };
                        this.onKey(t);
                    }
                }),
                (o.prototype.createInteractive = function (e) {
                    var t = this,
                        i = {
                            label: function () {
                                return new d();
                            },
                            title: function () {
                                return new d();
                            },
                            image: function () {
                                var t = new d(),
                                    i = document.createElement("img");
                                return (i.src = e.data.image), (t.element = i), t;
                            },
                            html: function () {
                                var t = new d(),
                                    i = document.createElement("div");
                                return "string" == typeof e.data.text ? (i.innerText = e.data.text) : "string" == typeof e.data.html && (i.innerHTML = e.data.html), (t.element = i), t;
                            },
                            scrollable: function () {
                                var i = new d(),
                                    a = document.createElement("div");
                                (a.className = t.theme + "_form_item_scrollable_scroll"), e.data.height && (a.style.height = e.data.height + "px");
                                var n = document.createElement("div");
                                return (
                                    (n.className = t.theme + "_form_item_scrollable_scroll_content"),
                                        "string" == typeof e.data.text ? (n.innerText = e.data.text) : "string" == typeof e.data.html && (n.innerHTML = e.data.html),
                                        a.appendChild(n),
                                        (i.element = a),
                                        i
                                );
                            },
                            text: function () {
                                var i = new d();
                                i.apply = function (e) {
                                    i.row = e;
                                    var t = i.element;
                                    (t.value = e.value), (t.disabled = !e.enabled);
                                };
                                var a = document.createElement("input");
                                return (
                                    (a.name = e.field),
                                        (a.type = "text"),
                                        (a.autocomplete = "off"),
                                        (a.onkeydown = function (e) {
                                            var i = !1;
                                            switch (e.keyCode) {
                                                case 13:
                                                    t.doOnKey("Enter");
                                                    break;
                                                case 27:
                                                    t.doOnKey("Escape");
                                                    break;
                                                default:
                                                    i = !0;
                                            }
                                            i || (e.preventDefault(), e.stopPropagation());
                                        }),
                                        (a.oninput = function (e) {
                                            i.onInput();
                                        }),
                                        (a.onblur = function (e) {
                                            i.onBlur();
                                        }),
                                        (i.element = a),
                                        (i.canFocus = function () {
                                            return !i.element.disabled;
                                        }),
                                        (i.focus = function () {
                                            i.element.focus(), i.element.setSelectionRange(0, i.element.value.length);
                                        }),
                                        (i.save = function () {
                                            var t = {};
                                            return (t[e.field] = a.value), t;
                                        }),
                                        i
                                );
                            },
                            textarea: function () {
                                var i = new d();
                                i.apply = function (e) {
                                    i.row = e;
                                    var t = i.element;
                                    (t.value = e.value), (t.disabled = !e.enabled);
                                };
                                var a = document.createElement("textarea");
                                return (
                                    (a.name = e.field),
                                    e.data.height && (a.style.height = e.data.height + "px"),
                                        (a.onkeydown = function (e) {
                                            var i = !1;
                                            switch (e.keyCode) {
                                                case 13:
                                                    (e.ctrlKey || e.metaKey) && t.doOnKey("Enter"), (i = !1);
                                                    break;
                                                case 27:
                                                    t.doOnKey("Escape");
                                                    break;
                                                default:
                                                    i = !0;
                                            }
                                            i || e.stopPropagation();
                                        }),
                                        (a.oninput = function (e) {
                                            i.onInput();
                                        }),
                                        (a.onblur = function (e) {
                                            i.onBlur();
                                        }),
                                        (i.element = a),
                                        (i.canFocus = function () {
                                            return !i.element.disabled;
                                        }),
                                        (i.focus = function () {
                                            i.element.focus(), i.element.setSelectionRange(0, 0);
                                        }),
                                        (i.save = function () {
                                            var t = {};
                                            return (t[e.field] = a.value), t;
                                        }),
                                        i
                                );
                            },
                            date: function () {
                                var i = new d();
                                i.apply = function (e) {
                                    i.row = e;
                                    var a = i.element,
                                        n = i.picker;
                                    e.data.dateFormat && (n.pattern = e.data.dateFormat);
                                    var o = e.data.locale || t.locale;
                                    o && (n.locale = o), (a.disabled = !e.enabled), (n.date = new DayPilot.Date(e.value));
                                    var l = new DayPilot.Date(e.value).toString(e.data.dateFormat || n.pattern, n.locale);
                                    a.value = l;
                                };
                                var a = document.createElement("input");
                                a.name = e.field;
                                var n = new DayPilot.DatePicker({
                                    target: a,
                                    theme: "navigator_modal",
                                    zIndex: t.zIndex + 1,
                                    resetTarget: !1,
                                    targetAlignment: "left",
                                    onTimeRangeSelect: function (e) {
                                        i.onInput({ immediate: !0 });
                                    },
                                });
                                return (
                                    (a.picker = n),
                                        (a.className = t.theme + "_input_date"),
                                        (a.type = "text"),
                                        (a.onkeydown = function (e) {
                                            var i = !1;
                                            switch (e.keyCode) {
                                                case 13:
                                                    n.visible ? n.close() : t.doOnKey("Enter");
                                                    break;
                                                case 27:
                                                    n.visible ? n.close() : t.doOnKey("Escape");
                                                    break;
                                                case 9:
                                                    n.close(), (i = !0);
                                                    break;
                                                default:
                                                    i = !0;
                                            }
                                            i || (e.preventDefault(), e.stopPropagation());
                                        }),
                                        (a.onfocus = function () {
                                            n.show();
                                        }),
                                        (a.onclick = function () {
                                            n.show();
                                        }),
                                        (a.oninput = function (e) {
                                            i.onInput();
                                        }),
                                        (a.onblur = function (e) {
                                            i.onBlur();
                                        }),
                                        (i.element = a),
                                        (i.picker = n),
                                        (i.canFocus = function () {
                                            return !i.element.disabled;
                                        }),
                                        (i.focus = function () {
                                            i.element.focus();
                                        }),
                                        (i.save = function () {
                                            var t = n.date ? n.date.toString() : null,
                                                i = {};
                                            return (i[e.field] = t), i;
                                        }),
                                        i
                                );
                            },
                            select: function () {
                                var t = new d();
                                t.apply = function (e) {
                                    t.row = e;
                                    var i = t.element;
                                    (i.value = e.value), (i.disabled = !e.enabled);
                                };
                                var i = document.createElement("select");
                                return (
                                    (i.name = e.field),
                                    e.data.options &&
                                    e.data.options.forEach &&
                                    e.data.options.forEach(function (e) {
                                        var t = document.createElement("option");
                                        (t.innerText = e.name || e.id), (t.value = e.id), (t.K = e.id), i.appendChild(t);
                                    }),
                                        (i.onchange = function (e) {
                                            t.onInput({ immediate: !0 });
                                        }),
                                        (i.onblur = function (e) {
                                            t.onBlur();
                                        }),
                                        (t.element = i),
                                        (t.canFocus = function () {
                                            return !t.element.disabled;
                                        }),
                                        (t.focus = function () {
                                            t.element.focus();
                                        }),
                                        (t.save = function () {
                                            var t = null,
                                                a = i.options[i.selectedIndex];
                                            a && "undefined" != typeof a.K && (t = a.K);
                                            var n = {};
                                            return (n[e.field] = t), n;
                                        }),
                                        t
                                );
                            },
                            searchable: function () {
                                var i = new d();
                                i.apply = function (e) {
                                    i.row = e;
                                    var t = i.searchable;
                                    (t.disabled = !e.enabled), t.select(e.value);
                                };
                                var a = new r({
                                        data: e.data.options || [],
                                        name: e.field,
                                        theme: t.theme + "_form_item_searchable",
                                        listZIndex: t.zIndex + 1,
                                        onSelect: function (e) {
                                            e.ui && i.onInput({ immediate: !0 });
                                        },
                                    }),
                                    n = a.create();
                                return (
                                    (i.element = n),
                                        (i.searchable = a),
                                        (i.canFocus = function () {
                                            return !i.searchable.disabled;
                                        }),
                                        (i.focus = function () {
                                            i.searchable.focus();
                                        }),
                                        (i.save = function () {
                                            var t = a.selected && a.selected.id,
                                                i = {};
                                            return (i[e.field] = t), i;
                                        }),
                                        i
                                );
                            },
                            radio: function () {
                                var i = new d();
                                i.apply = function (e) {
                                    i.row = e;
                                    var t = i.radio;
                                    (t.checked = e.checked), (t.disabled = !e.enabled);
                                };
                                var a = document.createElement("label"),
                                    n = document.createElement("input");
                                (n.type = "radio"),
                                    (n.name = e.field),
                                    (n.K = e.resolved),
                                    (n.onchange = function (e) {
                                        var a = i.row;
                                        t.findRowsByField(a.field).forEach(function (e) {
                                            t.updateState(e, { checked: !1 });
                                        }),
                                            t.updateState(a, { checked: !0 }),
                                            t.applyState(),
                                            i.onInput({ immediate: !0 });
                                    }),
                                    (n.onblur = function (e) {
                                        i.onBlur();
                                    }),
                                    a.appendChild(n);
                                var o = document.createTextNode(e.text);
                                return (
                                    a.append(o),
                                        (i.element = a),
                                        (i.radio = n),
                                        (i.canFocus = function () {
                                            return !1;
                                        }),
                                        (i.focus = function () {
                                            i.radio.focus();
                                        }),
                                        (i.save = function () {
                                            if (!n.checked) return {};
                                            var t = n.K,
                                                i = {};
                                            return (i[e.field] = t), i;
                                        }),
                                        i
                                );
                            },
                            checkbox: function () {
                                var i = new d();
                                i.apply = function (e) {
                                    i.row = e;
                                    var t = i.checkbox;
                                    (t.checked = e.checked), (t.disabled = !e.enabled);
                                };
                                var a = document.createElement("label"),
                                    n = document.createElement("input");
                                (n.type = "checkbox"),
                                    (n.name = e.field),
                                    (n.K = e.resolved),
                                    (n.onchange = function (e) {
                                        var a = i.row;
                                        t.updateState(a, { checked: this.checked }), t.applyState(), i.onInput({ immediate: !0 });
                                    }),
                                    (n.onblur = function (e) {
                                        i.onBlur();
                                    }),
                                    a.appendChild(n);
                                var o = document.createTextNode(e.text);
                                return (
                                    a.append(o),
                                        (i.element = a),
                                        (i.checkbox = n),
                                        (i.canFocus = function () {
                                            return !1;
                                        }),
                                        (i.focus = function () {
                                            i.checkbox.focus();
                                        }),
                                        (i.save = function () {
                                            var t = n.checked,
                                                i = {};
                                            return (i[e.field] = t), i;
                                        }),
                                        i
                                );
                            },
                            table: function () {
                                var i = new d();
                                i.apply = function (e) {
                                    i.row = e;
                                    var t = i.table;
                                    (t.disabled = !e.enabled), t.load(e.value || []);
                                };
                                var a = new s({
                                        name: e.field,
                                        form: t,
                                        theme: t.theme + "_form_item_tabular",
                                        item: e.data,
                                        onInput: function (e) {
                                            i.onInput();
                                        },
                                    }),
                                    n = a.create();
                                return (
                                    (i.element = n),
                                        (i.table = a),
                                        (i.canFocus = function () {
                                            return !1;
                                        }),
                                        (i.focus = function () {
                                            i.table.focus();
                                        }),
                                        (i.save = function () {
                                            var t = a.save(),
                                                i = {};
                                            return (i[e.field] = t), i;
                                        }),
                                        i
                                );
                            },
                        };
                    return t.plugins && t.plugins[e.type] ? t.plugins[e.type](e) : i[e.type]();
                }),
                (o.prototype.findRowsByField = function (e) {
                    return this.D.filter(function (t) {
                        return t.field === e;
                    });
                }),
                (o.prototype.findViewById = function (e, t) {
                    return this.G.find(function (i) {
                        return i.row.field === e && ("radio" !== i.row.type || i.row.resolved === t);
                    });
                }),
                (o.prototype.firstFocusable = function () {
                    return this.G.find(function (e) {
                        return e.canFocus && e.canFocus();
                    });
                }),
                (o.prototype.updateState = function (e, t) {
                    var i = this.E ? this.E : this.D,
                        a = i.indexOf(e);
                    return (
                        (this.E = i.map(function (i) {
                            if (i !== e) return i;
                            if (e.propsEqual(t)) return e;
                            var a = e.clone();
                            for (var n in t) a[n] = t[n];
                            return a;
                        })),
                            this.E[a]
                    );
                }),
                (o.prototype.updateInteractive = function (e) {
                    var t = this.E.indexOf(e);
                    this.G[t].apply(e);
                }),
                (o.prototype.applyState = function () {
                    var e = this;
                    if ((this.updateDependentState(), this.E)) {
                        this.E.filter(function (t, i) {
                            return e.D[i] !== t;
                        }).forEach(function (t) {
                            e.updateInteractive(t);
                        }),
                            (this.D = this.E),
                            (this.E = null);
                    }
                }),
                (o.prototype.getFieldType = function (e) {
                    return ["text", "date", "select", "searchable", "radio", "checkbox", "table", "title", "image", "html", "textarea", "scrollable"].indexOf(e.type) !== -1
                        ? e.type
                        : e.type && this.plugins && this.plugins[e.type]
                            ? e.type
                            : e.image
                                ? "image"
                                : e.html || e.text
                                    ? "html"
                                    : e.id
                                        ? e.options
                                            ? "searchable"
                                            : e.dateFormat
                                                ? "date"
                                                : e.columns
                                                    ? "table"
                                                    : "text"
                                        : "title";
                }),
                (o.prototype.serialize = function () {
                    var e = {};
                    return (
                        this.G.forEach(function (t) {
                            var i = t.save();
                            for (var a in i) e[a] = i[a];
                        }),
                            e
                    );
                });
            var l = function () {
                (this.id = this.guid()),
                    (this.field = null),
                    (this.data = null),
                    (this.type = null),
                    (this.level = 0),
                    (this.enabled = !0),
                    (this.value = null),
                    (this.text = null),
                    (this.interactive = !0),
                    (this.isValue = !1),
                    (this.checked = !1),
                    (this.resolved = null);
            };
            (l.prototype.clone = function () {
                var e = new l();
                for (var t in this) "id" !== t && (e[t] = this[t]);
                return e;
            }),
                (l.prototype.propsEqual = function (e) {
                    for (var t in e) if (this[t] !== e[t]) return !1;
                    return !0;
                }),
                (l.prototype.guid = function () {
                    var e = function () {
                        return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
                    };
                    return "" + e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
                }),
                (l.prototype.applyValue = function (e, t) {
                    this.field === e && ((this.value = t), this.isValue && t === this.resolved && (this.checked = !0));
                });
            var d = function () {
                    (this.element = null),
                        (this.canFocus = function () {
                            return !1;
                        }),
                        (this.apply = function (e) {}),
                        (this.focus = function () {}),
                        (this.save = function () {
                            return {};
                        });
                },
                r = function (e) {
                    (this.data = []),
                        (this.name = null),
                        (this.theme = "searchable_default"),
                        (this.L = !1),
                        (this.listZIndex = 1e5),
                        (this.onSelect = null),
                        (this.M = null),
                        (this.N = null),
                        (this.O = !1),
                        (this.P = null),
                        (this.Q = null),
                        (this.R = []),
                        (this.S = null),
                        (e = e || {});
                    var t = this,
                        i = {
                            selected: {
                                post: function (e) {
                                    "object" == typeof e && e.id ? (t.M = e) : ("string" != typeof e && "number" != typeof e) || t.select(e);
                                },
                            },
                        };
                    Object.defineProperty(this, "selected", {
                        get: function () {
                            return this.M;
                        },
                    }),
                        Object.defineProperty(this, "disabled", {
                            get: function () {
                                return this.L;
                            },
                            set: function (e) {
                                (this.L = e), this.P && ((this.P.disabled = e), e && this.T());
                            },
                        });
                    for (var a in e) i[a] || (this[a] = e[a]);
                    for (var a in e) i[a] && i[a].post(e[a]);
                };
            (r.prototype.select = function (e) {
                return (
                    (this.M = this.data.find(function (t) {
                        return t.id === e;
                    })),
                        this.U(!1),
                        this
                );
            }),
                (r.prototype.create = function () {
                    function e() {
                        (m.style.display = ""),
                            (m.style.top = p.offsetHeight + "px"),
                            (m.style.left = "0px"),
                            (m.style.width = p.offsetWidth + "px"),
                            (m.innerHTML = ""),
                            m.addEventListener("mousedown", function (e) {
                                e.preventDefault();
                            }),
                            (r.N = null),
                            (r.R = []);
                        var e = null;
                        r.data.forEach(function (i) {
                            var n = i.name || i.id;
                            if (n.toLowerCase().indexOf(p.value.toLowerCase()) !== -1) {
                                var o = document.createElement("div");
                                (o.className = r.theme + "_list_item"),
                                    (o.innerText = n),
                                    (o.item = i),
                                i === r.M && (r.N = o),
                                e || (e = o),
                                    o.addEventListener("mousedown", function (e) {
                                        a(o), e.preventDefault();
                                    }),
                                    o.addEventListener("mousemove", function (e) {
                                        r.N !== o && ((r.N = o), t({ dontScroll: !0 }));
                                    }),
                                    m.appendChild(o),
                                    r.R.push(o);
                            }
                        }),
                        r.N || (r.N = e),
                            t();
                    }
                    function t(e) {
                        e = e || {};
                        var t = !e.dontScroll;
                        document.querySelectorAll("." + r.theme + "_list_item_highlight").forEach(function (e) {
                            e.className = e.className.replace(r.theme + "_list_item_highlight", "");
                        }),
                        r.N && ((r.N.className += " " + r.theme + "_list_item_highlight"), t && !i(r.N, m) && r.N.scrollIntoView());
                    }
                    function i(e, t) {
                        var i = e.getBoundingClientRect(),
                            a = t.getBoundingClientRect();
                        return i.top >= a.top && i.bottom <= a.bottom;
                    }
                    function a(e) {
                        var t = e.item;
                        (r.M = t), r.U(!0), o(), l();
                    }
                    function n() {
                        r.T();
                    }
                    function o() {
                        r.V();
                    }
                    function l() {
                        (r.O = !0), p.setAttribute("readonly", "readonly"), p.focus();
                    }
                    function d() {
                        (r.O = !1), p.removeAttribute("readonly"), (p.value = ""), e();
                    }
                    var r = this,
                        s = this,
                        c = document.createElement("div");
                    (c.className = this.theme + "_main"), (c.style.position = "relative");
                    var u = document.createElement("div");
                    (u.className = this.theme + "_icon"),
                        (u.style.position = "absolute"),
                        (u.style.right = "0"),
                        (u.style.top = "0"),
                        (u.style.bottom = "0"),
                        (u.style.width = "20px"),
                        u.addEventListener("mousedown", function (e) {
                            e.preventDefault(), r.O ? (r.focus(), d()) : (n(), l());
                        });
                    var m = document.createElement("div");
                    (m.className = this.theme + "_list"), (m.style.display = "none"), (m.style.position = "absolute"), (m.style.zIndex = this.listZIndex);
                    var h = document.createElement("input");
                    (h.type = "hidden"), (h.name = this.name), (h.searchable = s), (this.S = h);
                    var p = document.createElement("input");
                    return (
                        (p.type = "text"),
                            (p.className = this.theme + "_input"),
                            (p.disabled = this.L),
                            p.addEventListener("click", function (e) {
                                d();
                            }),
                            p.addEventListener("focus", function (t) {
                                (p.value = ""), e();
                            }),
                            p.addEventListener("input", function (t) {
                                e();
                            }),
                            p.addEventListener("blur", function (e) {
                                p.removeAttribute("readonly"), n();
                            }),
                            p.addEventListener("keydown", function (e) {
                                if (r.O) {
                                    if ("Enter" === e.key) return;
                                    if ("Esc" === e.key || "Escape" === e.key) return;
                                    d();
                                }
                                if ("ArrowDown" === e.key) {
                                    var i = s.R.indexOf(s.N);
                                    i + 1 < s.R.length && (s.N = s.R[i + 1]), t();
                                } else if ("ArrowUp" === e.key) {
                                    var i = s.R.indexOf(s.N);
                                    i - 1 >= 0 && (s.N = s.R[i - 1]), t();
                                } else "Enter" === e.key ? (r.N ? (e.stopPropagation(), a(r.N)) : (e.stopPropagation(), n(), l())) : ("Esc" !== e.key && "Escape" !== e.key) || (e.stopPropagation(), n(), l());
                            }),
                            (this.P = p),
                            (this.Q = m),
                        this.M || ((this.M = this.data[0]), this.M && (p.value = this.M.name)),
                            c.appendChild(p),
                            c.appendChild(u),
                            c.appendChild(h),
                            c.appendChild(m),
                            c
                    );
                }),
                (r.prototype.T = function () {
                    this.V(), this.M ? (this.P.value = this.M.name) : ((this.P.value = ""), this.U(!0));
                }),
                (r.prototype.focus = function () {
                    (this.O = !0), this.P.setAttribute("readonly", "readonly"), this.P.focus(), this.T();
                }),
                (r.prototype.V = function () {
                    this.Q.style.display = "none";
                }),
                (r.prototype.U = function (e) {
                    if (((this.S.value = this.selected ? this.selected.id : null), this.M ? (this.P.value = this.M.name) : (this.P.value = ""), "function" == typeof this.onSelect)) {
                        var t = { control: this, ui: e };
                        this.onSelect(t);
                    }
                });
            var s = function (e) {
                (this.form = null), (this.item = null), (this.data = null), (this.name = null), (this.theme = "edit_table_default"), (this.onInput = null), (this.nav = {}), (this.W = null), (this.D = []), (e = e || {});
                for (var t in e) this[t] = e[t];
            };
            (s.prototype.create = function () {
                var e = this,
                    t = document.createElement("div");
                (t.className = this.theme + "_main"), (t.style.position = "relative");
                var i = document.createElement("input");
                (i.type = "hidden"), (i.name = e.name), (i.table = this), t.appendChild(i);
                var a = document.createElement("div");
                a.className = this.theme + "_table";
                var n = this.X();
                a.appendChild(n);
                var o = e.Y({});
                o.spacer = !0;
                var l = this.Z(o);
                l.classList.add(e.theme + "_spacer"), a.appendChild(l);
                var d = document.createElement("div");
                (d.className = e.theme + "_tbody"), a.appendChild(d), t.appendChild(a);
                var r = document.createElement("div");
                t.appendChild(r), (this.nav.body = d), (this.nav.table = a), (this.nav.main = t), (this.nav.after = r);
                var s = document.createElement("div"),
                    c = document.createElement("span");
                return (
                    (c.className = this.theme + "_plus"),
                        c.addEventListener("click", function (t) {
                            if (!e.disabled) {
                                var i = e.item.onNewRow,
                                    a = {};
                                if ("function" == typeof i) {
                                    var n = {};
                                    (n.result = e.form.serialize()), (n.value = {}), i(n), (a = n.value);
                                }
                                var o = e.Y(a);
                                e.D.push(o), e.$(), e._();
                            }
                        }),
                        (this.nav.plus = c),
                        s.appendChild(c),
                        t.appendChild(s),
                        t
                );
            }),
                (s.prototype.X = function () {
                    var e = this,
                        t = document.createElement("div");
                    return (
                        t.classList.add(this.theme + "_row"),
                            t.classList.add(this.theme + "_header"),
                            this.item.columns.forEach(function (i) {
                                var a = document.createElement("div");
                                a.classList.add(e.theme + "_cell"), (a.innerText = i.name), t.appendChild(a);
                            }),
                            t
                    );
                }),
                (s.prototype.aa = function () {
                    var e = this.item.max || 0;
                    return !!(e && this.D.length >= e);
                }),
                (s.prototype.save = function () {
                    var e = this,
                        t = [];
                    return (
                        e.D.forEach(function (e) {
                            var i = {};
                            e.cells.forEach(function (e) {
                                i[e.id] = e.value;
                            }),
                                t.push(i);
                        }),
                            t
                    );
                }),
                (s.prototype.load = function (e) {
                    if ("[object Array]" !== Object.prototype.toString.call(e)) throw new Error("Array expected");
                    (this.data = e), this.ba(), this.$();
                }),
                (s.prototype.ca = function () {
                    this.disabled ? this.nav.main.classList.add(this.theme + "_disabled") : this.nav.main.classList.remove(this.theme + "_disabled"),
                        this.aa() ? this.nav.plus.classList.add(this.theme + "_plus_max") : this.nav.plus.classList.remove(this.theme + "_plus_max");
                }),
                (s.prototype.ba = function () {
                    var e = this;
                    (this.D = []),
                        this.data.forEach(function (t) {
                            var i = e.Y(t);
                            e.D.push(i);
                        });
                }),
                (s.prototype.da = function (e) {
                    var t = this,
                        i = t.D.indexOf(e);
                    t.D.splice(i, 1);
                }),
                (s.prototype.Y = function (e) {
                    var t = this,
                        i = {};
                    return (
                        (i.data = e),
                            (i.cells = []),
                            t.item.columns.forEach(function (a) {
                                var n = a.id,
                                    o = e[n],
                                    l = t.ea(a);
                                if ("undefined" == typeof o)
                                    if ("text" === l) o = "";
                                    else if ("number" === l) o = 0;
                                    else if ("select" === l) {
                                        var d = a.options;
                                        o = d && d[0].id;
                                    }
                                var r = {};
                                (r.id = n), (r.value = o), (r.type = l), (r.data = a), i.cells.push(r);
                            }),
                            i
                    );
                }),
                (s.prototype.ea = function (e) {
                    var t = e.type;
                    return t || (t = e.options ? "select" : "text"), t;
                }),
                (s.prototype.$ = function () {
                    var e = this;
                    if (
                        ((this.nav.body.innerHTML = ""),
                            (this.nav.after.innerHTML = ""),
                            this.D.forEach(function (t) {
                                var i = e.Z(t);
                                e.nav.body.appendChild(i);
                            }),
                        0 === this.D.length)
                    ) {
                        var t = e.fa();
                        e.nav.after.appendChild(t);
                    }
                    this.ca();
                }),
                (s.prototype.fa = function () {
                    var e = document.createElement("div");
                    return (e.className = this.theme + "_empty"), e;
                }),
                (s.prototype.Z = function (e) {
                    var t = this,
                        i = document.createElement("div");
                    (i.className = t.theme + "_row"),
                        e.cells.forEach(function (a) {
                            var n = document.createElement("div");
                            n.className = t.theme + "_cell";
                            var o = t.ga(a);
                            if (e.spacer) {
                                var l = document.createElement("div");
                                (l.style.height = "0px"), (l.style.overflow = "hidden"), l.appendChild(o), n.appendChild(l);
                            } else n.appendChild(o);
                            i.appendChild(n);
                        });
                    var a = document.createElement("div");
                    a.classList.add(t.theme + "_cell"), a.classList.add(t.theme + "_rowaction");
                    var n = document.createElement("span");
                    return (
                        (n.className = this.theme + "_delete"),
                            n.addEventListener("click", function (i) {
                                t.disabled || (t.da(e), t.$(), t._());
                            }),
                        e.spacer || a.appendChild(n),
                            i.appendChild(a),
                            i
                    );
                }),
                (s.prototype._ = function () {
                    var e = this;
                    if ("function" == typeof e.onInput) {
                        var t = {};
                        e.onInput(t);
                    }
                }),
                (s.prototype.ga = function (e) {
                    var t = this,
                        i = e.type;
                    if ("text" === i || "number" === i) {
                        var a = document.createElement("input");
                        return (
                            (a.type = i),
                            t.disabled && (a.disabled = !0),
                            e.value && (a.value = e.value),
                                a.addEventListener("keyup", function (a) {
                                    "number" === i ? (e.value = Number(this.value)) : (e.value = this.value), t._();
                                }),
                                a
                        );
                    }
                    if ("select" === i) {
                        var n = document.createElement("select");
                        return (
                            t.disabled && (n.disabled = !0),
                                e.data.options.forEach(function (t) {
                                    var i = document.createElement("option");
                                    (i.innerText = t.name), (i.value = t.id), (i.K = t.id), n.appendChild(i), e.value === t.id && i.setAttribute("selected", !0);
                                }),
                                n.addEventListener("change", function (i) {
                                    var a = n.options[n.selectedIndex];
                                    a && "undefined" != typeof a.K && (e.value = a.K), t._();
                                }),
                                n
                        );
                    }
                    throw new Error("Unsupported item type: " + i);
                }),
                (s.prototype.focus = function () {});
        }
    })(DayPilot);
if ("undefined" == typeof DayPilot) var DayPilot = {};
"undefined" == typeof DayPilot.Global && (DayPilot.Global = {}),
    (function () {
        if ("undefined" == typeof DayPilot.Month || !DayPilot.Month.events) {
            var t = {};
            (t.Month = function (e, i) {
                (this.v = "2022.2.384-lite"), (this.nav = {});
                var n = this;
                (this.id = e),
                    (this.isMonth = !0),
                    (this.api = 2),
                    (this.backendUrl = null),
                    (this.cellHeaderHeight = 24),
                    (this.cellHeight = 80),
                    (this.cssClassPrefix = "month_default"),
                    (this.eventBarVisible = !0),
                    (this.eventHeight = 25),
                    (this.eventsLoadMethod = "GET"),
                    (this.headerHeight = 30),
                    (this.hideUntilInit = !0),
                    (this.lineSpace = 1),
                    (this.locale = "en-us"),
                    (this.showToolTip = !0),
                    (this.startDate = new DayPilot.Date()),
                    (this.theme = null),
                    (this.visible = !0),
                    (this.weekStarts = 1),
                    (this.width = "100%"),
                    (this.xssProtection = "Enabled"),
                    (this.afterRender = function () {}),
                    (this.cellHeaderClickHandling = "Enabled"),
                    (this.eventClickHandling = "Enabled"),
                    (this.eventDeleteHandling = "Disabled"),
                    (this.eventMoveHandling = "Update"),
                    (this.eventResizeHandling = "Update"),
                    (this.headerClickHandling = "Enabled"),
                    (this.timeRangeSelectedHandling = "Enabled"),
                    (this.onCellHeaderClick = null),
                    (this.onCellHeaderClicked = null),
                    (this.onEventClick = null),
                    (this.onEventClicked = null),
                    (this.onEventDelete = null),
                    (this.onEventDeleted = null),
                    (this.onEventMove = null),
                    (this.onEventMoved = null),
                    (this.onEventResize = null),
                    (this.onEventResized = null),
                    (this.onTimeRangeSelect = null),
                    (this.onTimeRangeSelected = null),
                    (this.cellEvents = []),
                    (this.elements = {}),
                    (this.elements.events = []),
                    (this.cache = {}),
                    (this.a = function (t, e) {
                        var t = JSON.parse(t);
                        return t.CallBackRedirect
                            ? void (document.location.href = t.CallBackRedirect)
                            : "None" === t.UpdateType
                                ? void n.fireAfterRenderDetached(t.CallBackData, !0)
                                : ((n.events.list = t.Events),
                                "Full" === t.UpdateType && ((n.startDate = t.StartDate), (n.timeFormat = t.TimeFormat ? t.TimeFormat : n.timeFormat), "undefined" != typeof t.WeekStarts && (n.weekStarts = t.WeekStarts), (n.hashes = t.Hashes)),
                                    n.b(),
                                    n.c(),
                                    n.d(),
                                "Full" === t.UpdateType && (n.f(), n.g()),
                                    n.h(),
                                    n.show(),
                                    n.i(),
                                    void n.fireAfterRenderDetached(t.CallBackData, !0));
                    }),
                    (this.fireAfterRenderDetached = function (t, e) {
                        var i = function (t, e) {
                            return function () {
                                n.afterRender && n.afterRender(t, e);
                            };
                        };
                        window.setTimeout(i(t, e), 0);
                    }),
                    (this.lineHeight = function () {
                        return this.eventHeight + this.lineSpace;
                    }),
                    (this.events = {}),
                    (this.events.add = function (t) {
                        var e = null;
                        if (t instanceof DayPilot.Event) e = t.data;
                        else {
                            if ("object" != typeof t) throw "DayPilot.Month.events.add() expects an object or DayPilot.Event instance.";
                            e = t;
                        }
                        n.events.list || (n.events.list = []), n.events.list.push(e), n.update(), n.j.notify();
                    }),
                    (this.events.find = function (t) {
                        if (!n.events.list) return null;
                        for (var e = 0; e < n.events.list.length; e++) {
                            var i = n.events.list[e];
                            if (i.id === t) return new DayPilot.Event(i, n);
                        }
                        return null;
                    }),
                    (this.events.update = function (t) {
                        if (t instanceof DayPilot.Event) t.commit();
                        else if ("object" == typeof t) {
                            var e = n.events.find(t.id);
                            if (e) {
                                var i = DayPilot.indexOf(n.events.list, e.data);
                                n.events.list.splice(i, 1, t);
                            }
                        }
                        n.update(), n.j.notify();
                    }),
                    (this.events.remove = function (t) {
                        var e = DayPilot.indexOf(n.events.list, t.data);
                        n.events.list.splice(e, 1), n.update(), n.j.notify();
                    }),
                    (this.events.load = function (t, e, i) {
                        var s = function (t) {
                                var e = {};
                                (e.exception = t.exception), (e.request = t.request), "function" == typeof i && i(e);
                            },
                            a = function (t) {
                                var i,
                                    a = t.request;
                                try {
                                    i = JSON.parse(a.responseText);
                                } catch (t) {
                                    var l = {};
                                    return (l.exception = t), void s(l);
                                }
                                if (DayPilot.isArray(i)) {
                                    var o = {};
                                    if (
                                        ((o.preventDefault = function () {
                                            this.preventDefault.value = !0;
                                        }),
                                            (o.data = i),
                                        "function" == typeof e && e(o),
                                            o.preventDefault.value)
                                    )
                                        return;
                                    (n.events.list = i), n.k && n.update();
                                }
                            };
                        if (n.eventsLoadMethod && "POST" === n.eventsLoadMethod.toUpperCase())
                            DayPilot.Http.ajax({ method: "POST", data: { start: n.visibleStart().toString(), end: n.visibleEnd().toString() }, url: t, success: a, error: s });
                        else {
                            var l = t,
                                o = "start=" + n.visibleStart().toString() + "&end=" + n.visibleEnd().toString();
                            (l += l.indexOf("?") > -1 ? "&" + o : "?" + o), DayPilot.Http.ajax({ method: "GET", url: l, success: a, error: s });
                        }
                    }),
                    (this.update = function (t) {
                        if (this.cells) {
                            n.l(t), n.b(), n.c(), n.d(), n.f(), n.g(), n.h(), n.m(), n.i(), this.visible ? this.show() : this.hide();
                        }
                    }),
                    (this.n = null),
                    (this.l = function (t) {
                        if (t) {
                            var e = {
                                events: {
                                    preInit: function () {
                                        var t = this.data;
                                        t && (DayPilot.isArray(t.list) ? (n.events.list = t.list) : (n.events.list = t));
                                    },
                                },
                            };
                            this.n = e;
                            for (var i in t)
                                if (e[i]) {
                                    var s = e[i];
                                    (s.data = t[i]), s.preInit && s.preInit();
                                } else n[i] = t[i];
                        }
                    }),
                    (this.o = function () {
                        var t = this.n;
                        for (var e in t) {
                            var i = t[e];
                            i.postInit && i.postInit();
                        }
                    }),
                    (this.p = {}),
                    (this.p.events = []),
                    (this.q = function (t) {
                        var e = this.p.events,
                            i = this.events.list[t],
                            n = {};
                        for (var s in i) n[s] = i[s];
                        if ("function" == typeof this.onBeforeEventRender) {
                            var a = {};
                            (a.data = n), this.onBeforeEventRender(a);
                        }
                        e[t] = n;
                    }),
                    (this.d = function () {
                        var t = this.events.list;
                        if (t) {
                            if ("function" == typeof this.onBeforeEventRender) for (var e = 0; e < t.length; e++) this.q(e);
                            for (var i = 0; i < t.length; i++) {
                                var n = t[i];
                                if (((n.start = new DayPilot.Date(n.start)), (n.end = new DayPilot.Date(n.end)), !(n.start.getTime() > n.end.getTime())))
                                    for (var e = 0; e < this.rows.length; e++) {
                                        var s = this.rows[e],
                                            a = new DayPilot.Event(n, this);
                                        s.belongsHere(a) && (s.events.push(a), "function" == typeof this.onBeforeEventRender && (a.cache = this.p.events[i]));
                                    }
                            }
                            for (var l = 0; l < this.rows.length; l++) {
                                var s = this.rows[l];
                                s.events.sort(this.r);
                                for (var o = 0; o < this.rows[l].events.length; o++) {
                                    var r = s.events[o],
                                        h = s.getStartColumn(r),
                                        d = s.getWidth(r);
                                    s.putIntoLine(r, h, d, l);
                                }
                            }
                        }
                    }),
                    (this.b = function () {
                        for (var t = 0; t < this.elements.events.length; t++) {
                            var e = this.elements.events[t];
                            (e.event = null), (e.click = null), e.parentNode.removeChild(e);
                        }
                        this.elements.events = [];
                    }),
                    (this.i = function () {
                        this.s();
                    }),
                    (this.s = function () {
                        this.elements.events = [];
                        for (var t = 0; t < this.rows.length; t++) for (var e = this.rows[t], i = 0; i < e.lines.length; i++) for (var n = e.lines[i], s = 0; s < n.length; s++) this.t(n[s]);
                    }),
                    (this.r = function (t, e) {
                        if (!(t && e && t.start && e.start)) return 0;
                        var i = t.start().getTime() - e.start().getTime();
                        return 0 !== i ? i : e.end().getTime() - t.end().getTime();
                    }),
                    (this.drawShadow = function (e, i, n, s, a, l) {
                        a || (a = 0);
                        var o = s;
                        (this.shadow = {}), (this.shadow.list = []), (this.shadow.start = { x: e, y: i }), (this.shadow.width = s);
                        var r = 7 * i + e - a;
                        r < 0 && ((o += r), (e = 0), (i = 0));
                        for (var h = a; h >= 7; ) i--, (h -= 7);
                        if (h > e) {
                            h > e + (7 - this.getColCount()) ? (i--, (e = e + 7 - h)) : ((o = o - h + e), (e = 0));
                        } else e -= h;
                        i < 0 && ((i = 0), (e = 0));
                        var d = null;
                        for (t.resizingEvent ? (d = "w-resize") : t.movingEvent && (d = "move"), this.nav.top.style.cursor = d; o > 0 && i < this.rows.length; ) {
                            var c = Math.min(this.getColCount() - e, o),
                                v = this.rows[i],
                                u = this.getRowTop(i),
                                f = v.getHeight(),
                                p = document.createElement("div");
                            p.setAttribute("unselectable", "on"),
                                (p.style.position = "absolute"),
                                (p.style.left = this.getCellWidth() * e + "%"),
                                (p.style.width = this.getCellWidth() * c + "%"),
                                (p.style.top = u + "px"),
                                (p.style.height = f + "px"),
                                (p.style.cursor = d);
                            var g = document.createElement("div");
                            g.setAttribute("unselectable", "on"),
                                p.appendChild(g),
                                (g.style.position = "absolute"),
                                (g.style.top = "0px"),
                                (g.style.right = "0px"),
                                (g.style.left = "0px"),
                                (g.style.bottom = "0px"),
                                (g.style.backgroundColor = "#aaaaaa"),
                                (g.style.opacity = 0.5),
                                (g.style.filter = "alpha(opacity=50)"),
                                this.nav.top.appendChild(p),
                                this.shadow.list.push(p),
                                (o -= c + 7 - this.getColCount()),
                                (e = 0),
                                i++;
                        }
                    }),
                    (this.clearShadow = function () {
                        if (this.shadow) {
                            for (var t = 0; t < this.shadow.list.length; t++) this.nav.top.removeChild(this.shadow.list[t]);
                            (this.shadow = null), (this.nav.top.style.cursor = "");
                        }
                    }),
                    (this.getEventTop = function (t, e) {
                        for (var i = this.headerHeight, n = 0; n < t; n++) i += this.rows[n].getHeight();
                        return (i += this.cellHeaderHeight), (i += e * this.lineHeight());
                    }),
                    (this.getDateFromCell = function (t, e) {
                        return this.firstDate.addDays(7 * e + t);
                    }),
                    (this.t = function (e) {
                        var i = e.cache || e.data,
                            s = e.part.row,
                            a = e.part.line,
                            l = e.part.colStart,
                            o = e.part.colWidth,
                            r = this.getCellWidth() * l,
                            h = this.getCellWidth() * o,
                            d = this.getEventTop(s, a),
                            c = document.createElement("div");
                        c.setAttribute("unselectable", "on"),
                            (c.style.height = this.eventHeight + "px"),
                            (c.className = this.u("_event")),
                        i.cssClass && DayPilot.Util.addClass(c, i.cssClass),
                        e.part.startsHere || DayPilot.Util.addClass(c, this.u("_event_continueleft")),
                        e.part.endsHere || DayPilot.Util.addClass(c, this.u("_event_continueright")),
                            (c.event = e),
                            (c.style.width = h + "%"),
                            (c.style.position = "absolute"),
                            (c.style.left = r + "%"),
                            (c.style.top = d + "px"),
                        this.showToolTip && e.client.toolTip() && (c.title = e.client.toolTip()),
                            (c.onclick = n.w),
                            (c.onmousedown = function (i) {
                                i = i || window.event;
                                var r = i.which || i.button;
                                if (((i.cancelBubble = !0), i.stopPropagation && i.stopPropagation(), 1 === r))
                                    if (((t.movingEvent = null), "w-resize" === this.style.cursor || "e-resize" === this.style.cursor)) {
                                        var h = {};
                                        (h.start = {}),
                                            (h.start.x = l),
                                            (h.start.y = s),
                                            (h.event = c.event),
                                            (h.width = DayPilot.DateUtil.daysSpan(h.event.start(), h.event.end()) + 1),
                                            (h.direction = this.style.cursor),
                                            (t.resizingEvent = h);
                                    } else if ("move" === this.style.cursor || "Disabled" !== n.eventMoveHandling) {
                                        n.clearShadow();
                                        var d = DayPilot.mo2(n.nav.top, i);
                                        if (!d) return;
                                        var v = n.getCellBelowPoint(d.x, d.y),
                                            u = DayPilot.DateUtil.daysDiff(e.start(), n.rows[s].start),
                                            f = 7 * v.y + v.x - (7 * s + l);
                                        u && (f += u);
                                        var p = {};
                                        (p.start = {}), (p.start.x = l), (p.start.y = s), (p.start.line = a), (p.offset = n.eventMoveToPosition ? 0 : f), (p.colWidth = o), (p.event = c.event), (p.coords = d), (t.movingEvent = p);
                                    }
                            }),
                            (c.onmousemove = function (i) {
                                if ("undefined" != typeof t && !t.movingEvent && !t.resizingEvent) {
                                    var s = DayPilot.mo3(c, i);
                                    if (s) {
                                        c.deleteIcon && (c.deleteIcon.style.display = "");
                                        var a = 6;
                                        s.x <= a && "Disabled" !== n.eventResizeHandling
                                            ? e.part.startsHere
                                                ? ((c.style.cursor = "w-resize"), (c.dpBorder = "left"))
                                                : (c.style.cursor = "not-allowed")
                                            : c.clientWidth - s.x <= a && "Disabled" !== n.eventResizeHandling
                                                ? e.part.endsHere
                                                    ? ((c.style.cursor = "e-resize"), (c.dpBorder = "right"))
                                                    : (c.style.cursor = "not-allowed")
                                                : (c.style.cursor = "default");
                                    }
                                }
                            }),
                            (c.onmouseleave = function (t) {
                                c.deleteIcon && (c.deleteIcon.style.display = "none"), (c.style.cursor = "");
                            }),
                            (c.onmouseenter = function (t) {
                                c.deleteIcon && (c.deleteIcon.style.display = "");
                            });
                        var v = document.createElement("div");
                        if (
                            (v.setAttribute("unselectable", "on"),
                                (v.className = this.u("_event_inner")),
                                "darker" === i.borderColor && i.backColor ? (v.style.borderColor = DayPilot.ColorUtil.darker(i.backColor, 2)) : (v.style.borderColor = i.borderColor),
                            i.backColor && ((v.style.background = i.backColor), (DayPilot.browser.ie9 || DayPilot.browser.ielt9) && (v.style.filter = "")),
                            i.fontColor && (v.style.color = i.fontColor),
                                (v.innerHTML = e.client.html()),
                                c.appendChild(v),
                                e.client.barVisible())
                        ) {
                            var u = document.createElement("div");
                            u.setAttribute("unselectable", "on"), (u.className = this.u("_event_bar")), (u.style.position = "absolute");
                            var f = document.createElement("div");
                            f.setAttribute("unselectable", "on"),
                                (f.className = this.u("_event_bar_inner")),
                                (f.style.top = "0%"),
                                (f.style.height = "100%"),
                            i.barColor && (f.style.backgroundColor = i.barColor),
                                u.appendChild(f),
                                c.appendChild(u);
                        }
                        if ("Disabled" !== n.eventDeleteHandling) {
                            var p = Math.floor(n.eventHeight / 2 - 9),
                                g = document.createElement("div");
                            (g.style.position = "absolute"),
                                (g.style.right = "2px"),
                                (g.style.top = p + "px"),
                                (g.style.width = "18px"),
                                (g.style.height = "18px"),
                                (g.className = n.u("_event_delete")),
                                (g.onmousedown = function (t) {
                                    t.stopPropagation();
                                }),
                                (g.onclick = function (t) {
                                    t.stopPropagation();
                                    var e = this.parentNode.event;
                                    e && n.z(e);
                                }),
                                (g.style.display = "none"),
                                (c.deleteIcon = g),
                                c.appendChild(g);
                        }
                        this.elements.events.push(c), this.nav.events.appendChild(c);
                    }),
                    (this.lastVisibleDayOfMonth = function () {
                        return this.startDate.lastDayOfMonth();
                    }),
                    (this.c = function () {
                        "string" == typeof this.startDate && (this.startDate = new DayPilot.Date(this.startDate)), (this.startDate = this.startDate.firstDayOfMonth()), (this.firstDate = this.startDate.firstDayOfWeek(this.getWeekStart()));
                        var t,
                            e = (this.startDate, this.lastVisibleDayOfMonth()),
                            i = DayPilot.DateUtil.daysDiff(this.firstDate, e) + 1;
                        (t = Math.ceil(i / 7)), (this.days = 7 * t), (this.rows = []);
                        for (var s = 0; s < t; s++) {
                            var a = {};
                            (a.start = this.firstDate.addDays(7 * s)),
                                (a.end = a.start.addDays(this.getColCount())),
                                (a.events = []),
                                (a.lines = []),
                                (a.index = s),
                                (a.minHeight = this.cellHeight),
                                (a.calendar = this),
                                (a.belongsHere = function (t) {
                                    return (t.end().getTime() === t.start().getTime() && t.start().getTime() === this.start.getTime()) || !(t.end().getTime() <= this.start.getTime() || t.start().getTime() >= this.end.getTime());
                                }),
                                (a.getPartStart = function (t) {
                                    return DayPilot.DateUtil.max(this.start, t.start());
                                }),
                                (a.getPartEnd = function (t) {
                                    return DayPilot.DateUtil.min(this.end, t.end());
                                }),
                                (a.getStartColumn = function (t) {
                                    var e = this.getPartStart(t);
                                    return DayPilot.DateUtil.daysDiff(this.start, e);
                                }),
                                (a.getWidth = function (t) {
                                    return DayPilot.DateUtil.daysSpan(this.getPartStart(t), this.getPartEnd(t)) + 1;
                                }),
                                (a.putIntoLine = function (t, e, i, n) {
                                    for (var s = this, a = 0; a < this.lines.length; a++) {
                                        var l = this.lines[a];
                                        if (l.isFree(e, i)) return l.addEvent(t, e, i, n, a), a;
                                    }
                                    var l = [];
                                    return (
                                        (l.isFree = function (t, e) {
                                            for (var i = !0, n = 0; n < this.length; n++) t + e - 1 < this[n].part.colStart || t > this[n].part.colStart + this[n].part.colWidth - 1 || (i = !1);
                                            return i;
                                        }),
                                            (l.addEvent = function (t, e, i, n, a) {
                                                (t.part.colStart = e),
                                                    (t.part.colWidth = i),
                                                    (t.part.row = n),
                                                    (t.part.line = a),
                                                    (t.part.startsHere = s.start.getTime() <= t.start().getTime()),
                                                    (t.part.endsHere = s.end.getTime() >= t.end().getTime()),
                                                    this.push(t);
                                            }),
                                            l.addEvent(t, e, i, n, this.lines.length),
                                            this.lines.push(l),
                                        this.lines.length - 1
                                    );
                                }),
                                (a.getStart = function () {
                                    for (var t = 0, e = 0; e < n.rows.length && e < this.index; e++) t += n.rows[e].getHeight();
                                }),
                                (a.getHeight = function () {
                                    return Math.max(this.lines.length * n.lineHeight() + n.cellHeaderHeight, this.calendar.cellHeight);
                                }),
                                this.rows.push(a);
                        }
                        this.endDate = this.firstDate.addDays(7 * t);
                    }),
                    (this.visibleStart = function () {
                        return n.firstDate;
                    }),
                    (this.visibleEnd = function () {
                        return n.endDate;
                    }),
                    (this.getHeight = function () {
                        for (var t = this.headerHeight, e = 0; e < this.rows.length; e++) t += this.rows[e].getHeight();
                        return t;
                    }),
                    (this.getWidth = function (t, e) {
                        return 7 * e.y + e.x - (7 * t.y + t.x) + 1;
                    }),
                    (this.getMinCoords = function (t, e) {
                        return 7 * t.y + t.x < 7 * e.y + e.x ? t : e;
                    }),
                    (this.u = function (t) {
                        var e = this.theme || this.cssClassPrefix;
                        return e ? e + t : "";
                    }),
                    (this.A = function () {
                        var e = this.nav.top;
                        e.setAttribute("unselectable", "on"),
                            (e.style.MozUserSelect = "none"),
                            (e.style.KhtmlUserSelect = "none"),
                            (e.style.WebkitUserSelect = "none"),
                            (e.style.position = "relative"),
                        this.width && (e.style.width = this.width),
                            (e.style.height = this.getHeight() + "px"),
                            (e.onselectstart = function (t) {
                                return !1;
                            }),
                        this.hideUntilInit && (e.style.visibility = "hidden"),
                        this.visible || (e.style.display = "none"),
                            (e.className = this.u("_main"));
                        var i = document.createElement("div");
                        (this.nav.cells = i), (i.style.position = "absolute"), (i.style.left = "0px"), (i.style.right = "0px"), i.setAttribute("unselectable", "on"), e.appendChild(i);
                        var s = document.createElement("div");
                        (this.nav.events = s),
                            (s.style.position = "absolute"),
                            (s.style.left = "0px"),
                            (s.style.right = "0px"),
                            s.setAttribute("unselectable", "on"),
                            e.appendChild(s),
                            (e.onmousemove = function (e) {
                                if (t.resizingEvent) {
                                    var i = DayPilot.mo2(n.nav.top, e);
                                    if (!i) return;
                                    var s = n.getCellBelowPoint(i.x, i.y);
                                    n.clearShadow();
                                    var a,
                                        l,
                                        o = t.resizingEvent;
                                    o.start;
                                    if ("w-resize" === o.direction) {
                                        l = s;
                                        var r = o.event.end();
                                        r.getDatePart() === r && (r = r.addDays(-1));
                                        var h = n.getCellFromDate(r);
                                        a = n.getWidth(s, h);
                                    } else (l = n.getCellFromDate(o.event.start())), (a = n.getWidth(l, s));
                                    a < 1 && (a = 1), n.drawShadow(l.x, l.y, 0, a);
                                } else if (t.movingEvent) {
                                    var i = DayPilot.mo2(n.nav.top, e);
                                    if (!i) return;
                                    if (i.x === t.movingEvent.coords.x && i.y === t.movingEvent.coords.y) return;
                                    var s = n.getCellBelowPoint(i.x, i.y);
                                    n.clearShadow();
                                    var d = t.movingEvent.event,
                                        c = t.movingEvent.offset,
                                        a = n.cellMode ? 1 : DayPilot.DateUtil.daysSpan(d.start(), d.end()) + 1;
                                    a < 1 && (a = 1), n.drawShadow(s.x, s.y, 0, a, c, d);
                                } else if (t.timeRangeSelecting) {
                                    var i = DayPilot.mo2(n.nav.top, e);
                                    if (!i) return;
                                    var s = n.getCellBelowPoint(i.x, i.y);
                                    n.clearShadow();
                                    var l = t.timeRangeSelecting,
                                        v = 7 * l.y + l.x,
                                        u = 7 * s.y + s.x,
                                        a = Math.abs(u - v) + 1;
                                    a < 1 && (a = 1);
                                    var f = v < u ? l : s;
                                    (t.timeRangeSelecting.from = { x: f.x, y: f.y }), (t.timeRangeSelecting.width = a), (t.timeRangeSelecting.moved = !0), n.drawShadow(f.x, f.y, 0, a, 0, null);
                                }
                            });
                    }),
                    (this.h = function () {
                        this.nav.top.style.height = this.getHeight() + "px";
                        for (var t = 0; t < this.cells.length; t++) for (var e = 0; e < this.cells[t].length; e++) (this.cells[t][e].style.top = this.getRowTop(e) + "px"), (this.cells[t][e].style.height = this.rows[e].getHeight() + "px");
                    }),
                    (this.getCellBelowPoint = function (t, e) {
                        for (var i = Math.floor(this.nav.top.clientWidth / this.getColCount()), n = Math.min(Math.floor(t / i), this.getColCount() - 1), s = null, a = this.headerHeight, l = 0, o = 0; o < this.rows.length; o++) {
                            var r = a;
                            if (((a += this.rows[o].getHeight()), e < a)) {
                                (l = e - r), (s = o);
                                break;
                            }
                        }
                        null === s && (s = this.rows.length - 1);
                        var h = {};
                        return (h.x = n), (h.y = s), (h.relativeY = l), h;
                    }),
                    (this.getCellFromDate = function (t) {
                        for (var e = DayPilot.DateUtil.daysDiff(this.firstDate, t), i = { x: 0, y: 0 }; e >= 7; ) i.y++, (e -= 7);
                        return (i.x = e), i;
                    }),
                    (this.g = function () {
                        var t = document.createElement("div");
                        (t.oncontextmenu = function () {
                            return !1;
                        }),
                            this.nav.cells.appendChild(t),
                            (this.cells = []);
                        for (var e = 0; e < this.getColCount(); e++) {
                            this.cells[e] = [];
                            var i = document.createElement("div");
                            i.setAttribute("unselectable", "on"),
                                (i.style.position = "absolute"),
                                (i.style.left = this.getCellWidth() * e + "%"),
                                (i.style.width = this.getCellWidth() + "%"),
                                (i.style.top = "0px"),
                                (i.style.height = this.headerHeight + "px");
                            var n = e + this.getWeekStart();
                            n > 6 && (n -= 7), (i.className = this.u("_header"));
                            var a = document.createElement("div");
                            a.setAttribute("unselectable", "on"),
                                (a.innerHTML = s.locale().dayNames[n]),
                                i.appendChild(a),
                                (a.style.position = "absolute"),
                                (a.style.top = "0px"),
                                (a.style.bottom = "0px"),
                                (a.style.left = "0px"),
                                (a.style.right = "0px"),
                                (a.className = this.u("_header_inner")),
                                (a.innerHTML = s.locale().dayNames[n]),
                                t.appendChild(i);
                            for (var l = 0; l < this.rows.length; l++) this.B(e, l, t);
                        }
                    }),
                    (this.f = function () {
                        for (var t = 0; t < this.cells.length; t++) for (var e = 0; e < this.cells[t].length; e++) this.cells[t][e].onclick = null;
                        this.nav.cells.innerHTML = "";
                    }),
                    (this.C = function () {
                        return 2 === n.api;
                    }),
                    (this.B = function (e, i, a) {
                        var l = this.rows[i],
                            o = this.firstDate.addDays(7 * i + e),
                            r = document.createElement("div");
                        if (
                            (r.setAttribute("unselectable", "on"),
                                (r.style.position = "absolute"),
                                (r.style.cursor = "default"),
                                (r.style.left = this.getCellWidth() * e + "%"),
                                (r.style.width = this.getCellWidth() + "%"),
                                (r.style.top = this.getRowTop(i) + "px"),
                                (r.style.height = l.getHeight() + "px"),
                                (r.className = this.u("_cell")),
                                !this.isWeekend(o))
                        ) {
                            var h = this.u("_cell_business");
                            DayPilot.Util.addClass(r, h);
                        }
                        var d = (this.startDate.addMonths(-1).getMonth(), this.startDate.addMonths(1).getMonth(), this.startDate.getMonth(), document.createElement("div"));
                        d.setAttribute("unselectable", "on"),
                            r.appendChild(d),
                            (d.style.position = "absolute"),
                            (d.style.left = "0px"),
                            (d.style.right = "0px"),
                            (d.style.top = "0px"),
                            (d.style.bottom = "0px"),
                            (d.className = this.u("_cell_inner")),
                            (r.onmousedown = function (s) {
                                "Disabled" !== n.timeRangeSelectedHandling && (n.clearShadow(), (t.timeRangeSelecting = { root: n, x: e, y: i, from: { x: e, y: i }, width: 1 }));
                            }),
                            (r.onclick = function () {
                                var t = function (t) {
                                    var e = new DayPilot.Date(t),
                                        i = e.addDays(1);
                                    n.D(e, i);
                                };
                                if ("Disabled" !== n.timeRangeSelectedHandling) return void t(o);
                            });
                        var c = document.createElement("div");
                        c.setAttribute("unselectable", "on"),
                            (c.style.height = this.cellHeaderHeight + "px"),
                            (c.className = this.u("_cell_header")),
                            (c.onclick = function (t) {
                                if ("Enabled" === n.cellHeaderClickHandling) {
                                    t.stopPropagation();
                                    var e = {};
                                    (e.control = n),
                                        (e.start = o),
                                        (e.end = o.addDays(1)),
                                        (e.preventDefault = function () {
                                            this.preventDefault.value = !0;
                                        }),
                                    ("function" == typeof n.onCellHeaderClick && (n.onCellHeaderClick(e), e.preventDefault.value)) || ("function" == typeof n.onCellHeaderClicked && n.onCellHeaderClicked(e));
                                }
                            });
                        var v = o.getDay();
                        1 === v ? (c.innerHTML = s.locale().monthNames[o.getMonth()] + " " + v) : (c.innerHTML = v), d.appendChild(c), (this.cells[e][i] = r), a.appendChild(r);
                    }),
                    (this.getWeekStart = function () {
                        return s.locale().weekStarts;
                    }),
                    (this.getColCount = function () {
                        return 7;
                    }),
                    (this.getCellWidth = function () {
                        return 14.285;
                    }),
                    (this.getRowTop = function (t) {
                        for (var e = this.headerHeight, i = 0; i < t; i++) e += this.rows[i].getHeight();
                        return e;
                    }),
                    (this.E = function (t, e, i) {
                        var n = {};
                        (n.action = t), (n.parameters = i), (n.data = e), (n.header = this.F());
                        var s = "JSON" + DayPilot.JSON.stringify(n);
                        this.backendUrl && DayPilot.request(this.backendUrl, this.G, s, this.ajaxError);
                    }),
                    (this.G = function (t) {
                        n.a(t.responseText);
                    }),
                    (this.F = function () {
                        var t = {};
                        return (
                            (t.control = "dpm"),
                                (t.id = this.id),
                                (t.v = this.v),
                                (t.visibleStart = new DayPilot.Date(this.firstDate)),
                                (t.visibleEnd = t.visibleStart.addDays(this.days)),
                                (t.startDate = n.startDate),
                                (t.timeFormat = this.timeFormat),
                                (t.weekStarts = this.weekStarts),
                                t
                        );
                    }),
                    (this.eventClickCallBack = function (t, e) {
                        this.E("EventClick", e, t);
                    }),
                    (this.w = function (e) {
                        (t.movingEvent = null), (t.resizingEvent = null);
                        var i = this,
                            e = e || window.event;
                        e.ctrlKey;
                        (e.cancelBubble = !0), e.stopPropagation && e.stopPropagation(), n.eventClickSingle(i, e);
                    }),
                    (this.eventClickSingle = function (t, e) {
                        var i = t.event;
                        if (i.client.clickEnabled())
                            if (n.C()) {
                                var s = {};
                                if (
                                    ((s.e = i),
                                        (s.control = n),
                                        (s.div = t),
                                        (s.originalEvent = e),
                                        (s.meta = e.metaKey),
                                        (s.ctrl = e.ctrlKey),
                                        (s.preventDefault = function () {
                                            this.preventDefault.value = !0;
                                        }),
                                    "function" == typeof n.onEventClick &&
                                    (n.j.apply(function () {
                                        n.onEventClick(s);
                                    }),
                                        s.preventDefault.value))
                                )
                                    return;
                                switch (n.eventClickHandling) {
                                    case "CallBack":
                                        n.eventClickCallBack(i);
                                }
                                "function" == typeof n.onEventClicked &&
                                n.j.apply(function () {
                                    n.onEventClicked(s);
                                });
                            } else
                                switch (n.eventClickHandling) {
                                    case "CallBack":
                                        n.eventClickCallBack(i);
                                        break;
                                    case "JavaScript":
                                        n.onEventClick(i);
                                }
                    }),
                    (this.z = function (t) {
                        if (n.C()) {
                            var e = {};
                            if (
                                ((e.e = t),
                                    (e.control = n),
                                    (e.preventDefault = function () {
                                        this.preventDefault.value = !0;
                                    }),
                                "function" == typeof n.onEventDelete &&
                                (n.j.apply(function () {
                                    n.onEventDelete(e);
                                }),
                                    e.preventDefault.value))
                            )
                                return;
                            switch (n.eventDeleteHandling) {
                                case "CallBack":
                                    n.eventDeleteCallBack(t);
                                    break;
                                case "PostBack":
                                    n.eventDeletePostBack(t);
                                    break;
                                case "Update":
                                    n.events.remove(t);
                            }
                            "function" == typeof n.onEventDeleted &&
                            n.j.apply(function () {
                                n.onEventDeleted(e);
                            });
                        } else
                            switch (n.eventDeleteHandling) {
                                case "PostBack":
                                    n.eventDeletePostBack(t);
                                    break;
                                case "CallBack":
                                    n.eventDeleteCallBack(t);
                                    break;
                                case "JavaScript":
                                    n.onEventDelete(t);
                            }
                    }),
                    (this.eventDeleteCallBack = function (t, e) {
                        this.E("EventDelete", e, t);
                    }),
                    (this.eventDeletePostBack = function (t, e) {
                        this.H("EventDelete", e, t);
                    }),
                    (this.eventMoveCallBack = function (t, e, i, n, s) {
                        if (!e) throw "newStart is null";
                        if (!i) throw "newEnd is null";
                        var a = {};
                        (a.e = t), (a.newStart = e), (a.newEnd = i), (a.position = s), this.E("EventMove", n, a);
                    }),
                (this.I = function (t, e, i, s, a, l) {
                    var o = t.start().getTimePart(),
                        r = t.end().getDatePart();
                    r !== t.end() && (r = r.addDays(1));
                    var h = DayPilot.DateUtil.diff(t.end(), r),
                        d = this.getDateFromCell(e, i);
                    d = d.addDays(-s);
                    var c = DayPilot.DateUtil.daysSpan(t.start(), t.end()) + 1,
                        v = d.addDays(c),
                        u = d.addTime(o),
                        f = v.addTime(h);
                    if (n.C()) {
                        var p = {};
                        if (
                            ((p.e = t),
                                (p.control = n),
                                (p.newStart = u),
                                (p.newEnd = f),
                                (p.ctrl = a.ctrlKey),
                                (p.shift = a.shiftKey),
                                (p.preventDefault = function () {
                                    this.preventDefault.value = !0;
                                }),
                            "function" == typeof n.onEventMove &&
                            (n.j.apply(function () {
                                n.onEventMove(p);
                            }),
                                p.preventDefault.value))
                        )
                            return;
                        switch (n.eventMoveHandling) {
                            case "CallBack":
                                n.eventMoveCallBack(t, u, f);
                                break;
                            case "Update":
                                t.start(u), t.end(f), n.events.update(t);
                        }
                        "function" == typeof n.onEventMoved &&
                        n.j.apply(function () {
                            n.onEventMoved(p);
                        });
                    } else
                        switch (n.eventMoveHandling) {
                            case "CallBack":
                                n.eventMoveCallBack(t, u, f);
                                break;
                            case "JavaScript":
                                n.onEventMove(t, u, f);
                        }
                }),
                (this.eventResizeCallBack = function (t, e, i, n) {
                    if (!e) throw "newStart is null";
                    if (!i) throw "newEnd is null";
                    var s = {};
                    (s.e = t), (s.newStart = e), (s.newEnd = i), this.E("EventResize", n, s);
                }),
                (this.J = function (t, e, i) {
                    var s = t.start().getTimePart(),
                        a = t.end().getDatePart();
                    a !== t.end() && (a = a.addDays(1));
                    var l = DayPilot.DateUtil.diff(t.end(), a),
                        o = this.getDateFromCell(e.x, e.y),
                        r = o.addDays(i),
                        h = o.addTime(s),
                        d = r.addTime(l);
                    if (n.C()) {
                        var c = {};
                        if (
                            ((c.e = t),
                                (c.control = n),
                                (c.newStart = h),
                                (c.newEnd = d),
                                (c.preventDefault = function () {
                                    this.preventDefault.value = !0;
                                }),
                            "function" == typeof n.onEventResize &&
                            (n.j.apply(function () {
                                n.onEventResize(c);
                            }),
                                c.preventDefault.value))
                        )
                            return;
                        switch (n.eventResizeHandling) {
                            case "CallBack":
                                n.eventResizeCallBack(t, h, d);
                                break;
                            case "Update":
                                t.start(h), t.end(d), n.events.update(t);
                        }
                        "function" == typeof n.onEventResized &&
                        n.j.apply(function () {
                            n.onEventResized(c);
                        });
                    } else
                        switch (n.eventResizeHandling) {
                            case "CallBack":
                                n.eventResizeCallBack(t, h, d);
                                break;
                            case "JavaScript":
                                n.onEventResize(t, h, d);
                        }
                }),
                (this.timeRangeSelectedCallBack = function (t, e, i) {
                    var n = {};
                    (n.start = t), (n.end = e), this.E("TimeRangeSelected", i, n);
                }),
                (this.D = function (t, e) {
                    if (this.C()) {
                        var i = {};
                        if (
                            ((i.control = n),
                                (i.start = t),
                                (i.end = e),
                                (i.preventDefault = function () {
                                    this.preventDefault.value = !0;
                                }),
                            "function" == typeof n.onTimeRangeSelect &&
                            (n.j.apply(function () {
                                n.onTimeRangeSelect(i);
                            }),
                                i.preventDefault.value))
                        )
                            return;
                        switch (n.timeRangeSelectedHandling) {
                            case "CallBack":
                                n.timeRangeSelectedCallBack(t, e);
                        }
                        "function" == typeof n.onTimeRangeSelected &&
                        n.j.apply(function () {
                            n.onTimeRangeSelected(i);
                        });
                    } else
                        switch (n.timeRangeSelectedHandling) {
                            case "CallBack":
                                n.timeRangeSelectedCallBack(t, e);
                                break;
                            case "JavaScript":
                                n.onTimeRangeSelected(t, e);
                        }
                }),
                (this.j = {}),
                (this.j.scope = null),
                (this.j.notify = function () {
                    n.j.scope && n.j.scope["$apply"]();
                }),
                (this.j.apply = function (t) {
                    t();
                }),
                (this.clearSelection = function () {
                    n.clearShadow();
                }),
                (this.commandCallBack = function (t, e) {
                    var i = {};
                    (i.command = t), this.E("Command", e, i);
                }),
                (this.isWeekend = function (t) {
                    return (t = new DayPilot.Date(t)), 0 === t.dayOfWeek() || 6 === t.dayOfWeek();
                }),
                (this.K = {}),
                (this.K.locale = function () {
                    var t = DayPilot.Locale.find(n.locale);
                    return t ? t : DayPilot.Locale.US;
                }),
                (this.K.L = function () {
                    return "Disabled" !== n.xssProtection;
                });
                var s = this.K;
                (this.debug = function (t, e) {
                    this.debuggingEnabled && (n.debugMessages || (n.debugMessages = []), n.debugMessages.push(t), "undefined" != typeof console && console.log(t));
                }),
                    (this.dispose = function () {
                        var t = n;
                        t.nav.top && (t.b(), t.nav.top.removeAttribute("style"), t.nav.top.removeAttribute("class"), (t.nav.top.innerHTML = ""), (t.nav.top.dp = null), (t.nav.top.onmousemove = null), (t.nav.top = null));
                    }),
                    (this.M = function () {
                        t.globalHandlers || ((t.globalHandlers = !0), DayPilot.re(document, "mouseup", t.gMouseUp));
                    }),
                    (this.loadFromServer = function () {
                        return !(!this.backendUrl && "function" != typeof WebForm_DoCallback) && ("undefined" == typeof n.events.list || !n.events.list);
                    }),
                    (this.m = function () {
                        "hidden" === this.nav.top.style.visibility && (this.nav.top.style.visibility = "visible");
                    }),
                    (this.show = function () {
                        (n.visible = !0), (n.nav.top.style.display = "");
                    }),
                    (this.hide = function () {
                        (n.visible = !1), (n.nav.top.style.display = "none");
                    }),
                    (this.N = function () {
                        if (this.id && this.id.tagName) this.nav.top = this.id;
                        else {
                            if ("string" != typeof this.id) throw "DayPilot.Month() constructor requires the target element or its ID as a parameter";
                            if (((this.nav.top = document.getElementById(this.id)), !this.nav.top)) throw "DayPilot.Month: The placeholder element not found: '" + id + "'.";
                        }
                    }),
                    (this.O = function () {
                        this.c(), this.A(), this.g(), this.M(), this.E("Init");
                    }),
                    (this.P = function (t, e) {
                        return n.K.L() ? DayPilot.Util.escapeTextHtml(t, e) : DayPilot.Util.isNullOrUndefined(e) ? (DayPilot.Util.isNullOrUndefined(t) ? "" : t) : e;
                    }),
                    (this.internal = {}),
                    (this.internal.xssTextHtml = n.P),
                    (this.init = function () {
                        return (
                            this.N(),
                                this.loadFromServer() ? void this.O() : (this.c(), this.d(), this.A(), this.g(), this.m(), this.i(), this.M(), this.messageHTML && this.message(this.messageHTML), void this.fireAfterRenderDetached(null, !1))
                        );
                    }),
                    (this.Init = this.init),
                    Object.defineProperty(this, "durationBarVisible", {
                        get: function () {
                            return n.eventBarVisible;
                        },
                    }),
                    this.l(i);
            }),
                (t.gMouseUp = function (e) {
                    if (t.movingEvent) {
                        var i = t.movingEvent;
                        if (!i.event) return;
                        if (!i.event.calendar) return;
                        if (!i.event.calendar.shadow) return;
                        if (!i.event.calendar.shadow.start) return;
                        var n = t.movingEvent.event.calendar,
                            s = t.movingEvent.event,
                            a = n.shadow.start,
                            l = n.shadow.position,
                            o = t.movingEvent.offset;
                        n.clearShadow(), (t.movingEvent = null);
                        var e = e || window.event;
                        return n.I(s, a.x, a.y, o, e, l), (e.cancelBubble = !0), e.stopPropagation && e.stopPropagation(), (t.movingEvent = null), !1;
                    }
                    if (t.resizingEvent) {
                        var i = t.resizingEvent;
                        if (!i.event) return;
                        if (!i.event.calendar) return;
                        if (!i.event.calendar.shadow) return;
                        if (!i.event.calendar.shadow.start) return;
                        var n = t.resizingEvent.event.calendar,
                            s = t.resizingEvent.event,
                            a = n.shadow.start,
                            r = n.shadow.width;
                        return n.clearShadow(), (t.resizingEvent = null), n.J(s, a, r), (e.cancelBubble = !0), (t.resizingEvent = null), !1;
                    }
                    if (t.timeRangeSelecting) {
                        if (t.timeRangeSelecting.moved) {
                            var h = t.timeRangeSelecting,
                                n = h.root,
                                a = new DayPilot.Date(n.getDateFromCell(h.from.x, h.from.y)),
                                d = a.addDays(h.width);
                            n.D(a, d), n.clearShadow();
                        }
                        t.timeRangeSelecting = null;
                    }
                }),
                (DayPilot.Month = t.Month),
            "undefined" != typeof jQuery &&
            !(function (t) {
                t.fn.daypilotMonth = function (t) {
                    var e = null,
                        i = this.each(function () {
                            if (!this.daypilot) {
                                var i = new DayPilot.Month(this.id);
                                this.daypilot = i;
                                for (name in t) i[name] = t[name];
                                i.Init(), e || (e = i);
                            }
                        });
                    return 1 === this.length ? e : i;
                };
            })(jQuery),
                (function () {
                    var t = DayPilot.am();
                    t &&
                    t.directive("daypilotMonth", [
                        "$parse",
                        function (t) {
                            return {
                                restrict: "E",
                                template: "<div></div>",
                                replace: !0,
                                link: function (e, i, n) {
                                    var s = new DayPilot.Month(i[0]);
                                    (s.j.scope = e), s.init();
                                    var a = n["id"];
                                    a && (e[a] = s);
                                    var l = n["publishAs"];
                                    if (l) {
                                        (0, t(l).assign)(e, s);
                                    }
                                    for (var o in n)
                                        0 === o.indexOf("on") &&
                                        !(function (i) {
                                            s[i] = function (s) {
                                                var a = t(n[i]);
                                                e["$apply"](function () {
                                                    a(e, { args: s });
                                                });
                                            };
                                        })(o);
                                    var r = e["$watch"],
                                        h = n["config"] || n["daypilotConfig"],
                                        d = n["events"] || n["daypilotEvents"];
                                    r.call(
                                        e,
                                        h,
                                        function (t) {
                                            for (var e in t) s[e] = t[e];
                                            s.update();
                                        },
                                        !0
                                    ),
                                        r.call(
                                            e,
                                            d,
                                            function (t) {
                                                (s.events.list = t), s.update();
                                            },
                                            !0
                                        );
                                },
                            };
                        },
                    ]);
                })(),
            "undefined" != typeof Sys && Sys.Application && Sys.Application.notifyScriptLoaded && Sys.Application.notifyScriptLoaded();
        }
    })();
if ("undefined" == typeof DayPilot) var DayPilot = {};
"undefined" == typeof DayPilot.Global && (DayPilot.Global = {}),
    (function () {
        if ("undefined" == typeof DayPilot.Navigator || !DayPilot.Navigator.nav) {
            (DayPilot.Navigator = function (t, e) {
                this.v = "2022.2.384-lite";
                var i = this;
                (this.id = t),
                    (this.api = 2),
                    (this.isNavigator = !0),
                    (this.autoFocusOnClick = !0),
                    (this.weekStarts = "Auto"),
                    (this.selectMode = "Day"),
                    (this.titleHeight = 30),
                    (this.dayHeaderHeight = 30),
                    (this.bound = null),
                    (this.cellWidth = 30),
                    (this.cellHeight = 30),
                    (this.cssClassPrefix = "navigator_default"),
                    (this.freeHandSelectionEnabled = !1),
                    (this.selectionStart = new DayPilot.Date().getDatePart()),
                    (this.selectionEnd = null),
                    (this.selectionDay = null),
                    (this.showMonths = 1),
                    (this.skipMonths = 1),
                    (this.command = "navigate"),
                    (this.year = new DayPilot.Date().getYear()),
                    (this.month = new DayPilot.Date().getMonth() + 1),
                    (this.showWeekNumbers = !1),
                    (this.weekNumberAlgorithm = "Auto"),
                    (this.rowsPerMonth = "Six"),
                    (this.orientation = "Vertical"),
                    (this.locale = "en-us"),
                    (this.rtl = !1),
                    (this.visible = !0),
                    (this.timeRangeSelectedHandling = "Bind"),
                    (this.visibleRangeChangedHandling = "Enabled"),
                    (this.onVisibleRangeChange = null),
                    (this.onVisibleRangeChanged = null),
                    (this.onTimeRangeSelect = null),
                    (this.onTimeRangeSelected = null),
                    (this.nav = {}),
                    (this.a = {}),
                    (this.b = function () {
                        (this.root.dp = this),
                            (this.root.className = this.c("_main")),
                            "Horizontal" === this.orientation
                                ? ((this.root.style.width = this.showMonths * (7 * a.cellWidth() + this.d()) + "px"), (this.root.style.height = 6 * this.cellHeight + this.titleHeight + this.dayHeaderHeight + "px"))
                                : (this.root.style.width = 7 * a.cellWidth() + this.d() + "px"),
                        this.rtl && (this.root.style.direction = "rtl"),
                            (this.root.style.position = "relative"),
                        this.visible || (this.root.style.display = "none");
                        var t = document.createElement("input");
                        (t.type = "hidden"),
                            (t.name = i.id + "_state"),
                            (t.id = t.name),
                            this.root.appendChild(t),
                            (this.state = t),
                            this.startDate ? (this.startDate = new DayPilot.Date(this.startDate).firstDayOfMonth()) : (this.startDate = DayPilot.Date.fromYearMonthDay(this.year, this.month)),
                            (this.calendars = []),
                            (this.selected = []),
                            (this.months = []);
                    }),
                    (this.e = function () {
                        return 2 === i.api;
                    }),
                    (this.f = function () {
                        this.root.innerHTML = "";
                    }),
                    (this.c = function (t) {
                        var e = this.theme || this.cssClassPrefix;
                        return e ? e + t : "";
                    }),
                    (this.g = function (t, e) {
                        var i = this.c("_" + e);
                        DayPilot.Util.addClass(t, i);
                    }),
                    (this.h = function (t, e) {
                        var i = this.c("_" + e);
                        DayPilot.Util.removeClass(t, i);
                    }),
                    (this.i = function (t, e) {
                        var s = {};
                        (s.cells = []), (s.days = []), (s.weeks = []);
                        var n = this.startDate.addMonths(t),
                            l = e.before,
                            o = e.after,
                            h = n.firstDayOfMonth(),
                            r = h.firstDayOfWeek(a.weekStarts()),
                            c = h.addMonths(1),
                            d = DayPilot.DateUtil.daysDiff(r, c),
                            u = "Auto" === this.rowsPerMonth ? Math.ceil(d / 7) : 6;
                        s.rowCount = u;
                        var f = new DayPilot.Date().getDatePart(),
                            y = 7 * a.cellWidth() + this.d();
                        s.width = y;
                        var p = this.cellHeight * u + this.titleHeight + this.dayHeaderHeight;
                        s.height = p;
                        var v = document.createElement("div");
                        if (((v.style.width = y + "px"), (v.style.height = p + "px"), "Horizontal" === this.orientation)) (v.style.position = "absolute"), (v.style.left = y * t + "px"), (v.style.top = "0px"), (s.top = 0), (s.left = y * t);
                        else {
                            v.style.position = "relative";
                            var g = t > 0 ? i.months[t - 1].top + i.months[t - 1].height : 0;
                            (s.top = g), (s.left = 0);
                        }
                        (v.className = this.c("_month")), (v.style.cursor = "default"), (v.style.MozUserSelect = "none"), (v.style.KhtmlUserSelect = "none"), (v.style.WebkitUserSelect = "none"), (v.month = s), this.root.appendChild(v);
                        var m = this.titleHeight + this.dayHeaderHeight,
                            b = document.createElement("div");
                        (b.style.position = "absolute"),
                            (b.style.left = "0px"),
                            (b.style.right = "0px"),
                            (b.style.top = "0px"),
                            (b.style.width = a.cellWidth() + "px"),
                            (b.style.height = this.titleHeight + "px"),
                            (b.style.lineHeight = this.titleHeight + "px"),
                            b.setAttribute("unselectable", "on"),
                            (b.className = this.c("_titleleft")),
                        e.left && ((b.style.cursor = "pointer"), (b.innerHTML = "<span>&lt;</span>"), (b.onclick = this.j)),
                            v.appendChild(b),
                            (this.tl = b);
                        var D = document.createElement("div");
                        (D.style.position = "absolute"),
                            (D.style.left = a.cellWidth() + "px"),
                            (D.style.top = "0px"),
                            (D.style.width = 5 * a.cellWidth() + this.d() + "px"),
                            (D.style.height = this.titleHeight + "px"),
                            (D.style.lineHeight = this.titleHeight + "px"),
                            D.setAttribute("unselectable", "on"),
                            (D.className = this.c("_title")),
                            (D.innerHTML = a.locale().monthNames[n.getMonth()] + " " + n.getYear()),
                            v.appendChild(D),
                            (this.ti = D);
                        var x = document.createElement("div");
                        (x.style.position = "absolute"),
                            (x.style.left = 6 * a.cellWidth() + this.d() + "px"),
                            (x.style.right = 6 * a.cellWidth() + this.d() + "px"),
                            (x.style.top = "0px"),
                            (x.style.width = a.cellWidth() + "px"),
                            (x.style.height = this.titleHeight + "px"),
                            (x.style.lineHeight = this.titleHeight + "px"),
                            x.setAttribute("unselectable", "on"),
                            (x.className = this.c("_titleright")),
                        e.right && ((x.style.cursor = "pointer"), (x.innerHTML = "<span>&gt;</span>"), (x.onclick = this.k)),
                            v.appendChild(x),
                            (this.tr = x);
                        var w = this.d();
                        if (this.showWeekNumbers)
                            for (var k = 0; k < u; k++) {
                                var S = r.addDays(7 * k),
                                    C = null;
                                switch (this.weekNumberAlgorithm) {
                                    case "Auto":
                                        C = 1 === a.weekStarts() ? S.weekNumberISO() : S.weekNumber();
                                        break;
                                    case "US":
                                        C = S.weekNumber();
                                        break;
                                    case "ISO8601":
                                        C = S.weekNumberISO();
                                        break;
                                    default:
                                        throw "Unknown weekNumberAlgorithm value.";
                                }
                                var H = document.createElement("div");
                                (H.style.position = "absolute"),
                                    (H.style.left = "0px"),
                                    (H.style.right = "0px"),
                                    (H.style.top = k * this.cellHeight + m + "px"),
                                    (H.style.width = a.cellWidth() + "px"),
                                    (H.style.height = this.cellHeight + "px"),
                                    (H.style.lineHeight = this.cellHeight + "px"),
                                    H.setAttribute("unselectable", "on"),
                                    (H.className = this.c("_weeknumber")),
                                    (H.innerHTML = "<span>" + C + "</span>"),
                                    v.appendChild(H),
                                    s.weeks.push(H);
                            }
                        for (var P = 0; P < 7; P++) {
                            s.cells[P] = [];
                            var H = document.createElement("div");
                            (H.style.position = "absolute"),
                                (H.style.left = P * a.cellWidth() + w + "px"),
                                (H.style.right = P * a.cellWidth() + w + "px"),
                                (H.style.top = this.titleHeight + "px"),
                                (H.style.width = a.cellWidth() + "px"),
                                (H.style.height = this.dayHeaderHeight + "px"),
                                (H.style.lineHeight = this.dayHeaderHeight + "px"),
                                H.setAttribute("unselectable", "on"),
                                (H.className = this.c("_dayheader")),
                                (H.innerHTML = "<span>" + this.l(P) + "</span>"),
                                v.appendChild(H),
                                s.days.push(H);
                            for (var k = 0; k < u; k++) {
                                var S = r.addDays(7 * k + P),
                                    M = this.m(S) && "none" !== this.n(),
                                    E = S.firstDayOfMonth() === n,
                                    N = S < n,
                                    W = S >= n.addMonths(1);
                                if ("month" === this.n()) M = M && E;
                                else if ("day" === this.n()) M = M && (E || (l && N) || (o && W));
                                else if ("week" === this.n()) {
                                    var O = S.firstDayOfMonth() === n;
                                    M = M && (O || (l && N) || (o && W));
                                }
                                var R = document.createElement("div");
                                s.cells[P][k] = R;
                                var T = i.o(P, k),
                                    A = T.x,
                                    B = T.y;
                                (R.day = S),
                                    (R.x = P),
                                    (R.y = k),
                                    (R.left = A),
                                    (R.top = B),
                                    (R.isCurrentMonth = E),
                                    (R.isNextMonth = W),
                                    (R.isPrevMonth = N),
                                    (R.showBefore = l),
                                    (R.showAfter = o),
                                    (R.className = this.c(E ? "_day" : "_dayother")),
                                    i.g(R, "cell"),
                                S.getTime() === f.getTime() && E && this.g(R, "today"),
                                (0 !== S.dayOfWeek() && 6 !== S.dayOfWeek()) || this.g(R, "weekend"),
                                    (R.style.position = "absolute"),
                                    (R.style.left = A + "px"),
                                    (R.style.right = A + "px"),
                                    (R.style.top = B + "px"),
                                    (R.style.width = a.cellWidth() + "px"),
                                    (R.style.height = this.cellHeight + "px"),
                                    (R.style.lineHeight = this.cellHeight + "px");
                                var _ = document.createElement("div");
                                (_.style.position = "absolute"),
                                    (_.className = S.getTime() === f.getTime() && E ? this.c("_todaybox") : this.c("_daybox")),
                                    i.g(_, "cell_box"),
                                    (_.style.left = "0px"),
                                    (_.style.top = "0px"),
                                    (_.style.right = "0px"),
                                    (_.style.bottom = "0px"),
                                    R.appendChild(_);
                                var U = null;
                                if ((this.cells && this.cells[S.toStringSortable()] && (U = this.cells[S.toStringSortable()]), "function" == typeof i.onBeforeCellRender)) {
                                    var I = {};
                                    (I.cell = U || {}),
                                        (I.cell.day = S),
                                        (I.cell.isCurrentMonth = E),
                                        (I.cell.isToday = S.getTime() === f.getTime() && E),
                                        (I.cell.isWeekend = 0 === S.dayOfWeek() || 6 === S.dayOfWeek()),
                                        U ? ((I.cell.html = U.html || S.getDay()), (I.cell.cssClass = U.css)) : ((I.cell.html = S.getDay()), (I.cell.cssClass = null)),
                                        i.onBeforeCellRender(I),
                                        (U = I.cell);
                                }
                                if ((U && DayPilot.Util.addClass(R, U.cssClass || U.css), E || (l && N) || (o && W))) {
                                    var L = document.createElement("div");
                                    (L.innerHTML = S.getDay()),
                                        (L.style.position = "absolute"),
                                        (L.style.left = "0px"),
                                        (L.style.top = "0px"),
                                        (L.style.right = "0px"),
                                        (L.style.bottom = "0px"),
                                        i.g(L, "cell_text"),
                                        (R.isClickable = !0),
                                    U && U.html && (L.innerHTML = U.html),
                                        R.appendChild(L);
                                }
                                R.setAttribute("unselectable", "on"), (R.onclick = this.p), v.appendChild(R), M && (i.q(v, P, k), this.selected.push(R));
                            }
                        }
                        var V = document.createElement("div");
                        (V.style.position = "absolute"),
                            (V.style.left = "0px"),
                            (V.style.top = m - 2 + "px"),
                            (V.style.width = 7 * a.cellWidth() + this.d() + "px"),
                            (V.style.height = "1px"),
                            (V.style.fontSize = "1px"),
                            (V.style.lineHeight = "1px"),
                            (V.className = this.c("_line")),
                            v.appendChild(V),
                            this.months.push(s);
                    }),
                    (this.o = function (t, e) {
                        var i = this.titleHeight + this.dayHeaderHeight,
                            s = this.d();
                        return { x: t * a.cellWidth() + s, y: e * this.cellHeight + i };
                    }),
                    (this.q = function (t, e, s) {
                        var n = t.month.cells[e][s];
                        i.g(n, "select");
                    }),
                    (this.r = function (t, e, s) {
                        var n = t.month.cells[e][s];
                        i.h(n, "select");
                    }),
                    (this.d = function () {
                        return this.showWeekNumbers ? a.cellWidth() : 0;
                    }),
                    (this.s = function () {
                        if (this.items)
                            for (var t = 0; t < this.showMonths; t++)
                                for (var e = 0; e < 7; e++)
                                    for (var i = 0; i < 6; i++) {
                                        var s = this.months[t].cells[e][i];
                                        s && (1 === this.items[s.day.toStringSortable()] ? (this.g(s, "busy"), this.h(s, "free")) : (this.h(s, "busy"), this.g(s, "free")));
                                    }
                    }),
                    (this.t = function () {
                        var t = {};
                        (t.startDate = i.startDate), (t.selectionStart = i.selectionStart), (t.selectionEnd = i.selectionEnd.addDays(1)), (i.state.value = JSON.stringify(t));
                    }),
                    (this.n = function () {
                        return (this.selectMode || "").toLowerCase();
                    }),
                    (this.u = function () {
                        var t = this.selectionDay || this.selectionStart;
                        switch ((t || (t = DayPilot.Date.today()), (t = new DayPilot.Date(t)), this.n())) {
                            case "day":
                                (this.selectionStart = t), (this.selectionDay = t), (this.selectionEnd = t);
                                break;
                            case "week":
                                (this.selectionDay = t), (this.selectionStart = t.firstDayOfWeek(a.weekStarts())), (this.selectionEnd = this.selectionStart.addDays(6));
                                break;
                            case "month":
                                (this.selectionDay = t), (this.selectionStart = t.firstDayOfMonth()), (this.selectionEnd = this.selectionStart.lastDayOfMonth());
                                break;
                            case "none":
                                this.selectionEnd = t;
                                break;
                            default:
                                throw "Unknown selectMode value.";
                        }
                    }),
                    (this.w = null),
                    (this.select = function (t, e, s) {
                        var n = e && (e instanceof DayPilot.Date || "string" == typeof e),
                            a = "object" == typeof e || "boolean" == typeof e,
                            l = t,
                            o = n ? e : null,
                            h = a ? e : s;
                        if (!this.z) return void (this.w = { date1: l, date2: o, options: h });
                        var r = !0,
                            c = !0;
                        "object" == typeof h ? (h.dontFocus && (r = !1), h.dontNotify && (c = !1)) : "boolean" == typeof h && (r = !h);
                        var d = this.selectionStart,
                            u = this.selectionEnd;
                        (this.selectionStart = new DayPilot.Date(l).getDatePart()), (this.selectionDay = this.selectionStart);
                        var f = !1;
                        if (r) {
                            var y = this.startDate;
                            (this.selectionStart < this.A() || this.selectionStart >= this.B()) && (y = this.selectionStart.firstDayOfMonth()), y.toStringSortable() !== this.startDate.toStringSortable() && (f = !0), (this.startDate = y);
                        }
                        o && i.freeHandSelectionEnabled ? (i.selectionEnd = new DayPilot.Date(o)) : this.u(),
                            this.f(),
                            this.b(),
                            this.C(),
                            this.s(),
                            this.t(),
                        !c || (d.equals(this.selectionStart) && u.equals(this.selectionEnd)) || this.D(),
                        f && this.E();
                    }),
                    (this.update = function (t) {
                        if (!i.z) throw new DayPilot.Exception("You are trying to update a DayPilot.Navigator instance that hasn't been initialized yet.");
                        if (i.F) throw new DayPilot.Exception("You are trying to update a DayPilot.Navigator instance that has been disposed.");
                        i.G(), i.H(t);
                        var e = { day: i.selectionDay, start: i.selectionStart, end: i.selectionEnd };
                        i.I(), (e.start === i.selectionStart && e.end == i.selectionEnd && e.day === i.selectionDay) || i.D();
                    }),
                    (this.I = function () {
                        this.f(), this.b(), this.u(), this.C(), this.J(), this.s(), this.t(), this.visible ? this.show() : this.hide();
                    }),
                    (this.G = function () {
                        i.a = {};
                    }),
                    (this.K = null),
                    (this.H = function (t) {
                        if (t) {
                            var e = {
                                events: {
                                    preInit: function () {
                                        var t = this.data;
                                        t && (DayPilot.isArray(t.list) ? (i.events.list = t.list) : (i.events.list = t));
                                    },
                                },
                            };
                            this.K = e;
                            for (var s in t)
                                if (e[s]) {
                                    var n = e[s];
                                    (n.data = t[s]), n.preInit && n.preInit();
                                } else i[s] = t[s];
                        }
                    }),
                    (this.L = function () {
                        var t = this.K;
                        for (var e in t) {
                            var i = t[e];
                            i.postInit && i.postInit();
                        }
                    }),
                    (this.M = function (t, e, i) {
                        var s = {};
                        (s.action = t), (s.parameters = i), (s.data = e), (s.header = this.N());
                        var n = "JSON" + JSON.stringify(s);
                        this.backendUrl ? DayPilot.request(this.backendUrl, this.O, n, this.P) : WebForm_DoCallback(this.uniqueID, n, this.Q, null, this.callbackError, !0);
                    }),
                    (this.P = function (t) {
                        if ("function" == typeof i.onAjaxError) {
                            var e = {};
                            (e.request = t), i.onAjaxError(e);
                        } else "function" == typeof i.ajaxError && i.ajaxError(t);
                    }),
                    (this.O = function (t) {
                        i.Q(t.responseText);
                    }),
                    (this.R = function (t, e, s) {
                        var n = {};
                        (n.action = t), (n.parameters = s), (n.data = e), (n.header = this.N());
                        var a = "JSON" + JSON.stringify(n);
                        __doPostBack(i.uniqueID, a);
                    }),
                    (this.N = function () {
                        var t = {};
                        return (t.v = this.v), (t.startDate = this.startDate), (t.selectionStart = this.selectionStart), (t.showMonths = this.showMonths), t;
                    }),
                    (this.S = function (t, e) {
                        "refresh" === t && this.E();
                    }),
                    (this.l = function (t) {
                        var e = t + a.weekStarts();
                        return e > 6 && (e -= 7), a.locale().dayNamesShort[e];
                    }),
                    (this.m = function (t) {
                        return null !== this.selectionStart && null !== this.selectionEnd && this.selectionStart.getTime() <= t.getTime() && t.getTime() <= this.selectionEnd.getTime();
                    }),
                    (this.T = function (t) {
                        for (var e = 0; e < i.months.length; e++) {
                            var s = i.months[e];
                            if (!s) return null;
                            if (t.x < s.left || s.width < t.x) return null;
                            i.months[e].height;
                            if (s.top <= t.y && t.y < s.top + s.height) return e;
                        }
                        return null;
                    }),
                    (this.U = function (t) {
                        var e = DayPilot.mo3(i.nav.top, t),
                            s = i.T(e);
                        if (null === s) return null;
                        var n = i.months[s],
                            a = this.titleHeight + this.dayHeaderHeight;
                        if (n.top <= e.y && e.y < n.top + a) return { month: s, x: 0, y: 0, coords: e, header: !0 };
                        for (var l = 0; l < n.cells.length; l++)
                            for (var o = 0; o < n.cells[l].length; o++) {
                                var h = n.cells[l][o],
                                    r = h.top + n.top,
                                    c = h.left + n.left;
                                if (c <= e.x && e.x < c + i.cellWidth && r <= e.y && e.y < r + i.cellHeight) return { month: s, x: l, y: o, coords: e };
                            }
                        return null;
                    }),
                    (this.V = function (t) {
                        if (i.freeHandSelectionEnabled) {
                            var e = i.U(t);
                            e && !e.header && (s.start = e), i.months[e.month].cells[e.x][e.y], t.preventDefault();
                        }
                    }),
                    (this.W = function (t) {
                        if (s.start) {
                            var e = i.U(t);
                            if (s.end) s.end = e;
                            else if (e) {
                                var n = 3,
                                    a = DayPilot.distance(s.start.coords, e.coords);
                                a > n && (s.end = e);
                            }
                            s.end && (s.clear(), s.draw());
                        }
                    }),
                    (this.X = {});
                var s = this.X;
                (s.start = null),
                    (s.drawCell = function (t) {
                        var e = i.months[t.month],
                            n = i.o(t.x, t.y),
                            a = e.top + n.y,
                            l = e.left + n.x,
                            o = document.createElement("div");
                        (o.style.position = "absolute"),
                            (o.style.left = l + "px"),
                            (o.style.top = a + "px"),
                            (o.style.height = i.cellHeight + "px"),
                            (o.style.width = i.cellWidth + "px"),
                            (o.style.backgroundColor = "#ccc"),
                            (o.style.opacity = 0.5),
                            (o.style.cursor = "default"),
                            i.nav.preselection.appendChild(o),
                            s.cells.push(o);
                    }),
                    (s.clear = function () {
                        if (s.cells) {
                            for (var t = 0; t < s.cells.length; t++) i.nav.preselection.removeChild(s.cells[t]);
                            s.cells = [];
                        }
                    }),
                    (s.draw = function () {
                        var t = s.ordered(),
                            e = new n(t.start),
                            a = t.end;
                        if (a) {
                            if (a === s.end && a.header && a.month > 0) {
                                a.month -= 1;
                                var l = i.months[a.month];
                                (a.x = 6), (a.y = l.rowCount - 1);
                            }
                            for (s.cells = []; !e.is(a); ) {
                                s.drawCell(e);
                                var o = new n(e).next();
                                if (!o) return;
                                (e.month = o.month), (e.x = o.x), (e.y = o.y);
                            }
                            s.drawCell(e);
                        }
                    }),
                    (s.ordered = function () {
                        var t = s.start,
                            e = s.end,
                            i = {};
                        return !e || new n(t).before(e) ? ((i.start = t), (i.end = e)) : ((i.start = e), (i.end = t)), i;
                    });
                var n = function (t, e, s) {
                    if (t instanceof n) return t;
                    if ("object" == typeof t) {
                        var a = t;
                        (this.month = a.month), (this.x = a.x), (this.y = a.y);
                    } else (this.month = t), (this.x = e), (this.y = s);
                    (this.is = function (t) {
                        return this.month === t.month && this.x === t.x && this.y === t.y;
                    }),
                        (this.next = function () {
                            var t = this;
                            if (t.x < 6) return { month: t.month, x: t.x + 1, y: t.y };
                            var e = i.months[t.month];
                            return t.y < e.rowCount - 1 ? { month: t.month, x: 0, y: t.y + 1 } : t.month < i.months.length - 1 ? { month: t.month + 1, x: 0, y: 0 } : null;
                        }),
                        (this.visible = function () {
                            var t = this.cell();
                            return !!t.isCurrentMonth || !(!t.isPrevMonth || !t.showBefore) || !(!t.isNextMonth || !t.showAfter);
                        }),
                        (this.nextVisible = function () {
                            for (var t = this; !t.visible(); ) {
                                var e = t.next();
                                if (!e) return null;
                                t = new n(e);
                            }
                            return t;
                        }),
                        (this.previous = function () {
                            var t = this;
                            if (t.x > 0) return { month: t.month, x: t.x - 1, y: t.y };
                            i.months[t.month];
                            if (t.y > 0) return { month: t.month, x: 6, y: t.y - 1 };
                            if (t.month > 0) {
                                var e = i.months[t.month - 1];
                                return { month: t.month - 1, x: 6, y: e.rowCount - 1 };
                            }
                            return null;
                        }),
                        (this.previousVisible = function () {
                            for (var t = this; !t.visible(); ) {
                                var e = t.previous();
                                if (!e) return null;
                                t = new n(e);
                            }
                            return t;
                        }),
                        (this.cell = function () {
                            return i.months[this.month].cells[this.x][this.y];
                        }),
                        (this.date = function () {
                            return this.cell().day;
                        }),
                        (this.before = function (t) {
                            return this.date() < new n(t).date();
                        });
                };
                (this.p = function (t) {
                    var e = this.parentNode,
                        s = this.parentNode.month,
                        n = this.x,
                        a = this.y,
                        l = s.cells[n][a].day;
                    if (s.cells[n][a].isClickable) {
                        i.clearSelection(), (i.selectionDay = l);
                        var l = i.selectionDay;
                        switch (i.n()) {
                            case "none":
                                (i.selectionStart = l), (i.selectionEnd = l);
                                break;
                            case "day":
                                if (i.autoFocusOnClick) {
                                    var o = l;
                                    if (l < i.A() || l >= i.B()) return void i.select(l);
                                }
                                var h = s.cells[n][a];
                                i.q(e, n, a), i.selected.push(h), (i.selectionStart = h.day), (i.selectionEnd = h.day);
                                break;
                            case "week":
                                if (i.autoFocusOnClick) {
                                    var o = s.cells[0][a].day,
                                        r = s.cells[6][a].day;
                                    if (o.firstDayOfMonth() === r.firstDayOfMonth() && (o < i.A() || r >= i.B())) return void i.select(l);
                                }
                                for (var c = 0; c < 7; c++) i.q(e, c, a), i.selected.push(s.cells[c][a]);
                                (i.selectionStart = s.cells[0][a].day), (i.selectionEnd = s.cells[6][a].day);
                                break;
                            case "month":
                                if (i.autoFocusOnClick) {
                                    var o = l;
                                    if (l < i.A() || l >= i.B()) return void i.select(l);
                                }
                                for (var o = null, r = null, a = 0; a < 6; a++)
                                    for (var n = 0; n < 7; n++) {
                                        var h = s.cells[n][a];
                                        h && h.day.getYear() === l.getYear() && h.day.getMonth() === l.getMonth() && (i.q(e, n, a), i.selected.push(h), null === o && (o = h.day), (r = h.day));
                                    }
                                (i.selectionStart = o), (i.selectionEnd = r);
                                break;
                            default:
                                throw "unknown selectMode";
                        }
                        i.t(), i.D();
                    }
                }),
                    (this.D = function (t) {
                        var e = i.selectionStart,
                            s = i.selectionEnd.addDays(1),
                            n = DayPilot.DateUtil.daysDiff(e, s),
                            a = i.selectionDay;
                        if (((t = t || {}), i.e())) {
                            var l = {};
                            if (
                                ((l.start = e),
                                    (l.end = s),
                                    (l.day = a),
                                    (l.days = n),
                                    (l.mode = t.mode || i.selectMode),
                                    (l.preventDefault = function () {
                                        this.preventDefault.value = !0;
                                    }),
                                "function" == typeof i.onTimeRangeSelect && (i.onTimeRangeSelect(l), l.preventDefault.value))
                            )
                                return;
                            switch (i.timeRangeSelectedHandling) {
                                case "Bind":
                                    if ("object" == typeof bound) {
                                        var o = {};
                                        (o.start = e), (o.end = s), (o.days = n), (o.day = a), bound.commandCallBack(i.command, o);
                                    }
                                    break;
                                case "None":
                                    break;
                                case "PostBack":
                                    i.timeRangeSelectedPostBack(e, s, a);
                            }
                            "function" == typeof i.onTimeRangeSelected && i.onTimeRangeSelected(l);
                        } else
                            switch (i.timeRangeSelectedHandling) {
                                case "Bind":
                                    if ("object" == typeof bound) {
                                        var o = {};
                                        (o.start = e), (o.end = s), (o.days = n), (o.day = a), bound.commandCallBack(i.command, o);
                                    }
                                    break;
                                case "JavaScript":
                                    i.onTimeRangeSelected(e, s, a);
                                    break;
                                case "None":
                                    break;
                                case "PostBack":
                                    i.timeRangeSelectedPostBack(e, s, a);
                            }
                    }),
                    (this.timeRangeSelectedPostBack = function (t, e, i, s) {
                        var n = {};
                        (n.start = t), (n.end = e), (n.day = s), this.R("TimeRangeSelected", i, n);
                    }),
                    (this.k = function (t) {
                        i.Y(i.skipMonths);
                    }),
                    (this.j = function (t) {
                        i.Y(-i.skipMonths);
                    }),
                    (this.Y = function (t) {
                        (this.startDate = this.startDate.addMonths(t)), this.f(), this.b(), this.C(), this.t(), this.E(), this.s();
                    }),
                    (this.A = function () {
                        return i.startDate.firstDayOfMonth();
                    }),
                    (this.B = function () {
                        return i.startDate.firstDayOfMonth().addMonths(this.showMonths);
                    }),
                    (this.visibleStart = function () {
                        return i.startDate.firstDayOfMonth().firstDayOfWeek(a.weekStarts());
                    }),
                    (this.visibleEnd = function () {
                        return i.startDate
                            .firstDayOfMonth()
                            .addMonths(this.showMonths - 1)
                            .firstDayOfWeek(a.weekStarts())
                            .addDays(42);
                    }),
                    (this.E = function () {
                        var t = this.visibleStart(),
                            e = this.visibleEnd();
                        if (i.e()) {
                            var s = {};
                            if (
                                ((s.start = t),
                                    (s.end = e),
                                    (s.preventDefault = function () {
                                        this.preventDefault.value = !0;
                                    }),
                                "function" == typeof i.onVisibleRangeChange && (i.onVisibleRangeChange(s), s.preventDefault.value))
                            )
                                return;
                            switch (this.visibleRangeChangedHandling) {
                                case "CallBack":
                                    this.visibleRangeChangedCallBack(null);
                                    break;
                                case "PostBack":
                                    this.visibleRangeChangedPostBack(null);
                                    break;
                                case "Disabled":
                            }
                            "function" == typeof i.onVisibleRangeChanged && i.onVisibleRangeChanged(s);
                        } else
                            switch (this.visibleRangeChangedHandling) {
                                case "CallBack":
                                    this.visibleRangeChangedCallBack(null);
                                    break;
                                case "PostBack":
                                    this.visibleRangeChangedPostBack(null);
                                    break;
                                case "JavaScript":
                                    this.onVisibleRangeChanged(t, e);
                                    break;
                                case "Disabled":
                            }
                    }),
                    (this.visibleRangeChangedCallBack = function (t) {
                        var e = {};
                        this.M("Visible", t, e);
                    }),
                    (this.visibleRangeChangedPostBack = function (t) {
                        var e = {};
                        this.R("Visible", t, e);
                    }),
                    (this.Q = function (t, e) {
                        var t = JSON.parse(t);
                        (i.items = t.Items), (i.cells = t.Cells), i.cells ? i.update() : i.s();
                    }),
                    (this.C = function () {
                        for (var t = 0; t < this.showMonths; t++) {
                            var e = this.Z(t);
                            this.i(t, e);
                        }
                        (this.root.style.height = this.$() + "px"),
                            (this.nav.preselection = document.createElement("div")),
                            (this.nav.preselection.style.position = "absolute"),
                            (this.nav.preselection.style.left = "0px"),
                            (this.nav.preselection.style.top = "0px"),
                            this.root.appendChild(this.nav.preselection);
                    }),
                    (this.$ = function () {
                        if ("Horizontal" === this.orientation) {
                            for (var t = 0, e = 0; e < this.months.length; e++) {
                                var i = this.months[e];
                                i.height > t && (t = i.height);
                            }
                            return t;
                        }
                        for (var s = 0, e = 0; e < this.months.length; e++) {
                            var i = this.months[e];
                            s += i.height;
                        }
                        return s;
                    }),
                    (this.Z = function (t) {
                        if (this.internal.showLinks) return this.internal.showLinks;
                        var e = {};
                        return (e.left = 0 === t), (e.right = 0 === t), (e.before = 0 === t), (e.after = t === this.showMonths - 1), "Horizontal" === this.orientation && (e.right = t === this.showMonths - 1), e;
                    }),
                    (this._ = {}),
                    (this._.scope = null),
                    (this._.notify = function () {
                        i._.scope && i._.scope["$apply"]();
                    }),
                    (this.internal = {}),
                    (this.internal.initialized = function () {
                        return i.z;
                    }),
                    (this.aa = {});
                var a = this.aa;
                (a.locale = function () {
                    return DayPilot.Locale.find(i.locale);
                }),
                    (a.weekStarts = function () {
                        if ("Auto" === i.weekStarts) {
                            var t = a.locale();
                            return t ? t.weekStarts : 0;
                        }
                        return i.weekStarts;
                    }),
                    (a.cellWidth = function () {
                        if (i.a.cellWidth) return i.a.cellWidth;
                        var t = i.ba("_cell_dimensions").width;
                        return t || (t = i.cellWidth), (i.a.cellWidth = t), t;
                    }),
                    (this.clearSelection = function () {
                        for (var t = 0; t < this.selected.length; t++) {
                            var e = this.selected[t];
                            i.r(e.parentNode, e.x, e.y);
                        }
                        this.selected = [];
                    }),
                    (this.ca = function () {
                        return !!this.backendUrl && ("undefined" == typeof i.items || !i.items);
                    }),
                    (this.events = {}),
                    (this.J = function () {
                        if (DayPilot.isArray(this.events.list)) {
                            this.items = {};
                            for (var t = 0; t < this.events.list.length; t++) {
                                var e = this.events.list[t];
                                if (!e.hidden) {
                                    var i = this.da(e);
                                    for (var s in i) this.items[s] = 1;
                                }
                            }
                        }
                    }),
                    (this.ba = function (t) {
                        var e = document.createElement("div");
                        (e.style.position = "absolute"), (e.style.top = "-2000px"), (e.style.left = "-2000px"), (e.className = this.c(t));
                        var s = i.root || document.body;
                        s.appendChild(e);
                        var n = e.offsetHeight,
                            a = e.offsetWidth;
                        s.removeChild(e);
                        var l = {};
                        return (l.height = n), (l.width = a), l;
                    }),
                    (this.da = function (t) {
                        for (var e = new DayPilot.Date(t.start), i = new DayPilot.Date(t.end), s = {}, n = e.getDatePart(); n.getTime() < i.getTime(); ) (s[n.toStringSortable()] = 1), (n = n.addDays(1));
                        return s;
                    }),
                    (this.show = function () {
                        (i.visible = !0), (i.root.style.display = "");
                    }),
                    (this.hide = function () {
                        (i.visible = !1), (i.root.style.display = "none");
                    }),
                    (this.ea = function () {
                        if (this.id && this.id.tagName) this.nav.top = this.id;
                        else {
                            if ("string" != typeof this.id) throw "DayPilot.Navigator() constructor requires the target element or its ID as a parameter";
                            if (((this.nav.top = document.getElementById(this.id)), !this.nav.top)) throw "DayPilot.Navigator: The placeholder element not found: '" + t + "'.";
                        }
                        this.root = this.nav.top;
                    }),
                    (this.init = function () {
                        if ((this.ea(), !this.root.dp)) {
                            this.u(), this.b(), this.C(), this.J(), this.s(), this.fa(), this.ga(), this.ha();
                            if ((this.ca() && this.E(), (this.z = !0), this.L(), this.w)) {
                                var t = this.w;
                                this.select(t.date1, t.date2, t.options), (this.w = null);
                            }
                            return this;
                        }
                    }),
                    (this.ga = function () {
                        (i.nav.top.onmousedown = this.V), (i.nav.top.onmousemove = this.W);
                    }),
                    (this.ha = function () {
                        DayPilot.re(document, "mouseup", i.ia);
                    }),
                    (this.ia = function (t) {
                        if (s.start && s.end) {
                            var e = DayPilot.mo3(i.nav.top, t);
                            if (e.x === s.start.coords.x && e.y === s.start.coords.y) return (s.start = null), void s.clear();
                            s.clear();
                            var a = s.ordered();
                            (a.start = new n(a.start).nextVisible()),
                                (a.end = new n(a.end).previousVisible()),
                                (i.selectionDay = new n(a.start).date()),
                                (i.selectionStart = i.selectionDay),
                                (i.selectionEnd = new n(a.end).date()),
                                (s.start = null),
                                (s.end = null),
                                i.f(),
                                i.b(),
                                i.C(),
                                i.s(),
                                i.t();
                            i.D({ mode: "FreeHand" });
                        }
                        (s.start = null), (s.end = null);
                    }),
                    (this.dispose = function () {
                        var t = i;
                        t.root && (t.root.removeAttribute("style"), t.root.removeAttribute("class"), (t.root.dp = null), (t.root.innerHTML = null), (t.root = null));
                    }),
                    (this.fa = function () {
                        this.root.dispose = this.dispose;
                    }),
                    (this.Init = this.init),
                    this.H(e);
            }),
            "undefined" != typeof jQuery &&
            !(function (t) {
                t.fn.daypilotNavigator = function (t) {
                    var e = null,
                        i = this.each(function () {
                            if (!this.daypilot) {
                                var i = new DayPilot.Navigator(this.id);
                                this.daypilot = i;
                                for (var s in t) i[s] = t[s];
                                i.Init(), e || (e = i);
                            }
                        });
                    return 1 === this.length ? e : i;
                };
            })(jQuery),
                (function () {
                    var t = DayPilot.am();
                    t &&
                    t.directive("daypilotNavigator", [
                        "$parse",
                        function (t) {
                            return {
                                restrict: "E",
                                template: "<div id='{{id}}'></div>",
                                compile: function (e, i) {
                                    return (
                                        e.replaceWith(this["template"].replace("{{id}}", i["id"])),
                                            function (e, i, s) {
                                                var n = new DayPilot.Navigator(i[0]);
                                                (n._.scope = e), n.init();
                                                var a = s["id"];
                                                a && (e[a] = n);
                                                var l = s["publishAs"];
                                                if (l) {
                                                    (0, t(l).assign)(e, n);
                                                }
                                                for (var o in s)
                                                    if (0 === o.indexOf("on")) {
                                                        var h = DayPilot.Util.shouldApply(o);
                                                        h
                                                            ? !(function (i) {
                                                                n[i] = function (n) {
                                                                    var a = t(s[i]);
                                                                    e["$apply"](function () {
                                                                        a(e, { args: n });
                                                                    });
                                                                };
                                                            })(o)
                                                            : !(function (i) {
                                                                n[i] = function (n) {
                                                                    t(s[i])(e, { args: n });
                                                                };
                                                            })(o);
                                                    }
                                                var r = e["$watch"],
                                                    c = s["config"] || s["daypilotConfig"],
                                                    d = s["events"] || s["daypilotEvents"];
                                                r.call(
                                                    e,
                                                    c,
                                                    function (t, e) {
                                                        for (var i in t) n[i] = t[i];
                                                        n.update();
                                                    },
                                                    !0
                                                ),
                                                    r.call(
                                                        e,
                                                        d,
                                                        function (t) {
                                                            (n.events.list = t), n.J(), n.s();
                                                        },
                                                        !0
                                                    );
                                            }
                                    );
                                },
                            };
                        },
                    ]);
                })(),
            "undefined" != typeof Sys && Sys.Application && Sys.Application.notifyScriptLoaded && Sys.Application.notifyScriptLoaded();
        }
    })();
