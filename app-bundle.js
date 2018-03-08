!
function(e) {
    e.babelHelpers = {}
} ("undefined" == typeof global ? self: global),
function(e, t, n) {
    "use strict";
    n.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }),
    window.__axtr = e.identity,
    e.module("WVS", ["ng", "ngAnimate", "ngAria", "ngMessages", "ngSanitize", "ajoslin.promise-tracker", "gettext", "LocalStorageModule", "ngclipboard", "nvd3", "toastr", "treeControl", "ui.router", "ui.bootstrap", "ui.bootstrap-slider", "ui.grid", "ui.grid.autoResize", "ui.grid.resizeColumns", "ui.grid.infiniteScroll", "ui.grid.saveState", "ui.grid.selection", "ui.grid.treeView", "ui.select"]),
    Array.prototype.find || (Array.prototype.find = function(e) {
        if (null === this) throw new TypeError("Array.prototype.find called on null or undefined");
        if ("function" != typeof e) throw new TypeError("predicate must be a function");
        for (var t, n = Object(this), r = n.length >>> 0, i = arguments[1], o = 0; o < r; o++) if (t = n[o], e.call(i, t, o, n)) return t
    }),
    Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function() {
            function e(e) {
                if (null == this) throw new TypeError('"this" is null or not defined');
                var t = Object(this),
                n = t.length >>> 0;
                if ("function" != typeof e) throw new TypeError("predicate must be a function");
                for (var r = arguments[1], i = 0; i < n;) {
                    var o = t[i];
                    if (e.call(r, o, i, t)) return i;
                    i++
                }
                return - 1
            }
            return e
        } ()
    });
    var r = /(DTSTART=[0-9]{8}T[0-9]{6}Z)/,
    i = /(DTSTART):([0-9]{8}T[0-9]{6}Z)/;
    t.axConversions = {
        rfc3339ToPy: function() {
            function e(e) {
                if (e) {
                    var t = r.exec(e);
                    if (t) return t[1].replace("=", ":") + "\n" + e.replace(r, "").replace(/;+/gm, ";").replace(/^;|;$/gm, "")
                }
                return ""
            }
            return e
        } (),
        pyToRfc3339: function() {
            function n(n) {
                try {
                    if (n) {
                        var r = n.replace(i, "$1=$2").replace(/[\n]/gm, ";"),
                        o = t.fromString(r).toText();
                        return e.uppercase(o[0]) + o.substr(1)
                    }
                    return ""
                } catch(e) {}
                return n
            }
            return n
        } (),
        pyToRRULE: function() {
            function e(e) {
                try {
                    if (e) {
                        var n = e.replace(i, "$1=$2").replace(/[\n]/gm, ";");
                        return t.fromString(n)
                    }
                    return null
                } catch(e) {}
                return null
            }
            return e
        } ()
    }
} (angular, RRule, jQuery),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c) {
        function u(r) {
            if (n.authConfig.enabled && t.get(n, "uiForms.authForm.$invalid", !1)) return ! 1;
            if (n.certificateSection.enabled && t.get(n, "uiForms.certForm.$invalid", !1)) return ! 1;
            if (n.proxySettings.enabled && t.get(n, "uiForms.proxyForm.$invalid", !1)) return ! 1;
            if ("auth" === t.defaultTo(r, "auth")) {
                var i = t.curryRight(t.pick, 2)(["enabled", "username", "password"]);
                if (n.authConfig.enabled && c.config.authentication.enabled && !e.equals(i(n.authConfig), i(c.config.authentication))) return ! 0;
                if (n.authConfig.enabled !== c.config.authentication.enabled) return ! 0
            }
            if ("cert" === t.defaultTo(r, "cert")) {
                var i = function(e) {
                    return t.pick(t.defaultTo(e, {}), ["uploadId", "name", "totalBytes", "uploadedBytes", "status"])
                };
                if (!e.equals(n.certificateSection.enabled, !!c.clientCertificate)) return ! 0;
                if (n.certificateSection.enabled) {
                    if (!e.equals(i(n.certConfig.certificate), i(c.clientCertificate))) return ! 0;
                    if (n.certConfig.password !== c.config.clientCertificatePassword) return ! 0
                }
            }
            if ("proxy" === t.defaultTo(r, "proxy")) {
                var o = function(e) {
                    var n = t.pick(e, ["protocol", "address", "username", "password", "port"]);
                    return n.authRequired = !!t.defaultTo(e.authRequired, n.username),
                    n
                };
                if (n.proxySettings.enabled && t.get(c, "config.proxy.enabled", !1) && !e.equals(o(c.config.proxy), o(n.proxySettings))) return ! 0;
                if (n.proxySettings.enabled !== t.get(c, "config.proxy.enabled", !1)) return ! 0
            }
            return ! 1
        }

        function l(e) {
            void 0 === e && (e = !0);
            var t = n.loadingTracker.createPromise();
            return r.when().then(function() {
                return u("auth") ? p() : void 0
            }).then(function() {
                return u("cert") ? f() : void 0
            }).then(function() {
                return u("proxy") ? h() : void 0
            }).then(function() {
                return n.notifyTargetUpdated()
            }).then(function() {
                return e ? n.reloadSection() : void 0
            }).
            finally(t.resolve)
        }

        function d(e, t) {
            u() && (t.cancel = !0, n.askSaveChanges().
            catch(function(e) {
                return "no" === e && n.changeSection(t.next),
                r.reject()
            }).then(function() {
                return l(!1)
            }).then(function() {
                n.changeSection(t.next)
            }))
        }

        function p() {
            var e = n.authConfig,
            t = e.enabled,
            r = e.username,
            i = e.password,
            o = {
                authentication: {
                    enabled: t,
                    username: r,
                    password: i
                }
            };
            return s.configureTarget(c.target.targetId, o, {
                tracker: n.loadingTracker,
                onRetry: function() {
                    function e() {
                        return l()
                    }
                    return e
                } ()
            })
        }

        function f() {
            return r.when().then(function() {
                if (n.certConfig.password !== c.config.clientCertificatePassword || !n.certificateSection.enabled && c.clientCertificate) {
                    var e = {
                        clientCertificatePassword: n.certificateSection.enabled ? n.certConfig.password: ""
                    };
                    return s.configureTarget(c.target.targetId, e, {
                        tracker: n.loadingTracker,
                        onRetry: function() {
                            function e() {
                                return l()
                            }
                            return e
                        } ()
                    })
                }
            }).then(function() {
                if (!n.certificateSection.enabled && c.clientCertificate || n.certificateSection.enabled && null === n.certConfig.certificate) return s.deleteClientCertificate(c.target.targetId, {
                    tracker: n.loadingTracker,
                    onRetry: function() {
                        function e() {
                            return l()
                        }
                        return e
                    } ()
                })
            }).then(function() {
                if (n.certConfig.certificate && n.certConfig.certificate.nativeFileUpload) return r.when().then(function() {
                    if (!n.certConfig.certificate.uploadURL) {
                        var e = {
                            name: n.certConfig.certificate.name,
                            size: n.certConfig.certificate.totalBytes
                        };
                        return s.setClientCertificate(c.target.targetId, e.name, e.size, {
                            tracker: n.loadingTracker,
                            onRetry: function() {
                                function e() {
                                    return l()
                                }
                                return e
                            } ()
                        }).then(function(e) {
                            n.certConfig.certificate.uploadURL = e
                        })
                    }
                }).
                catch(function(e) {
                    return n.certConfig.certificate.uploadURL = null,
                    r.reject(e)
                }).then(function() {
                    return g(n.certConfig.certificate.uploadURL, n.certConfig.certificate.nativeFileUpload)
                }).then(function() {
                    n.certConfig.certificate.nativeFileUpload = null,
                    n.certConfig.certificate.uploadURL = null
                })
            })
        }

        function g(s, c) {
            return r.when().then(function() {
                n.certificateSection.uploadingCertificate = !0
            }).then(function() {
                return o.upload(s, c, n.certConfig.certificate.uploadedBytes, t.clamp(n.certConfig.certificate.totalBytes / 1024, 30, 3600))
            }).then(r.resolve, r.reject,
            function(e) {
                n.certConfig.certificate.uploadedBytes = e.uploadedBytes,
                n.certConfig.certificate.totalBytes = e.totalBytes
            }).then(function() {
                if (n.certConfig.certificate.status = n.certConfig.certificate.uploadedBytes === n.certConfig.certificate.totalBytes, !n.certConfig.certificate.status) {
                    var e = {
                        errorMessage: a("客户端证书尚未完全上传."),
                        onRetry: function() {
                            function e() {
                                return l()
                            }
                            return e
                        } ()
                    };
                    return i.$emit("axError", e),
                    r.reject(e)
                }
            }).
            catch(function(t) {
                return n.certConfig.certificate.status = void 0,
                n.certConfig.certificate.uploadURL = null,
                n.certConfig.certificate.uploadedBytes = 0,
                t.errorMessage || (t.errorMessage = a("客户端证书尚未完全上传.")),
                i.$emit("axError", e.extend({
                    onRetry: function() {
                        function e() {
                            return l()
                        }
                        return e
                    } ()
                },
                t)),
                r.reject(t)
            }).
            finally(function() {
                n.certificateSection.uploadingCertificate = !1
            })
        }

        function h() {
            var e = n.proxySettings,
            t = null;
            return e.enabled && "none" !== e.protocol && (t = {
                protocol: e.protocol,
                enabled: !0,
                address: e.address,
                port: parseInt(e.port, 10)
            },
            e.authRequired && (t.username = e.username, t.password = e.password)),
            s.configureTarget(c.target.targetId, {
                proxy: t
            },
            {
                tracker: n.loadingTracker,
                onRetry: function() {
                    function e() {
                        return l()
                    }
                    return e
                } ()
            })
        }
        n.certificateSection = {
            enabled: !!c.clientCertificate,
            uploadingCertificate: !1,
            onEnabledChanged: function() {
                function e() {
                    var e = n.uiForms.certForm;
                    if (e) if (n.certificateSection.enabled) {
                        var t = n.certConfig,
                        r = t.password,
                        i = t.retypePassword; (r || i) && (e.password.$setTouched(), e.retypePassword.$setTouched())
                    } else e.$setUntouched(),
                    e.password.$setUntouched(),
                    e.retypePassword.$setUntouched()
                }
                return e
            } (),
            onCertificateSelected: function() {
                function e(e) {
                    n.certConfig.certificate = e
                }
                return e
            } (),
            onCertificateRemoved: function() {
                function e() {
                    n.certConfig.certificate = null
                }
                return e
            } ()
        },
        n.httpSection = {
            onEnabledChanged: function() {
                function e() {
                    var e = n.uiForms.authForm;
                    if (e) if (n.authConfig.enabled) {
                        var t = n.authConfig,
                        r = t.username,
                        i = t.password,
                        o = t.retypePassword; (r || i || o) && (e.username.$setTouched(), e.password.$setTouched(), e.retypePassword.$setTouched())
                    } else e.$setUntouched(),
                    e.username.$setUntouched(),
                    e.password.$setUntouched(),
                    e.retypePassword.$setUntouched()
                }
                return e
            } ()
        },
        n.proxySection = {
            enabled: !1,
            protocolOptions: [{
                value: "http",
                text: a("HTTP")
            }],
            onEnableChanged: function() {
                function e() {
                    var e = n.uiForms.proxyForm;
                    if (e) if (n.proxySettings.enabled) {
                        var t = n.proxySettings,
                        r = t.address,
                        i = t.port,
                        o = t.username,
                        a = t.password,
                        s = t.retypePassword; (r || i || o || a || s) && (e.address.$setTouched(), e.port.$setTouched(), e.username.$setTouched(), e.password.$setTouched(), e.retypePassword.$setTouched())
                    } else e.$setUntouched(),
                    e.address.$setUntouched(),
                    e.port.$setUntouched(),
                    e.username.$setUntouched(),
                    e.password.$setUntouched(),
                    e.retypePassword.$setUntouched()
                }
                return e
            } ()
        },
        e.extend(n, {
            hasChanges: u,
            update: l
        }),
        n.$on("axSectionChanging", d),
        function() {
            n.authConfig = e.extend({
                enabled: !1,
                username: "",
                password: ""
            },
            c.config.authentication),
            n.authConfig.retypePassword = n.authConfig.password,
            n.certConfig = {
                certificate: e.copy(t.defaultTo(c.clientCertificate, {})),
                password: c.config.clientCertificatePassword,
                retypePassword: c.config.clientCertificatePassword
            },
            n.proxySettings = {
                enabled: !1,
                protocol: "http",
                address: "",
                port: "",
                username: "",
                password: "",
                retypePassword: ""
            },
            e.extend(n.proxySettings, c.config.proxy || {}),
            n.proxySettings.password && (n.proxySettings.retypePassword = n.proxySettings.password),
            n.proxySettings.authRequired = !!n.proxySettings.username
        } ()
    }
    n.$inject = ["$scope", "$q", "$rootScope", "axFileUploadService", "gettext", "TargetsApi", "targetInfo"],
    e.module("WVS").controller("axTargetHttpConfigCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, a, s, c, u, l, d, p, f, g, h, m, v, y, S) {
        function T(e) {
            if (t.get(n, "uiForms.generalForm.$invalid", !1)) return ! 1;
            if (n.siteLoginSection.enabled && "automatic" === n.siteLogin.kind && t.get(n, "uiForms.authForm.$invalid", !1)) return ! 1;
            if ("general" === t.defaultTo(e, "general")) {
                var r = t.curryRight(t.pick, 2)(["address", "description", "criticality", "continuousMode"]);
                if (!o(r(n.target), r(y.target))) return ! 0
            }
            if ("siteLogin" === t.defaultTo(e, "siteLogin")) {
                if (y.config.login.kind !== n.siteLogin.kind) return ! 0;
                if ("automatic" === y.config.login.kind) {
                    var r = t.curryRight(t.pick, 2)(["enabled", "username", "password"]);
                    if (!o(r(n.siteLogin.credentials), r(y.config.login.credentials))) return ! 0
                } else if ("sequence" === y.config.login.kind) {
                    var r = function(e) {
                        return t.pick(t.defaultTo(e, {}), ["uploadId", "name", "totalBytes", "uploadedBytes", "status"])
                    };
                    if (!o(r(n.siteLogin.sequence), r(y.loginSequence))) return ! 0
                }
            }
            if ("acuSensor" === t.defaultTo(e, "acuSensor") && n.acuSensor.enabled !== y.config.sensor) return ! 0;
            if ("scanSpeed" === t.defaultTo(e, "scanSpeed")) {
                var i = t.get(l.SCAN_SPEED.find(function(e) {
                    return e.numericValue === n.config.scanSpeed
                }), "value", "fast");
                if (!o(i, y.config.scanSpeed)) return ! 0
            }
            var r, r;
            return ! 1
        }

        function x(e) {
            void 0 === e && (e = !0);
            var t = n.loadingTracker.createPromise();
            return c.when().then(function() {
                return T("general") ? C() : void 0
            }).then(function() {
                return T("siteLogin") ? I() : void 0
            }).then(function() {
                return L()
            }).then(function() {
                return n.notifyTargetUpdated()
            }).then(function() {
                return e ? n.reloadSection() : void 0
            }).
            finally(t.resolve)
        }

        function b(t) {
            e.element("#download-helper").attr("src", "/api/v1/targets/sensors/" + encodeURIComponent(t) + "/" + encodeURIComponent(y.config.sensorSecret))
        }

        function _(e, t) {
            T() && (t.cancel = !0, n.askSaveChanges().
            catch(function(e) {
                return "no" === e && n.changeSection(t.next),
                c.reject()
            }).then(function() {
                return x(!1)
            }).then(function() {
                n.changeSection(t.next)
            }))
        }

        function C() {
            return S.updateTarget(n.target.targetId, n.target, {
                tracker: n.loadingTracker
            }).then(function() { ! 0 === g.hasFeature("continuous_scans") && n.target.continuousMode !== y.target.continuousMode && w()
            })
        }

        function w() {
            return S.setContinuousScanStatus(n.target.targetId, n.target.continuousMode, {
                tracker: n.loadingTracker
            }).then(function(e) {
                n.target.continuousMode = e
            })
        }

        function I() {
            var e = function(e, t) {
                return S.configureTarget(n.target.targetId, {
                    login: {
                        kind: e,
                        credentials: t
                    }
                },
                {
                    tracker: n.loadingTracker
                })
            };
            return c.when().then(function() {
                if ("sequence" !== n.siteLogin.kind && y.loginSequence || null === n.siteLogin.sequence && y.loginSequence) return k().then(function() {
                    return e("none")
                })
            }).then(function() {
                return "sequence" === n.siteLogin.kind ? c.when().then(function() {
                    if (n.siteLogin.sequence && n.siteLogin.sequence.nativeFileUpload) return c.when().then(function() {
                        if (!n.siteLogin.sequence.uploadURL) {
                            var e = {
                                name: n.siteLogin.sequence.name,
                                size: n.siteLogin.sequence.totalBytes
                            };
                            return S.setLoginSequence(n.target.targetId, e.name, e.size, {
                                tracker: n.loadingTracker
                            }).then(function(e) {
                                n.siteLogin.sequence.uploadURL = e
                            })
                        }
                    }).then(function() {
                        return A(n.siteLogin.sequence.uploadURL, n.siteLogin.sequence.nativeFileUpload)
                    }).then(function() {
                        n.siteLogin.sequence.nativeFileUpload = null,
                        n.siteLogin.sequence.uploadURL = null
                    })
                }).then(function() {
                    return e(n.siteLogin.sequence ? "sequence": "none")
                }) : "automatic" === n.siteLogin.kind ? e("automatic", n.siteLogin.credentials) : "none" === n.siteLogin.kind ? e("none") : void 0
            })
        }

        function k() {
            return S.deleteLoginSequence(n.target.targetId, {
                tracker: n.loadingTracker
            })
        }

        function A(e, r) {
            return c.when().then(function() {
                n.siteLoginSection.uploadingLoginSequence = !0
            }).then(function() {
                return p.upload(e, r, n.siteLogin.sequence.uploadedBytes, t.clamp(n.siteLogin.sequence.totalBytes / 1024, 30, 3600))
            }).then(c.resolve, c.reject,
            function(e) {
                n.siteLogin.sequence.uploadedBytes = e.uploadedBytes,
                n.siteLogin.sequence.totalBytes = e.totalBytes
            }).then(function() {
                if (n.siteLogin.sequence.status = n.siteLogin.sequence.uploadedBytes === n.siteLogin.sequence.totalBytes, !n.siteLogin.sequence.status) {
                    var e = {
                        errorMessage: h("登录序列尚未完全上传.")
                    };
                    return u.$emit("axError", e),
                    c.reject(e)
                }
            }).
            catch(function(e) {
                return n.siteLogin.sequence.status = void 0,
                n.siteLogin.sequence.uploadURL = null,
                n.siteLogin.sequence.uploadedBytes = 0,
                e.errorMessage || (e.errorMessage = h("登录序列尚未完全上传.")),
                u.$emit("axError", e),
                c.reject(e)
            }).
            finally(function() {
                n.siteLoginSection.uploadingLoginSequence = !1
            })
        }

        function L() {
            var e = {};
            if (T("acuSensor") && (e.sensor = n.acuSensor.enabled), T("scanSpeed") && (e.scanSpeed = t.get(l.SCAN_SPEED.find(function(e) {
                return e.numericValue === n.config.scanSpeed
            }), "value", "fast")), Object.keys(e).length > 0) return S.configureTarget(n.target.targetId, e, {
                tracker: n.loadingTracker
            })
        }
        n.criticalityOptions = l.BUSINESS_CRITICALITY.map(function(e) {
            return {
                text: e.text,
                value: parseInt(e.value, 10)
            }
        }),
        n.scanSpeedOptions = {
            ticks: l.SCAN_SPEED.map(function(e) {
                return e.numericValue
            }),
            ticksLabels: l.SCAN_SPEED.map(function(e) {
                return e.text
            })
        },
        n.siteLoginSection = {
            enabled: "none" !== y.config.login.kind,
            uploadingLoginSequence: !1,
            lsrLink: null,
            lsDataURL: null,
            lsqFileName: null,
            onEnabledChanged: function() {
                function e() {
                    var e = n.uiForms,
                    t = e.authForm,
                    r = e.sequenceForm;
                    if (n.siteLoginSection.enabled) {
                        if (n.siteLogin.kind = "none" !== y.config.login.kind ? y.config.login.kind: "automatic", t && "automatic" === n.siteLogin.kind) {
                            var i = n.siteLogin.credentials,
                            o = i.username,
                            a = i.password,
                            s = i.retypePassword; (o || a || s) && (t.username.$setTouched(), t.password.$setTouched(), t.retypePassword.$setTouched())
                        }
                    } else t && t.$setUntouched(),
                    r && r.$setUntouched(),
                    n.siteLogin.kind = "none"
                }
                return e
            } (),
            onSequenceSelected: function() {
                function e(e) {
                    n.siteLogin.sequence = e
                }
                return e
            } (),
            onSequenceRemoved: function() {
                function e() {
                    n.siteLogin.sequence = null
                }
                return e
            } (),
            onDownloadLoginSequence: function() {
                function t() {
                    try {
                        if (a.find(".axLoginSequenceDownloadHack").length > 0) return void a.find(".axLoginSequenceDownloadHack").get(0).click()
                    } catch(e) {
                        return
                    }
                    S.getLoginSequenceContents(y.target.targetId, {
                        noPublishError: !0
                    }).then(function(t) {
                        if (t) {
                            n.siteLoginSection.lsDataURL = "data:text/plain;base64," + btoa(t.contents),
                            n.siteLoginSection.lsqFileName = t.filename;
                            try {
                                e.element('<a class="axLoginSequenceDownloadHack"></a>').attr("download", t.filename).attr("href", n.siteLoginSection.lsDataURL).appendTo(a).hide().get(0).click()
                            } catch(e) {}
                        }
                    })
                }
                return t
            } ()
        };
        i(n, {
            hasChanges: T,
            update: x,
            downloadSensor: b
        }),
        n.$on("axSectionChanging", _),
        function() {
            n.target = t.pick(y.target, ["targetId", "address", "description", "criticality", "continuousMode", "scansRequireMI", "targetType"]),
            n.config = {
                scanSpeed: t.get(l.SCAN_SPEED.find(function(e) {
                    return e.value === y.config.scanSpeed
                }), "numericValue", 4)
            },
            y.testWebsite && (n.testWebsite = y.testWebsite);
            var e = y.target.address,
            o = /^(https?:\/\/)/;
            if (o.test(e) || (e = "http://" + e), t.get(y, "config.authentication.enabled", !1)) {
                var a = y.config.authentication;
                e = e.replace(o, "$1" + encodeURIComponent(a.username) + ":" + encodeURIComponent(a.password) + "@")
            }
            if (y.config.proxy && y.config.proxy.enabled) {
                var s = void 0,
                c = y.config.proxy,
                u = c.address,
                d = c.protocol,
                p = c.port,
                f = c.username,
                g = c.password;
                s = f ? d + "://" + encodeURIComponent(f) + ":" + encodeURIComponent(g) + "@" + u + ":" + p: d + "://" + u + ":" + p,
                n.siteLoginSection.lsrLink = "awvs://loginsequence/record?url=" + encodeURIComponent(e) + "&proxy=" + encodeURIComponent(s)
            } else n.siteLoginSection.lsrLink = "awvs://loginsequence/record?url=" + encodeURIComponent(e);
            switch (n.siteLogin = {
                kind: y.config.login.kind,
                credentials: {
                    enabled: !0,
                    username: "",
                    password: "",
                    retypePassword: ""
                },
                sequence: null
            },
            n.siteLogin.kind) {
            case "automatic":
                i(n.siteLogin.credentials, t.pick(t.defaultTo(y.config.login.credentials, {}), ["enabled", "username", "password"])),
                n.siteLogin.credentials.retypePassword = n.siteLogin.credentials.password;
                break;
            case "sequence":
                n.siteLogin.sequence = r(y.loginSequence)
            }
            n.acuSensor = {
                enabled: y.config.sensor
            },
            n.$watch(function() {
                return n.siteLogin.kind
            },
            function(e) {
                n.siteLoginSection.enabled = "none" !== e
            })
        } ()
    }
    var r = e.copy,
    i = e.extend,
    o = e.equals;
    n.$inject = ["$scope", "$element", "$interval", "$q", "$rootScope", "axConstant", "axEscapeHtmlFilter", "axFileUploadService", "axGeneralModal", "CurrentUser", "gettext", "promiseTracker", "SystemConfigApi", "targetInfo", "TargetsApi"],
    e.module("WVS").controller("axTargetGeneralConfigCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l) {
        function d(r) {
            if ("navigation" === t.defaultTo(r, "navigation")) {
                var i = t.curryRight(t.pick, 2)(["caseSensitive", "excludedPaths", "limitCrawlerScope", "userAgent"]);
                if (!e.equals(i(n.navigation), i(l.config))) return ! 0
            }
            return ! ("imports" !== t.defaultTo(r, "imports") || !n.imports.files.find(function(e) {
                return e.$$add || e.$$delete
            }))
        }

        function p(e) {
            void 0 === e && (e = !0);
            var t = n.loadingTracker.createPromise();
            return i.when().then(function() {
                return d("navigation") ? m() : void 0
            }).then(function() {
                return d("imports") ? y() : void 0
            }).then(function() {
                return n.notifyTargetUpdated()
            }).then(function() {
                return e ? n.reloadSection() : void 0
            }).
            finally(t.resolve)
        }

        function f(e) {
            var t = n.navigation.excludedPaths.indexOf(e);
            t > -1 && n.navigation.excludedPaths.splice(t, 1)
        }

        function g(e) {
            var t = n.navigationSection.excludedPattern;
            if (e && 27 === e.keyCode) return void(n.navigationSection.excludedPattern = "");
            t.length > 0 && (null === e ? (v(t), n.navigationSection.excludedPattern = "") : 13 == e.keyCode && t && (v(t), n.navigationSection.excludedPattern = ""))
        }

        function h(e, t) {
            d() && (t.cancel = !0, n.askSaveChanges().
            catch(function(e) {
                return "no" === e && n.changeSection(t.next),
                i.reject()
            }).then(function() {
                return p(!1)
            }).then(function() {
                n.changeSection(t.next)
            }))
        }

        function m() {
            var e = t.pick(n.navigation, ["limitCrawlerScope", "caseSensitive", "userAgent", "excludedPaths"]);
            return s.configureTarget(l.target.targetId, e, {
                tracker: n.loadingTracker,
                onRetry: function() {
                    function e() {
                        return p()
                    }
                    return e
                } ()
            })
        }

        function v(e) {
            var t = n.navigation.excludedPaths;
            t.indexOf(e) < 0 && t.unshift(e)
        }

        function y() {
            return i.when().then(function() {
                n.importsSection.pending = !0
            }).then(function() {
                return n.imports.files.filter(function(e) {
                    return e.$$delete
                }).reduce(function(e, t) {
                    return e.then(function() {
                        return s.deleteImportedFile(l.target.targetId, t.uploadId)
                    }).then(function() {
                        return n.imports.files.splice(n.imports.files.indexOf(t), 1)
                    })
                },
                i.when())
            }).then(function() {
                return n.imports.files.filter(function(e) {
                    return e.$$add
                }).reduce(function(e, t) {
                    return e.then(function() {
                        t.$$uploading = !0
                    }).then(function() {
                        if (!t.uploadURL) return s.importFile(l.target.targetId, t.name, t.totalBytes).then(function(e) {
                            t.uploadURL = e
                        })
                    }).then(function() {
                        return S(t.uploadURL, t.nativeFileUpload, t)
                    }).then(function() {
                        delete t.$$add
                    }).
                    catch(function(e) {
                        return i.reject(e)
                    }).
                    finally(function() {
                        t.$$uploading = !1
                    })
                },
                i.when())
            }).
            finally(function() {
                n.importsSection.pending = !1
            })
        }

        function S(n, o, s) {
            return i.when().then(function() {
                return s.$$uploading = !0,
                c.upload(n, o, s.uploadedBytes, t.clamp(s.totalBytes / 1024, 30, 3600))
            }).then(i.resolve, i.reject,
            function(e) {
                s.uploadedBytes = e.uploadedBytes,
                s.totalBytes = e.totalBytes
            }).then(function() {
                if (s.status = s.uploadedBytes === s.totalBytes, !s.status) {
                    var e = {
                        errorMessage: a.getString("文件{{name}}未成功上传", {
                            name: u(s.name)
                        }),
                        onRetry: function() {
                            function e() {
                                return p()
                            }
                            return e
                        } ()
                    };
                    return r.$emit("axError", e),
                    i.reject(e)
                }
            }).
            catch(function(t) {
                return s.status = void 0,
                s.uploadURL = null,
                s.uploadedBytes = 0,
                t.errorMessage || (t.errorMessage = a.getString("文件{{name}}未成功上传", {
                    name: u(s.name)
                })),
                r.$emit("axError", e.extend({
                    onRetry: function() {
                        function e() {
                            return p()
                        }
                        return e
                    } ()
                },
                t)),
                i.reject(t)
            }).
            finally(function() {
                o.$$uploading = !1
            })
        }
        n.navigationSection = {
            caseSensitivePathOptions: [{
                value: "auto",
                text: o("自动")
            },
            {
                value: "yes",
                text: o("是")
            },
            {
                value: "no",
                text: o("否")
            }],
            userAgents: [{
                text: "Google Chrome",
                value: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.21 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.21"
            },
            {
                text: "Internet Explorer 11",
                value: "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko"
            },
            {
                text: "Firefox",
                value: "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20100101 Firefox/31.0"
            },
            {
                text: "Opera",
                value: "Opera/9.80 (Windows NT 6.0; U; en) Presto/2.8.99 Version/11.10"
            },
            {
                text: "Safari",
                value: "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/537.21 (KHTML, like Gecko) Version/5.0.4 Safari/537.21"
            },
            {
                text: "iPhone with iOS 6",
                value: "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25"
            },
            {
                text: "Webkit on Android 4.0.3",
                value: "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
            }],
            onSelectUserAgent: function() {
                function e(e) {
                    n.navigation.userAgent = e
                }
                return e
            } (),
            excludedPattern: ""
        },
        n.importsSection = {
            pending: !1,
            nextUploadId: -1,
            onFileSelected: function() {
                function i(i, a) {
                    if (i) {
                        i.uploadId = a;
                        var s = n.imports.files.find(function(e) {
                            return e.uploadId === a
                        }),
                        c = t.countBy(n.imports.files.concat([i]),
                        function(e) {
                            return ! e.$$delete && t.endsWith(e.name, ".html") ? "selenium": "$_"
                        }).selenium,
                        u = e.extend({},
                        s, i, {
                            $$add: !0,
                            isNew: !0
                        });
                        n.imports.files.splice(n.imports.files.indexOf(s), 0, u),
                        n.imports.files.splice(n.imports.files.indexOf(s), 1),
                        i.$$add = s.$$add = !0,
                        i.isNew = s.isNew = !0,
                        0 === i.totalBytes ? (r.$emit("axError", {
                            errorMessage: o("所选文件为空")
                        }), t.remove(n.imports.files, s)) : c > 1 && (r.$emit("axError", {
                            errorMessage: o("每个目标只能使用一个Selenium脚本")
                        }), t.remove(n.imports.files, s)),
                        n.imports.files.push({
                            uploadId: n.importsSection.nextUploadId--,
                            isNew: !0
                        })
                    }
                }
                return i
            } (),
            onFileRemoved: function() {
                function e(e) {
                    if (e) if (e.$$add || e.isNew) {
                        var t = n.imports.files.find(function(t) {
                            return t.uploadId === e.uploadId
                        });
                        t && (n.imports.files.splice(n.imports.files.indexOf(t), 1), n.imports.files.find(function(e) {
                            return e.isNew
                        }) || n.imports.files.push({
                            uploadId: n.importsSection.nextUploadId--,
                            isNew: !0
                        }))
                    } else e.$$delete = !0
                }
                return e
            } ()
        },
        n.target = l.target,
        e.extend(n, {
            hasChanges: d,
            update: p,
            onRemoveExcludedPath: f,
            onAddExcludedPathPattern: g
        }),
        n.$on("axSectionChanging", h),
        function() {
            n.navigation = {
                caseSensitive: l.config.caseSensitive,
                excludedPaths: e.copy(l.config.excludedPaths),
                limitCrawlerScope: l.config.limitCrawlerScope,
                userAgent: l.config.userAgent
            },
            n.imports = {
                files: l.importedFiles.concat([{
                    uploadId: n.importsSection.nextUploadId--,
                    isNew: !0
                }])
            }
        } ()
    }
    n.$inject = ["$scope", "$rootScope", "$q", "gettext", "gettextCatalog", "TargetsApi", "axFileUploadService", "axEscapeHtmlFilter", "targetInfo"],
    e.module("WVS").controller("axTargetCrawlConfigCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, o, a, s, c, u, l, d, p, f, g, h) {
        function m() {
            var t = n.techSection.enabled ? n.advConfig.selectedTechnologies: [],
            i = n.cookiesSection.enabled ? n.advConfig.customCookies: [],
            o = n.headersSection.enabled ? n.advConfig.customHeaders: [],
            a = n.issueTrackerSection.enabled ? n.advConfig.issueTrackerId: "",
            s = n.advConfig.excludedHoursId ? n.advConfig.excludedHoursId: "";
            return ! ((n.scanningEngineSection.enabled ? n.scanningEngineSection.wvsWorkerId: "") === b() && s == f.config.excludedHoursId && a === f.config.issueTrackerId && r(t, f.config.technologies) && r(o, f.config.customHeaders) && r(i, f.config.customCookies) && n.advConfig.debug === f.config.debug && (!(Array.isArray(n.allowedHostsSection.hosts) && n.allowedHostsSection.hosts.length > 0) || n.allowedHostsSection.enabled) && (!e.isFunction(n.allowedHostsSection.hasChanges) || !n.allowedHostsSection.hasChanges()))
        }

        function v(e) {
            void 0 === e && (e = !0);
            var t = n.loadingTracker.createPromise();
            return a.when().then(function() {
                if (u.hasFeature("multi_engine")) {
                    var e = n.scanningEngineSection.enabled ? n.scanningEngineSection.wvsWorkerId: "";
                    if (e !== b()) {
                        var t = o.get("WorkersApi"),
                        r = [];
                        return e && r.push(e),
                        t.setAssignedWorkers(f.target.targetId, r)
                    }
                }
            }).then(function() {
                return T()
            }).then(function() {
                return x()
            }).then(function() {
                return n.notifyTargetUpdated()
            }).then(function() {
                return e ? n.reloadSection() : void 0
            }).
            finally(t.resolve)
        }

        function y() {
            return c.resetSensorSecret().then(function(e) {
                var t = n.loadingTracker.createPromise();
                return g.resetSensorSecret(f.target.targetId, e.sensorSecret).then(function() {
                    return g.getTargetConfiguration(f.target.targetId)
                }).then(function(e) {
                    var t = e.sensorSecret;
                    f.config.sensorSecret = t
                }).then(function() {
                    return n.notifyTargetUpdated()
                }).
                finally(t.resolve)
            })
        }

        function S(e, t) {
            m() && (t.cancel = !0, n.askSaveChanges().
            catch(function(e) {
                return "no" === e && n.changeSection(t.next),
                a.reject()
            }).then(function() {
                return v(!1)
            }).then(function() {
                n.changeSection(t.next)
            }))
        }

        function T() {
            var e = {
                technologies: n.techSection.enabled ? n.advConfig.selectedTechnologies: [],
                customHeaders: n.headersSection.enabled ? n.advConfig.customHeaders: [],
                customCookies: n.cookiesSection.enabled ? n.advConfig.customCookies: [],
                issueTrackerId: n.issueTrackerSection.enabled && n.advConfig.issueTrackerId ? n.advConfig.issueTrackerId: "",
                excludedHoursId: n.excludedHoursSection.enabled ? t.defaultTo(n.advConfig.excludedHoursId, "") : "",
                debug: n.advConfig.debug
            };
            return ! 0 !== u.hasFeature("bug_tracking_integration") && delete e.issueTrackerId,
            a.when().then(function() {
                return g.configureTarget(f.target.targetId, e, {
                    onRetry: function() {
                        function e() {
                            return v()
                        }
                        return e
                    } ()
                })
            })
        }

        function x() {
            if (e.isFunction(n.allowedHostsSection.hasChanges) && (n.allowedHostsSection.hasChanges() || n.allowedHostsSection.hosts.length > 0 && !n.allowedHostsSection.enabled)) {
                if (!n.allowedHostsSection.enabled) for (; n.allowedHostsSection.hosts.length > 0;) n.allowedHostsSection.removeHost(n.allowedHostsSection.hosts[0]);
                return n.allowedHostsSection.update()
            }
        }
        var b = function() {
            return t.get(f, "assignedWorkers.wvs.workerId", "")
        };
        n.techSection = {
            enabled: !1,
            toggleTechnology: function() {
                function e(e) {
                    var t = n.advConfig.selectedTechnologies,
                    r = t.indexOf(e);
                    r > -1 ? t.splice(r, 1) : t.push(e)
                }
                return e
            } ()
        },
        n.headersSection = {
            header: "",
            enabled: !1,
            onAddHeader: function() {
                function e(e) {
                    var t = n.headersSection.header;
                    if (e && 27 === e.keyCode) return void(n.headersSection.header = "");
                    t.length > 0 && (null === e ? (n.headersSection._addCustomHeader(t), n.headersSection.header = "") : 13 == e.keyCode && t && (n.headersSection._addCustomHeader(t), n.headersSection.header = ""))
                }
                return e
            } (),
            onRemoveHeader: function() {
                function e(e) {
                    n.advConfig.customHeaders.splice(n.advConfig.customHeaders.indexOf(e), 1)
                }
                return e
            } (),
            _addCustomHeader: function() {
                function e(e) {
                    n.advConfig.customHeaders.indexOf(e) < 0 && n.advConfig.customHeaders.push(e)
                }
                return e
            } ()
        },
        n.cookiesSection = {
            enabled: !1,
            cookiePath: "",
            cookieValue: "",
            onAddCookie: function() {
                function e(e) {
                    try {
                        var t = n.cookiesSection,
                        r = t.cookiePath,
                        i = t.cookieValue;
                        if (e && 27 === e.keyCode) return n.cookiesSection.cookiePath = "",
                        void(n.cookiesSection.cookieValue = "");
                        r && i && (null === e ? (n.cookiesSection._addCustomCookie(r, i), n.cookiesSection.cookiePath = "", n.cookiesSection.cookieValue = "") : 13 == e.keyCode && r && i && (n.cookiesSection._addCustomCookie(r, i), n.cookiesSection.cookiePath = "", n.cookiesSection.cookieValue = ""))
                    } finally {
                        n.uiForms.addCustomCookieForm.cookieUrl.$setUntouched()
                    }
                }
                return e
            } (),
            onRemoveCookie: function() {
                function e(e, t) {
                    var r = n.advConfig.customCookies.find(function(n) {
                        return n.url === e && n.cookie === t
                    });
                    r && n.advConfig.customCookies.splice(n.advConfig.customCookies.indexOf(r), 1)
                }
                return e
            } (),
            _addCustomCookie: function() {
                function e(e, t) {
                    n.advConfig.customCookies.find(function(n) {
                        return n.url === e && n.cookie === t
                    }) || n.advConfig.customCookies.push({
                        url: e,
                        cookie: t
                    })
                }
                return e
            } ()
        },
        n.allowedHostsSection = {
            enabled: !0
        },
        n.issueTrackerSection = {
            enabled: !1,
            issueTrackers: i(f.issueTrackers),
            onConfigureIssueTracker: function() {
                function e() {
                    s.configureIssueTracker().then(function(e) {
                        return p.createIssueTrackerEntry(e.name, e)
                    }).then(function(e) {
                        n.issueTrackerSection.issueTrackers.push(e),
                        n.advConfig.issueTrackerId = e.issueTrackerId
                    }).then(function() {
                        h.success(d.getString("问题跟踪器已创建"))
                    })
                }
                return e
            } ()
        },
        n.excludedHoursSection = {
            enabled: !0,
            profiles: [{
                name: l("使用默认排除的工时配置文件"),
                excludedHoursId: ""
            }].concat(f.excludedHours.profiles)
        },
        n.scanningEngineSection = {
            enabled: !1,
            wvsWorkerId: "",
            workers: f.workers
        },
        e.extend(n, {
            hasChanges: m,
            update: v,
            onResetAcuSensorPassword: y
        }),
        n.$on("axSectionChanging", S),
        function() {
            n.techSection.enabled = f.config.technologies.length > 0,
            n.headersSection.enabled = f.config.customHeaders.length > 0,
            n.cookiesSection.enabled = f.config.customCookies.length > 0,
            n.issueTrackerSection.enabled = !!f.config.issueTrackerId,
            n.target = {
                targetType: f.target.targetType
            },
            f.testWebsite && (n.isTestWebsite = !0),
            n.advConfig = {
                technologyList: ["ASP", "ASP.NET", "PHP", "Perl", "Java/J2EE", "ColdFusion/Jrun", "Python", "Rails", "FrontPage", "Node.js"],
                selectedTechnologies: i(f.config.technologies),
                customHeaders: i(f.config.customHeaders),
                customCookies: i(f.config.customCookies),
                issueTrackerId: f.config.issueTrackerId,
                debug: f.config.debug,
                excludedHoursId: f.config.excludedHoursId
            },
            n.scanningEngineSection.wvsWorkerId = b(),
            n.scanningEngineSection.enabled = !!n.scanningEngineSection.wvsWorkerId,
            n.$watch(function() {
                return n.allowedHostsSection.hosts ? n.allowedHostsSection.hosts.length: 0
            },
            function(e) {
                n.allowedHostsSection.enabled = e > 0
            })
        } ()
    }
    var r = e.equals,
    i = e.copy;
    n.$inject = ["$scope", "$injector", "$q", "axConfigureIssueTrackerModal", "axSensorSecretModal", "CurrentUser", "gettext", "gettextCatalog", "IssueTrackersApi", "targetInfo", "TargetsApi", "toastr"],
    e.module("WVS").controller("axTargetAdvancedConfigCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(t, n, r, i, o, a, s, c, u) {
        function l() {
            b.getWorkers({
                tracker: t.loadingTracker
            }).then(function(e) {
                var n = e.workers;
                t.noWorkersCreated = 0 === n.length,
                (r = t.workerList.items).push.apply(r, n);
                var r
            })
        }

        function d() {
            t.$$destroyed || C || (C = !0, n.when().then(function() {
                return i.get("WorkersApi").getWorkers({
                    noPublishError: !0,
                    noLoadingTracker: !0
                }).then(function(e) {
                    var n = e.workers;
                    t.workerList.items.splice(0),
                    (r = t.workerList.items).push.apply(r, n);
                    var r
                })
            }).
            finally(function() {
                C = !1,
                x = r(d, w)
            }))
        }

        function p(e) {
            return b.authorize(e.workerId).then(function() {
                c.success("工作人员已被授权"),
                t.$$destroyed || (t.workerList.gridApi.selection.unSelectRow(e), e.authorization = "authorized")
            })
        }

        function f(e) {
            return b.reject(e.workerId).then(function() {
                c.success("工作人员已被拒绝"),
                t.$$destroyed || (t.workerList.gridApi.selection.unSelectRow(e), e.authorization = "rejected")
            })
        }

        function g(e) {
            var n = t.workerList.gridApi && t.workerList.gridApi.selection,
            r = n ? n.getSelectedRows() : [];
            return e ? r.filter(function(t) {
                return Array.isArray(e) ? e.indexOf(t.authorization) > -1 : t.authorization === e
            }) : r
        }

        function h(e) {
            if (e) return g(e).length;
            var n = t.workerList.gridApi && t.workerList.gridApi.selection;
            return n ? n.getSelectedCount() : 0
        }

        function m() {
            var r = e.extend(t.$new(), {
                message: o(h() > 1 ? "确实要删除选定的工作人员吗？": "确实要删除选定的工作人员吗？")
            });
            u.confirm({
                scope: r
            }).then(function() {
                var e = g(),
                r = t.loadingTracker.createPromise({
                    activationDelay: 0
                });
                e.reduce(function(e, t) {
                    return e.then(function() {
                        return v(t)
                    })
                },
                n.when()).
                finally(r.resolve)
            }).
            finally(function() {
                return r.$destroy()
            })
        }

        function v(e) {
            return b.removeWorker(e.workerId).then(function() {
                c.success("工作人员已被删除"),
                t.$$destroyed || (t.workerList.gridApi.selection.unSelectRow(e), t.workerList.items.splice(t.workerList.items.indexOf(e), 1))
            })
        }

        function y() {
            var r = e.extend(t.$new(), {
                message: o(h() > 1 ? "确定要授权选定的工作人员吗？": "确定要授权选定的工作人员吗？")
            });
            u.confirm({
                scope: r
            }).then(function() {
                var e = g(),
                r = t.loadingTracker.createPromise({
                    activationDelay: 0
                });
                e.reduce(function(e, t) {
                    return e.then(function() {
                        return p(t)
                    })
                },
                n.when()).
                finally(r.resolve)
            }).
            finally(function() {
                return r.$destroy()
            })
        }

        function S() {
            var r = e.extend(t.$new(), {
                message: o(h() > 1 ? "是否确实要禁用选定的工作人员？": "是否确实要禁用选定的工作人员？")
            });
            u.confirm({
                scope: r
            }).then(function() {
                var e = g(),
                r = t.loadingTracker.createPromise({
                    activationDelay: 0
                });
                e.reduce(function(e, t) {
                    return e.then(function() {
                        return f(t)
                    })
                },
                n.when()).
                finally(r.resolve)
            }).
            finally(function() {
                return r.$destroy()
            })
        }

        function T(e) {
            _.show(e).then(function(e) {
                var n = t.workerList.items.find(function(t) {
                    return t.workerId === e.workerId
                });
                n && (n.description = e.description)
            })
        }
        var x, b, _, C = !1,
        w = 1e4;
        b = i.get("WorkersApi"),
        _ = i.get("axEditEngineModal"),
        t.noWorkersCreated = !1,
        t.workerList = {
            items: [],
            nextCursor: void 0
        },
        t.workerList.gridOptions = {
            data: t.workerList.items,
            appScopeProvider: t,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            multiSelect: !1,
            enableSelectionBatchEvent: !1,
            enableHorizontalScrollbar: s.scrollbars.ALWAYS,
            enableVerticalScrollbar: s.scrollbars.ALWAYS,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/settings/system-config/sections/workers/cols/name.html"),
                displayName: a.getString("名称"),
                name: "description",
                width: 260
            },
            {
                cellFilter: "axWorkerAuthorization",
                displayName: a.getString("授权"),
                name: "authorization",
                width: 140
            },
            {
                cellTemplate: __axtr("/templates/settings/system-config/sections/workers/cols/status.html"),
                displayName: a.getString("状态"),
                name: "status",
                width: 140
            },
            {
                displayName: a.getString("版本"),
                name: "appVersion",
                width: 140
            },
            {
                cellTemplate: __axtr("/templates/settings/system-config/sections/workers/cols/authorization.html"),
                displayName: a.getString("结束点"),
                name: "endpoint",
                width: "*"
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.workerId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.workerId
                }
                return e
            } (),
            onRegisterApi: function() {
                function e(e) {
                    t.workerList.gridApi = e,
                    l()
                }
                return e
            } ()
        },
        e.extend(t, {
            selectedItems: g,
            selectedItemsCount: h,
            onDeleteWorkers: m,
            onAuthorizeWorkers: y,
            onRejectWorkers: S
        }),
        t.onEditEngineName = T,
        function() {
            x = r(d, w)
        } (),
        t.$on("$destroy",
        function() {
            x && (r.cancel(x), x = void 0)
        })
    }
    n.$inject = ["$scope", "$q", "$timeout", "$injector", "gettext", "gettextCatalog", "uiGridConstants", "toastr", "axGeneralModal"],
    e.module("WVS").controller("axSystemConfigWorkersCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l, d, p) {
        function f() {
            return n.userList.items.splice(0),
            n.userList.nextCursor = void 0,
            g()
        }

        function g(i) {
            return r.when().then(function() {
                var e = t.get(i, "limit", c.LIST_PAGE_SIZE);
                return p.getUsers(n.userList.nextCursor, e, {
                    tracker: n.loadingTracker,
                    onRetry: function() {
                        function t() {
                            return g({
                                limit: e
                            })
                        }
                        return t
                    } ()
                })
            }).then(function(t) {
                var r = t.users,
                i = t.pagination;
                r.forEach(function(e) {
                    n.userList.items.find(function(t) {
                        return t.userId === e.userId
                    }) || n.userList.items.push(e)
                }),
                n.userList.nextCursor = i.nextCursor,
                n.noUsersCreated = 0 === n.userList.items.length,
                n.userList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(i.nextCursor))
            }).
            catch(function(e) {
                return n.userList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                r.reject(e)
            })
        }

        function h() {
            return t.some(["add", "remove", "update"],
            function(e) {
                return Array.isArray(x[e]) && x[e].length > 0
            })
        }

        function m() {
            var e = t.get(d.get(), "license.limits.maxUsers", 0),
            r = e > 0 && d.hasFeature("multi_user") && n.userList.items.length >= e;
            return l.addUser(r).then(function(e) {
                n.userList.items.unshift(e),
                n.noUsersCreated = !1,
                e.accessAllGroups || i.go("app.edit_user", {
                    userId: e.userId,
                    returnUrl: n.currentUrl()
                },
                {
                    inherit: !1
                })
            })
        }

        function v(t) {
            var i = e.extend(n.$new(), {
                message: o(T() > 1 ? t ? "您确定要启用选定的用户吗？": "您确定要禁用选定的用户吗？": t ? "您确定要启用选定的用户吗？": "您确定要禁用选定的用户吗？")
            });
            return u.confirm({
                scope: i
            }).then(function() {
                var i = n.loadingTracker.createPromise().resolve;
                S().reduce(function(n, r) {
                    return n.then(function() {
                        return p.updateUser({
                            userId: r.userId,
                            enabled: t
                        })
                    }).then(function(t) {
                        e.merge(r, t)
                    })
                },
                r.when()).
                finally(i)
            }).
            finally(function() {
                return i.$destroy()
            })
        }

        function y() {
            var i = e.extend(n.$new(), {
                message: o(T() > 1 ? "你确定要删除选定的用户吗？": "你确定要删除选定的用户吗？")
            });
            return u.confirm({
                scope: i
            }).then(function() {
                var e = 0,
                i = n.loadingTracker.createPromise().resolve;
                S().reduce(function(r, i) {
                    return r.then(function() {
                        return p.removeUser(i.userId)
                    }).then(function() {
                        n.userList.gridApi.selection.unSelectRow(i),
                        t.remove(n.userList.items, i),
                        e++
                    })
                },
                r.when()).then(function() {
                    if (e > 0 && void 0 !== n.userList.nextCursor) return g({
                        limit: e
                    });
                    n.noUsersCreated = 0 === n.userList.items.length
                }).
                finally(i)
            }).
            finally(function() {
                return i.$destroy()
            })
        }

        function S() {
            var e = n.userList.gridApi && n.userList.gridApi.selection;
            return e ? e.getSelectedRows() : []
        }

        function T() {
            var e = n.userList.gridApi && n.userList.gridApi.selection;
            return e ? e.getSelectedCount() : 0
        }
        var x = {};
        n.noUsersCreated = !1,
        n.userList = {
            items: [],
            nextCursor: void 0
        },
        n.userList.gridOptions = {
            data: n.userList.items,
            appScopeProvider: n,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableHorizontalScrollbar: s.scrollbars.ALWAYS,
            enableVerticalScrollbar: s.scrollbars.ALWAYS,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/settings/system-config/sections/users/cols/name.html"),
                displayName: a.getString("名称"),
                name: "name",
                width: 260
            },
            {
                displayName: a.getString("Email"),
                field: "email",
                width: 340
            },
            {
                cellFilter: "axUserRoleName",
                displayName: a.getString("角色"),
                field: "role",
                width: 150
            },
            {
                cellTemplate: __axtr("/templates/settings/system-config/sections/users/cols/access.html"),
                displayName: a.getString("连接所有目标"),
                name: "access",
                width: 120
            },
            {
                cellTemplate: __axtr("/templates/settings/system-config/sections/users/cols/enabled.html"),
                displayName: a.getString("允许"),
                name: "enabled",
                width: 80
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.userId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.userId
                }
                return e
            } (),
            onRegisterApi: function() {
                function e(e) {
                    n.userList.gridApi = e,
                    f()
                }
                return e
            } ()
        },
        e.extend(n, {
            hasChanges: h,
            onAddUserModal: m,
            onChangeEnableStatus: v,
            onDeleteUsers: y,
            selectedItems: S,
            selectedItemsCount: T
        })
    }
    n.$inject = ["$scope", "$q", "$state", "gettext", "gettextCatalog", "uiGridConstants", "axConstant", "axGeneralModal", "axAddUserModal", "CurrentUser", "ChildUsersApi"],
    e.module("WVS").controller("axSystemConfigUsersCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a) {
        function s(e) {
            return null !== l && "updates" === t.defaultTo(e, "updates") && n.productUpdates.updateMode !== l
        }

        function c(e) {
            void 0 === e && (e = !0);
            var t = n.loadingTracker.createPromise();
            return r.when().then(function() {
                return s("updates") ? a.updateConfiguration({
                    updateMode: n.productUpdates.updateMode
                }) : void 0
            }).then(function() {
                return n.notifySettingsUpdated()
            }).then(function() {
                return e ? n.reloadSection() : void 0
            }).
            finally(t.resolve, t.notify)
        }

        function u(e, t) {
            t && (n.productUpdates.updateMode = t.updateMode, l = t.updateMode),
            n.versionInfo = {
                buildNumber: e.buildNumber,
                buildDate: e.buildDate,
                versionFull: e.versionFull
            }
        }
        var l = null;
        n.productUpdates = {
            updateMode: null,
            updateModeList: [{
                value: "auto",
                text: i("自动下载并安装更新")
            },
            {
                value: "notify",
                text: i("通知我产品更新")
            },
            {
                value: "disabled",
                text: i("不自动检查更新[不推荐]")
            }],
            updateAvailable: !1
        },
        n.versionInfo = null,
        e.extend(n, {
            hasChanges: s,
            update: c
        }),
        function() {
            var e = n.loadingTracker.createPromise();
            r.when().then(function() {
                return a.getSystemInfo()
            }).then(function(e) {
                return o.hasPermission("systemConfig") && o.hasFeature("updates") ? a.getSystemConfig().then(function(t) {
                    return {
                        sysInfo: e,
                        sysConfig: t
                    }
                }) : (n.productUpdates.updateMode = "disabled", {
                    sysInfo: e
                })
            }).then(function(e) {
                return u(e.sysInfo, e.sysConfig)
            }).
            finally(e.resolve)
        } ()
    }
    n.$inject = ["$scope", "$q", "gettext", "CurrentUser", "SystemConfigApi"],
    e.module("WVS").controller("axSystemConfigProductUpdatesCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l, d, p) {
        function f() {
            var e = n.groupList.gridApi && n.groupList.gridApi.selection;
            return e ? e.getSelectedRows() : []
        }

        function g() {
            var e = n.groupList.gridApi && n.groupList.gridApi.selection;
            return e ? e.getSelectedCount() : 0
        }

        function h(i) {
            return r.when().then(function() {
                var e = t.get(i, "limit", c.LIST_PAGE_SIZE);
                return p.getGroups(void 0, n.groupList.nextCursor, e, {
                    onRetry: function() {
                        function t() {
                            return h({
                                limit: e
                            })
                        }
                        return t
                    } (),
                    tracker: n.loadingTracker
                })
            }).then(function(t) {
                var r = t.groups,
                i = t.pagination;
                r.forEach(function(e) {
                    n.groupList.items.find(function(t) {
                        return t.groupId === e.groupId
                    }) || n.groupList.items.push(e)
                }),
                n.groupList.nextCursor = i.nextCursor,
                n.noGroupsCreated = 0 === n.groupList.items.length,
                n.groupList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(i.nextCursor))
            }).
            catch(function(e) {
                return n.groupList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                r.reject(e)
            })
        }

        function m() {
            return l.addGroup().then(function(e) {
                n.groupList.items.unshift(e),
                n.noGroupsCreated = 0 === n.groupList.items.length
            })
        }

        function v(t) {
            return d.editGroup(t).then(function(n) {
                e.merge(t, n),
                s.success(o.getString("组已更新"))
            })
        }

        function y() {
            var o = e.extend(n.$new(), {
                message: i(g() > 1 ? "你确定要删除所选的组吗？": "你确定要删除所选的组吗？")
            });
            return u.confirm({
                scope: o
            }).then(function() {
                var e = 0,
                i = n.loadingTracker.createPromise();
                f().reduce(function(r, i) {
                    return r.then(function() {
                        return p.deleteGroup(i.groupId)
                    }).then(function() {
                        n.groupList.gridApi.selection.unSelectRow(i),
                        t.remove(n.groupList.items, i),
                        e++
                    })
                },
                r.when()).then(function() {
                    if (e > 0 && void 0 !== n.groupList.nextCursor) return h({
                        limit: e
                    });
                    n.noGroupsCreated = 0 === n.groupList.items.length
                }).
                finally(i.resolve)
            }).
            finally(function() {
                return o.$destroy()
            })
        }
        var S = r.defer();
        n.noGroupsCreated = !1,
        n.groupList = {
            items: [],
            nextCursor: void 0
        },
        n.groupList.gridOptions = {
            data: n.groupList.items,
            appScopeProvider: n,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableHorizontalScrollbar: a.scrollbars.ALWAYS,
            enableVerticalScrollbar: a.scrollbars.ALWAYS,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/settings/system-config/sections/target-groups/cols/name.html"),
                displayName: o.getString("组名"),
                name: "name",
                width: 320
            },
            {
                displayName: o.getString("描述"),
                field: "description",
                width: 240
            },
            {
                cellTemplate: __axtr("/templates/settings/system-config/sections/target-groups/cols/count.html"),
                displayName: o.getString("组内的目标"),
                name: "targetCount",
                width: 260
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.groupId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.groupId
                }
                return e
            } (),
            onRegisterApi: function() {
                function e(e) {
                    n.groupList.gridApi = e,
                    S.resolve()
                }
                return e
            } ()
        },
        e.extend(n, {
            addGroupModal: m,
            editGroupModal: v,
            onDeleteGroups: y,
            selectedItems: f,
            selectedItemsCount: g
        }),
        function() {
            S.promise.then(function() {
                return h()
            })
        } ()
    }
    n.$inject = ["$scope", "$q", "gettext", "gettextCatalog", "uiGridConstants", "toastr", "axConstant", "axGeneralModal", "axAddGroupModal", "axEditGroupModal", "TargetGroupsApi"],
    e.module("WVS").controller("axSystemConfigTargetGroupsCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l, d, p, f, g) {
        function h() {
            return c.currentUrlEncoded()
        }

        function m() {
            var e = w && w.selection;
            return e ? e.getSelectedRows() : []
        }

        function v() {
            var e = w && w.selection;
            return e ? e.getSelectedCount() : 0
        }

        function y() {
            var t = e.extend(n.$new(), {
                message: d(v() > 1 ? "您确定要删除所选的扫描类型吗？": "您确定要删除所选的扫描类型吗？")
            });
            return s.confirm({
                scope: t
            }).then(function() {
                return x()
            }).
            finally(function() {
                return t.$destroy()
            })
        }

        function S() {
            var e = n.loadingTracker.createPromise();
            I.promise.then(function() {
                return g.getScanningProfiles({
                    onRetry: function() {
                        function e() {
                            return S()
                        }
                        return e
                    } ()
                })
            }).then(function(e) { (t = n.scanningProfiles).push.apply(t, e);
                var t
            }).then(function() {
                return _()
            }).
            finally(e.resolve)
        }

        function T() {
            n.loadingTracker.cancel()
        }

        function x() {
            var e = n.loadingTracker.createPromise();
            return r.when().then(function() {
                return m().filter(function(e) {
                    return ! e.custom
                }).reduce(function(e, t) {
                    return e.then(function() {
                        return g.deleteScanningProfile(t.profileId, {
                            noPublishError: !0
                        })
                    }).then(function() {
                        w.selection.unSelectRow(t);
                        var e = n.scanningProfiles.indexOf(t);
                        e > -1 && n.scanningProfiles.splice(e, 1)
                    })
                },
                r.when())
            }).
            catch(function(e) {
                return 409 === t.get(e, "status", 0) && n.$root && (e = new Error(d("某些扫描类型无法删除，它们已被选中.")), n.$root.$emit("axError", e)),
                r.reject(e)
            }).
            finally(e.resolve)
        }

        function b() {
            u.set("scanning-profiles", w.saveState.save())
        }

        function _() {
            var e = u.get("scanning-profiles");
            e && w.saveState.restore(n, e)
        }

        function C() {
            u.remove("scanning-profiles"),
            i.reload(i.current)
        }
        var w, I = r.defer();
        n.loadingTracker = f({
            activationDelay: a.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        n.scanningProfiles = [],
        n.gridOptions = {
            data: n.scanningProfiles,
            appScopeProvider: n,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableRowHeaderSelection: !l.get("isChildAccount"),
            enableFullRowSelection: !1,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/settings/system-config/sections/scanning-profiles/cols/name.html"),
                displayName: p.getString("名称"),
                name: "name",
                width: 320
            },
            {
                cellTemplate: __axtr("/templates/settings/system-config/sections/scanning-profiles/cols/builtin.html"),
                displayName: p.getString("内置"),
                name: "custom",
                width: 80
            }],
            gridMenuCustomItems: [{
                title: p.getString("重置"),
                action: C
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.profileId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.profileId
                }
                return e
            } (),
            onRegisterApi: function() {
                function e(e) {
                    w = e,
                    I.resolve(),
                    e.colResizable.on.columnSizeChanged(n, b),
                    e.core.on.columnVisibilityChanged(n, b),
                    e.core.on.sortChanged(n, b)
                }
                return e
            } ()
        },
        n.currentUrl = h,
        n.onDeleteSelected = y,
        n.selectedItems = m,
        n.selectedItemsCount = v,
        n.$on("$destroy", T),
        S()
    }
    n.$inject = ["$scope", "$q", "$state", "$stateParams", "axConstant", "axGeneralModal", "axPage", "axUserPreferences", "CurrentUser", "gettext", "gettextCatalog", "promiseTracker", "ScannerApi"],
    e.module("WVS").controller("axSystemConfigScanningProfilesCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, r, i, o) {
        function a() {
            var t = n.uiForms.proxyForm;
            t && (n.proxySettings.enabled ? e.forEach(t.$error,
            function(t) {
                e.forEach(t,
                function(t) {
                    e.isDefined(t.$viewValue) && "" !== t.$viewValue && t.$setTouched()
                })
            }) : t.$setUntouched())
        }

        function s() {
            if (p.enabled != n.proxySettings.enabled) return ! 0;
            if (p.enabled && n.proxySettings.enabled) {
                var r = function(e) {
                    var n = t.pick(e, ["protocol", "address", "username", "password", "port"]);
                    return n.authRequired = !!t.defaultTo(e.authRequired, n.username),
                    n
                };
                return ! e.equals(r(p), r(n.proxySettings))
            }
            return ! 1
        }

        function c() {
            if (n.proxySettings.enabled && n.uiForms.proxyForm.$invalid) return d(),
            r.reject();
            var e = n.proxySettings,
            t = null;
            return e.enabled && "none" !== e.protocol && (t = {
                protocol: e.protocol,
                enabled: !0,
                address: e.address,
                port: parseInt(e.port, 10)
            },
            e.authRequired && (t.username = e.username, t.password = e.password)),
            o.updateConfiguration({
                proxy: t
            },
            {
                tracker: n.loadingTracker
            }).then(function() {
                n.notifySettingsUpdated(),
                n.reloadSection()
            })
        }

        function u() {
            return o.getSystemConfig({
                tracker: n.loadingTracker,
                onRetry: function() {
                    function e() {
                        return u()
                    }
                    return e
                } ()
            }).then(function(e) {
                return l(e.proxy)
            })
        }

        function l(t) {
            n.proxySettings = {
                enabled: !1,
                protocol: "none",
                authRequired: !1
            },
            t && (e.extend(n.proxySettings, t, {
                authRequired: !!t.username
            }), n.proxySettings.authRequired && (n.proxySettings.retypePassword = n.proxySettings.password)),
            p = e.copy(n.proxySettings)
        }

        function d() {
            e.forEach(n.uiForms.proxyForm.$error,
            function(t) {
                e.forEach(t,
                function(e) {
                    e.$setTouched()
                })
            })
        }
        var p = {
            enabled: !1,
            protocol: "none",
            authRequired: !1
        };
        n.protocolOptions = i.PROXY_PROTOCOL_OPTION,
        n.proxySettings = {
            enabled: !1,
            protocol: "none",
            authRequired: !1
        },
        e.extend(n, {
            hasChanges: s,
            onEnableChanged: a,
            update: c
        }),
        u()
    }
    n.$inject = ["$scope", "$q", "axConstant", "SystemConfigApi"],
    e.module("WVS").controller("axSystemConfigProxyCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s) {
        function c() {
            return g.enabled != n.notifySettings.enabled || !(!n.notifySettings.enabled || !g.enabled) && !e.equals(t.pick(g, ["address", "port", "security", "username", "password", "fromAddress"]), t.pick(n.notifySettings, ["address", "port", "security", "username", "password", "fromAddress"]))
        }

        function u() {
            if (n.notifySettings.enabled && n.uiForms.settingsForm.$invalid) return f(),
            r.reject();
            var e = n.notifySettings,
            a = null;
            if (e.enabled) {
                var c = e.address,
                u = e.port,
                l = e.fromAddress,
                d = e.security;
                a = {},
                a.address = c,
                a.fromAddress = l,
                a.port = parseInt(u, 10),
                a.security = d,
                e.authRequired && (a.username = e.username, a.password = e.password)
            }
            return s.updateConfiguration({
                notifications: a
            },
            {
                tracker: n.loadingTracker,
                noPublishError: !0
            }).
            catch(function(e) {
                var n = t.get(e, "data.details[0].body.problems[0]", null);
                return n && "format" === n.code && "body.notifications.address" === n.param_path ? i.$emit("axError", {
                    errorMessage: o("SMTP Server address is not valid [invalid-address-format]")
                }) : i.$emit("axError", {
                    errorMessage: e.errorMessage
                }),
                r.reject(e)
            }).then(function() {
                n.notifySettingsUpdated(),
                n.reloadSection()
            })
        }

        function l() {
            var t = n.uiForms.settingsForm;
            t && (n.notifySettings.enabled ? e.forEach(t.$error,
            function(t) {
                e.forEach(t,
                function(t) {
                    e.isDefined(t.$viewValue) && "" !== t.$viewValue && t.$setTouched()
                })
            }) : t.$setUntouched())
        }

        function d() {
            return s.getSystemConfig({
                tracker: n.loadingTracker,
                onRetry: function() {
                    function e() {
                        return d()
                    }
                    return e
                } ()
            }).then(function(e) {
                return p(e.notifications)
            })
        }

        function p(t) {
            n.notifySettings = {
                enabled: !1,
                authRequired: !1,
                security: "none"
            },
            t && t.address && (e.extend(n.notifySettings, t, {
                authRequired: !!t.username
            },
            {
                enabled: !0
            }), n.notifySettings.authRequired && (n.notifySettings.retypePassword = n.notifySettings.password)),
            g = e.copy(n.notifySettings)
        }

        function f() {
            e.forEach(n.uiForms.settingsForm.$error,
            function(t) {
                e.forEach(t,
                function(e) {
                    e.$setTouched()
                })
            })
        }
        var g = {
            enabled: !1,
            authRequired: !1,
            security: "none"
        };
        n.securityOptions = a.SMTP_SECURITY_OPTION,
        n.notifySettings = {
            enabled: !1,
            authRequired: !1,
            security: "none"
        },
        e.extend(n, {
            hasChanges: c,
            update: u,
            onEnableChanged: l
        }),
        d()
    }
    n.$inject = ["$scope", "$q", "$rootScope", "gettext", "axConstant", "SystemConfigApi"],
    e.module("WVS").controller("axSystemConfigNotificationsCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l, d, p, f) {
        function g() {
            var e = n.issueTrackers.gridApi && n.issueTrackers.gridApi.selection;
            return e ? e.getSelectedRows() : []
        }

        function h() {
            var e = n.issueTrackers.gridApi && n.issueTrackers.gridApi.selection;
            return e ? e.getSelectedCount() : 0
        }

        function m(t) {
            l.configureIssueTracker(t).then(function(e) {
                return f.updateIssueTrackerEntry(e, {
                    tracker: n.loadingTracker
                })
            }).then(function(n) {
                e.extend(t, n),
                c.success(s.getString("问题跟踪程序已更新"))
            })
        }

        function v() {
            l.configureIssueTracker().then(function(e) {
                return f.createIssueTrackerEntry(e.name, e, {
                    tracker: n.loadingTracker
                })
            }).then(function(e) {
                n.issueTrackers.items.push(e),
                c.success(s.getString("问题跟踪程序已添加"))
            })
        }

        function y(e) {
            var t = n.loadingTracker.createPromise();
            f.checkIssueTrackerEntry(e.issueTrackerId).then(function() {
                c.success(s.getString("与问题跟踪器的连接成功."))
            }).
            finally(t.resolve)
        }

        function S() {
            var i = e.extend(n.$new(), {
                message: a(h() > 1 ? "是否确实要删除所选问题跟踪器?": "是否确实要删除所选问题跟踪器?")
            });
            u.confirm({
                scope: i
            }).then(function() {
                var e = n.loadingTracker.createPromise().resolve;
                g().reduce(function(e, r) {
                    return e.then(function() {
                        return f.deleteIssueTrackerEntry(r.issueTrackerId)
                    }).then(function() {
                        n.issueTrackers.gridApi.selection.unSelectRow(r),
                        t.remove(n.issueTrackers.items, r)
                    })
                },
                r.when()).
                finally(e)
            }).
            finally(function() {
                return i.$destroy()
            })
        }

        function T(e) { (t = n.issueTrackers.items).push.apply(t, e);
            var t
        }

        function x() {
            d.set(w, n.issueTrackers.gridApi.saveState.save())
        }

        function b() {
            o(function() {
                var e = d.get(w);
                e && n.issueTrackers.gridApi.saveState.restore(n, e)
            })
        }

        function _() {
            d.remove(w),
            i.go(i.current.name, null, {
                reload: i.current.name
            })
        }
        var C = r.defer(),
        w = "system-config-issue-trackers";
        n.issueTrackers = {
            items: []
        },
        n.issueTrackers.gridOptions = {
            data: n.issueTrackers.items,
            appScopeProvider: n,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableRowHeaderSelection: !p.get("isChildAccount"),
            enableFullRowSelection: !1,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/settings/system-config/sections/issue-trackers/cols/name.html"),
                displayName: s.getString("名称"),
                name: "name",
                width: 200
            },
            {
                cellTemplate: __axtr("/templates/settings/system-config/sections/issue-trackers/cols/url.html"),
                displayName: s.getString("问题跟踪器"),
                name: "issueTracker",
                width: 320
            },
            {
                cellTemplate: __axtr("/templates/settings/system-config/sections/issue-trackers/cols/auth.html"),
                displayName: s.getString("授权"),
                name: "authentication",
                width: 120
            },
            {
                displayName: s.getString("用户"),
                field: "auth.username",
                name: "user",
                width: 180
            },
            {
                displayName: s.getString("项目"),
                field: "project.projectName",
                width: 200
            },
            {
                cellTemplate: __axtr("/templates/settings/system-config/sections/issue-trackers/cols/issue-type.html"),
                displayName: s.getString("问题类型"),
                name: "issueType",
                width: 120
            }],
            gridMenuCustomItems: [{
                title: s.getString("重置"),
                action: _
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.issueTrackerId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.issueTrackerId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    n.issueTrackers.gridApi = e,
                    e.colResizable.on.columnSizeChanged(n, x),
                    e.core.on.columnVisibilityChanged(n, x),
                    e.core.on.sortChanged(n, x),
                    C.resolve(e)
                }
                return e
            } ()
        },
        n.currentUser = p.get(),
        e.extend(n, {
            onAddIssueTracker: v,
            onCheckIssueTracker: y,
            onConfigureIssueTracker: m,
            onDeleteIssueTracker: S,
            selectedItems: g,
            selectedItemsCount: h
        }),
        function() {
            n.currentUser.isChildAccount && t.remove(n.issueTrackers.gridOptions.columnDefs,
            function(e) {
                var t = e.name;
                return "authentication" === t || "user" === t
            });
            var e = n.loadingTracker.createPromise().resolve;
            r.when().then(function() {
                return f.getIssueTrackers()
            }).then(function(e) {
                return T(e)
            }).
            finally(function() {
                return C.promise.then(b)
            }).
            finally(e)
        } ()
    }
    n.$inject = ["$scope", "$q", "$state", "$timeout", "gettext", "gettextCatalog", "toastr", "axGeneralModal", "axConfigureIssueTrackerModal", "axUserPreferences", "CurrentUser", "IssueTrackersApi"],
    e.module("WVS").controller("axSystemConfigIssueTrackersCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(t, n, r, i, o, a, s, c, u, l) {
        function d() {
            return t.pageState.excludedHoursId !== _
        }

        function p() {
            var e = t.loadingTracker.createPromise();
            return n.when().then(function() {
                return l.updateConfiguration({
                    excludedHoursId: t.pageState.excludedHoursId
                })
            }).then(function() {
                _ = t.pageState.excludedHoursId,
                t.notifySettingsUpdated()
            }).
            finally(e.resolve)
        }

        function f() {
            var r = e.extend(t.$new(), {
                message: i("您确定要删除选定的排除工作时间档案吗？?")
            });
            return s.confirm({
                scope: r
            }).then(function() {
                var e = t.loadingTracker.createPromise(),
                r = v();
                return m().reduce(function(e, n) {
                    return e.then(function() {
                        return u.removeExcludedHoursProfile(n.excludedHoursId)
                    }).then(function() {
                        var e = C.indexOf(n);
                        e > -1 && (b.selection.unSelectRow(n), C.splice(e, 1)),
                        n.excludedHoursId === t.pageState.excludedHoursId && (t.pageState.excludedHoursId = null)
                    })
                },
                n.when()).then(function() {
                    r > 1 ? t.notifySettingsUpdated(i("已删除的工时配置文件")) : t.notifySettingsUpdated(i("已排除的工时配置文件"))
                }).
                finally(e.resolve)
            })
        }

        function g(n) {
            a.open(n).then(function(r) {
                e.extend(n, r),
                t.notifySettingsUpdated(i("已更新的工时配置文件"))
            })
        }

        function h() {
            a.open().then(function(e) {
                C.push(e),
                t.notifySettingsUpdated(i("已创建的工时配置文件")),
                t.reloadSection()
            })
        }

        function m() {
            var e = b && b.selection;
            return e ? e.getSelectedRows().filter(function(e) {
                return !! e.excludedHoursId
            }) : []
        }

        function v() {
            return m().length
        }

        function y() {
            return n.when().then(function() {
                return w.promise
            }).then(function() {
                return u.getExcludedHoursProfiles({
                    onRetry: function() {
                        function e() {
                            return y()
                        }
                        return e
                    } ()
                }).then(function(e) {
                    C.splice(0),
                    C.push({
                        excludedHoursId: null,
                        name: i("使用中没有排除的小时数")
                    }),
                    C.push.apply(C, e),
                    T()
                })
            }).then(function() {
                return l.getSystemConfig({
                    onRetry: function() {
                        function e() {
                            return y()
                        }
                        return e
                    } ()
                }).then(function(e) {
                    var n = e.excludedHoursId;
                    _ = n || null,
                    t.pageState.excludedHoursId = _
                })
            })
        }

        function S() {
            return w.promise.then(function(e) {
                c.set("excluded-hours", e.saveState.save())
            })
        }

        function T() {
            var e = c.get("excluded-hours");
            if (e) return w.promise.then(function(n) {
                n.saveState.restore(t, e)
            })
        }

        function x() {
            c.remove("excluded-hours"),
            r.reload(r.current)
        }
        t.pageState = {
            excludedHoursId: void 0,
            exclusionHoursProfiles: []
        };
        var b, _ = void 0,
        C = t.pageState.exclusionHoursProfiles,
        w = n.defer();
        t.pageState.gridOptions = {
            data: C,
            appScopeProvider: t,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/settings/system-config/sections/exclusion-hours/cols/name.html"),
                displayName: o.getString("名称"),
                name: "name",
                width: 320
            },
            {
                cellTemplate: __axtr("/templates/settings/system-config/sections/exclusion-hours/cols/selected.html"),
                displayName: o.getString("默认"),
                name: "selected",
                width: 80
            }],
            gridMenuCustomItems: [{
                title: o.getString("重置"),
                action: x
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.excludedHoursId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.excludedHoursId
                }
                return e
            } (),
            onRegisterApi: function() {
                function e(e) {
                    e.colResizable.on.columnSizeChanged(t, S),
                    e.core.on.columnVisibilityChanged(t, S),
                    e.core.on.sortChanged(t, S),
                    b = e,
                    w.resolve(e)
                }
                return e
            } ()
        },
        e.extend(t, {
            hasChanges: d,
            update: p,
            onDeleteSelectedProfiles: f,
            onEditProfile: g,
            onCreateProfile: h,
            selectedItems: m,
            selectedItemsCount: v
        }),
        function() {
            y()
        } ()
    }
    n.$inject = ["$scope", "$q", "$state", "gettext", "gettextCatalog", "axExclusionHoursProfileModal", "axGeneralModal", "axUserPreferences", "ExcludedHoursApi", "SystemConfigApi"],
    e.module("WVS").controller("axExclusionHoursCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l, d, p, f, g, h, m, v) {
        function y(t) {
            return $(function() {
                var i = e.isString(t) && t.length > 0 ? "name:*" + encodeURIComponent(t) : void 0;
                return r.when().then(function() {
                    if (!0 !== h.hasFeature("target_groups")) return r.reject({
                        status: 403
                    })
                }).then(function() {
                    return v.getGroups(i, void 0, 10, {
                        cache: d,
                        noPublishError: !0
                    }).then(function(e) {
                        var t = e.groups;
                        n.searchFilters.groupList = t
                    })
                }).then(function() {
                    if (n.searchFilters.group.length > 0) return n.searchFilters.group.reduce(function(e, t) {
                        return n.searchFilters.groupList.find(function(e) {
                            return e.groupId === n.searchFilters.groupList
                        }) ? e: e.then(function() {
                            return v.getGroup(t, {
                                cache: d,
                                noPublishError: !0
                            })
                        }).then(function(e) {
                            n.searchFilters.groupList.push(e)
                        })
                    },
                    r.when())
                }).then(function() {
                    n.searchFilters.groupList = a(n.searchFilters.groupList, "name")
                }).
                catch(function(e) {
                    return 403 === e.status || e.publishResponseError && e.publishResponseError(e),
                    r.reject(e)
                }).
                finally(C)
            })
        }

        function S(t) {
            return $(function() {
                var i = e.isString(t) && t.length > 0 ? "text_search:*" + encodeURIComponent(t) : void 0;
                return r.when().then(function() {
                    if (n.filterAsideVisible) return m.getTargets(i, void 0, 10, {
                        cache: l
                    }).then(function(e) {
                        var t = e.targets;
                        n.searchFilters.targetList = t
                    })
                }).then(function() {
                    if (n.searchFilters.target) {
                        if (!n.searchFilters.targetList.find(function(e) {
                            return e.targetId === n.searchFilters.target
                        })) return m.getTarget(n.searchFilters.target, {
                            cache: l
                        }).then(function(e) {
                            n.searchFilters.targetList.push(e)
                        })
                    }
                }).then(function() {
                    n.searchFilters.targetList = a(n.searchFilters.targetList, "address")
                }).
                finally(C)
            })
        }

        function T() {
            return f.currentUrlEncoded()
        }

        function x() {
            n.filterAsideVisible = !n.filterAsideVisible
        }

        function b(e) {
            var t = n.searchFilters;
            switch (t.filterTags.splice(t.filterTags.indexOf(e), 1), e.key) {
            case "severity":
                t.severity = [];
                break;
            case "criticality":
                t.criticality = [];
                break;
            case "status":
                t.status = null;
                break;
            case "cvss":
                t.cvss = null;
                break;
            case "target":
                t.target = null;
                break;
            case "group":
                t.group = [];
                break;
            case "vuln_type":
                t.vulnType = null
            }
            w()
        }

        function _() {
            n.loadingTracker.cancel()
        }

        function C() {
            var e = n.searchFilters,
            r = [],
            i = t.curryRight(t.join, 2)(", "),
            o = function(e, n) {
                return c.getString(t.get(n, e, s("N/A")))
            };
            if (e.severity.length > 0 && r.push({
                key: "severity",
                label: s("严重性:"),
                value: i(e.severity.map(function(t) {
                    var n = e.severityList.find(function(e) {
                        return e.value === t
                    });
                    return o("text", n)
                }))
            }), e.criticality.length > 0 && r.push({
                label: s("临界性:"),
                key: "criticality",
                value: i(e.criticality.map(function(t) {
                    var n = e.criticalityList.find(function(e) {
                        return e.value === t
                    });
                    return o("text", n)
                }))
            }), e.status) {
                var a = e.statusList.find(function(t) {
                    return t.value === e.status
                });
                r.push({
                    key: "status",
                    label: s("状态:"),
                    value: o("text", a)
                })
            }
            if (e.cvss) {
                var a = e.cvssList.find(function(t) {
                    return t.value === e.cvss
                });
                r.push({
                    key: "cvss",
                    label: "CVSS:",
                    value: o("text", a)
                })
            }
            if (e.target) {
                var a = e.targetList.find(function(t) {
                    return t.targetId === e.target
                });
                r.push({
                    key: "target",
                    label: s("目标:"),
                    value: o("address", a)
                })
            }
            e.group.length > 0 && r.push({
                label: s("组:"),
                key: "group",
                value: i(e.group.map(function(t) {
                    var n = e.groupList.find(function(e) {
                        return e.groupId === t
                    });
                    return o("name", n)
                }))
            }),
            e.vulnType && r.push({
                key: "vuln_type",
                label: s("漏洞类型:"),
                value: e.vulnType
            }),
            n.searchFilters.filterTags = r
        }

        function w() {
            var e = n.searchFilters,
            t = {
                groupBy: o.groupBy,
                severity: e.severity.length > 0 ? e.severity.join(",") : void 0,
                criticality: e.criticality.length > 0 ? e.criticality.join(",") : null,
                status: e.status ? e.status: null,
                cvss: e.cvss ? e.cvss: void 0,
                target: e.target ? e.target: void 0,
                group: e.group.length > 0 ? e.group.join(",") : void 0,
                type: e.vulnType ? e.vulnType: void 0,
                returnUrl: T()
            };
            E = !0,
            i.go(i.current.name, t, {
                inherit: !1
            }).
            finally(function() {
                E = !1
            })
        }

        function I() {
            var e = [],
            r = t.curryRight(t.join, 2)(",");
            n.searchFilters.severity.length > 0 && e.push("severity:" + r(n.searchFilters.severity)),
            n.searchFilters.criticality.length > 0 && e.push("criticality:" + r(n.searchFilters.criticality)),
            n.searchFilters.status && ("rediscovered" === n.searchFilters.status ? (e.push("status:open"), e.push("rediscovered:true")) : e.push("status:" + n.searchFilters.status)),
            n.searchFilters.cvss && ("4" === n.searchFilters.cvss ? e.push("cvss_score:<=" + n.searchFilters.cvss) : "4-7" === n.searchFilters.cvss ? (e.push("cvss_score:>=4"), e.push("cvss_score:<=7")) : "7" === n.searchFilters.cvss && e.push("cvss_score:>=" + n.searchFilters.cvss)),
            n.searchFilters.target && e.push("target_id:" + n.searchFilters.target),
            n.searchFilters.group.length > 0 && e.push("group_id:" + r(n.searchFilters.group)),
            n.searchFilters.vulnType && e.push("vt_id:" + n.searchFilters.vulnType),
            n.searchFilters.searchQuery = e.join(";")
        }

        function k(e, t) {
            e === t || E || i.reload(i.current)
        }

        function A(e, t) {
            t !== e && (I(), C(), w())
        }

        function L(e) {
            n.groupByPretty = "criticality" === e ? "临界": "漏洞类型"
        }

        function $(e) {
            var t = n.loadingTracker.createPromise();
            return r.when().then(e).
            finally(t.resolve)
        }
        var E = !1;
        n.loadingTracker = u({
            activationDelay: p.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        n.groupBy = "criticality" === o.groupBy ? o.groupBy: "default",
        n.filterAsideVisible = !1,
        n.searchFilters = {
            searchQuery: "",
            severity: g.getStateParam("severity", !0, p.VULN_SEVERITY_LEVEL.map(function(e) {
                return e.value
            })),
            severityList: p.VULN_SEVERITY_LEVEL,
            criticality: g.getStateParam("criticality", !0, p.BUSINESS_CRITICALITY.map(function(e) {
                return e.value
            })),
            criticalityList: p.BUSINESS_CRITICALITY,
            status: g.getStateParam("status", !1, p.VULN_STATUS.map(function(e) {
                return e.value
            }).concat(["!open"])),
            statusList: p.VULN_STATUS.concat([{
                value: "!open",
                text: s("已关闭")
            }]),
            cvss: g.getStateParam("cvss", !1, p.CVSS_SCORE.map(function(e) {
                return e.value
            })),
            cvssList: p.CVSS_SCORE,
            target: g.getStateParam("target"),
            targetList: [],
            group: g.getStateParam("group", !0),
            groupList: [],
            vulnType: g.getStateParam("type"),
            filterTags: []
        },
        n.returnUrl = o.returnUrl,
        n.groupByPretty = "",
        n.toggleFilter = x,
        n.searchTargets = S,
        n.searchGroups = y,
        n.currentUrl = T,
        n.removeFilterTag = b,
        n.$on("$destroy", _),
        n.$watch("searchFilters.severity", A),
        n.$watch("searchFilters.criticality", A),
        n.$watch("searchFilters.status", A),
        n.$watch("searchFilters.cvss", A),
        n.$watch("searchFilters.target", A),
        n.$watch("searchFilters.group", A),
        n.$watch("searchFilters.vulnType", A),
        n.$watch("groupBy", L),
        n.$watchCollection(function() {
            return o
        },
        k),
        function() {
            f.setDocumentTitle(s("漏洞")),
            f.setCurrentSection("vulns"),
            I(),
            C(),
            S(),
            y()
        } ()
    }
    n.$inject = ["$scope", "$q", "$state", "$stateParams", "orderByFilter", "gettext", "gettextCatalog", "promiseTracker", "axTargetsCache", "axGroupsCache", "axConstant", "axPage", "axStateHelpers", "CurrentUser", "TargetsApi", "TargetGroupsApi"],
    e.module("WVS").controller("axGroupedListsVulnsCtrl", n)
} (angular, _),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l) {
        function d(t) {
            var n = k.loadingTracker.createPromise(),
            r = e.isString(t) && t.length > 0 ? "text_search:*" + encodeURIComponent(t) : void 0;
            return c.getTargets(r, void 0, 100, {
                cache: u
            }).then(function(t) {
                var n = t.targets;
                k.targetList = n.map(function(t) {
                    return e.extend(t, {
                        available: !0
                    })
                })
            }).then(T).
            finally(n.resolve)
        }

        function p() {
            return k.changeSet.add.length > 0 || k.changeSet.remove.length > 0
        }

        function f(e) {
            t.$applyAsync(function() {
                k.addHost(e),
                k.dummy.target = null
            })
        }

        function g(e) {
            e.available = !1,
            k.hostList.items.unshift({
                targetId: e.targetId,
                address: e.address,
                description: e.description
            });
            var t = k.changeSet.remove.indexOf(e.targetId);
            t < 0 ? k.changeSet.add.push(e.targetId) : k.changeSet.remove.splice(t, 1)
        }

        function h(e) {
            var t = k.hostList.items.indexOf(e);
            k.hostList.items.splice(t, 1);
            var n = k.targetList.find(function(t) {
                return t.targetId === e.targetId
            });
            n && (n.available = !0);
            var r = k.changeSet.add.indexOf(e.targetId);
            r < 0 ? k.changeSet.remove.push(e.targetId) : k.changeSet.add.splice(r, 1)
        }

        function m() {
            var t = k.loadingTracker.createPromise();
            return n.when().then(function() {
                if (k.changeSet.remove.length > 0) return e.copy(k.changeSet.remove).reduce(function(e, t) {
                    return e.then(function() {
                        return c.removeAllowedHost(k.targetId, t)
                    }).then(function() {
                        k.changeSet.remove.splice(k.changeSet.remove.indexOf(t), 1)
                    })
                },
                n.when())
            }).then(function() {
                k.changeSet.add.length > 0 && e.copy(k.changeSet.add).reduce(function(e, t) {
                    return e.then(function() {
                        return c.addAllowedHost(k.targetId, t)
                    }).then(function() {
                        k.changeSet.add.splice(k.changeSet.add.indexOf(t), 1)
                    })
                },
                n.when())
            }).
            finally(t.resolve)
        }

        function v() {
            A.promise.then(S).then(_)
        }

        function y() {
            k.loadingTracker.cancel()
        }

        function S() {
            var e = k.loadingTracker.createPromise();
            return c.getAllowedHosts(k.targetId, {
                onRetry: function() {
                    function e() {
                        return S()
                    }
                    return e
                } ()
            }).then(function(e) {
                e.hosts.forEach(function(e) {
                    k.hostList.items.find(function(t) {
                        return t.targetId === e.targetId
                    }) || k.hostList.items.push(e)
                })
            }).then(function() {
                if (0 === k.targetList.length) return d()
            }).
            finally(e.resolve)
        }

        function T() {
            k.targetList.forEach(function(e) {
                e.available = e.targetId !== k.targetId && !k.hostList.items.find(function(t) {
                    return t.targetId === e.targetId
                })
            })
        }

        function x() {
            k.hostList.gridApi && k.hostList.gridApi.infiniteScroll.resetScroll(!1, !1)
        }

        function b() {
            l.set("allowed-hosts", k.hostList.gridApi.saveState.save())
        }

        function _() {
            var e = l.get("allowed-hosts");
            e && k.hostList.gridApi.saveState.restore(t, e)
        }

        function C() {
            l.remove("allowed-hosts"),
            r.reload(r.current)
        }

        function w() {
            k.appScopeProvider && e.extend(k.appScopeProvider, {
                update: m,
                hasChanges: p,
                hosts: k.hostList.items,
                removeHost: h
            }),
            v()
        }

        function I() {
            y()
        }
        var k = this,
        A = n.defer();
        k.loadingTracker = o({
            activationDelay: s.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        k.targetList = [],
        k.dummy = {
            target: null
        },
        k.hostList = {
            items: []
        },
        k.hostList.gridOptions = {
            data: k.hostList.items,
            appScopeProvider: k,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                field: "address",
                displayName: a.getString("地址"),
                width: 320
            },
            {
                field: "description",
                displayName: a.getString("描述"),
                width: 240
            },
            {
                name: "actions",
                displayName: "",
                width: 160,
                cellTemplate: '<div class="ui-grid-cell-contents">\n<a ng-click="grid.appScope.removeHost(row.entity)">{{::\'移除\'|translate}}</a></div>'
            }],
            gridMenuCustomItems: [{
                title: a.getString("重置"),
                action: C
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.targetId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.targetId
                }
                return e
            } (),
            onRegisterApi: function() {
                function e(e) {
                    k.hostList.gridApi = e,
                    e.colResizable.on.columnSizeChanged(t, b),
                    e.core.on.columnVisibilityChanged(t, b),
                    e.core.on.sortChanged(t, b),
                    A.resolve()
                }
                return e
            } ()
        },
        k.targetId = i.targetId,
        k.changeSet = {
            add: [],
            remove: []
        },
        k.returnUrl = i.returnUrl,
        k.addHost = g,
        k.update = m,
        k.removeHost = h,
        k.onTargetSelected = f,
        k.hasChanges = p,
        k.searchTargets = d,
        k.$onInit = w,
        k.$onDestroy = I,
        t.$on("axScrollTop", x)
    }
    t.$inject = ["$scope", "$q", "$state", "$stateParams", "promiseTracker", "gettextCatalog", "axConstant", "TargetsApi", "axTargetsCache", "axUserPreferences"],
    e.module("WVS").component("axTargetAllowedHosts", {
        controller: t,
        templateUrl: __axtr("/templates/targets/target-config/components/allowed-hosts.component.html"),
        bindings: {
            appScopeProvider: "<?"
        }
    })
} (angular),
function(e) {
    "use strict";

    function t() {}
    e.module("WVS").controller("axGroupedScanDetailsVulnsCtrl", t)
} (angular),
function(e, t) {
    "use strict";

    function n(t, n, r, i, o, a, s, c, u, l, d, p, f, g, h, m, v, y, S, T, x, b) {
        function _() {
            t.selectedLocation = null
        }

        function C() {
            t.filterAsideVisible = !t.filterAsideVisible
        }

        function w(e) {
            var n = t.searchFilters;
            switch (n.filterTags.splice(n.filterTags.indexOf(e), 1), e.key) {
            case "severity":
                n.severity = [];
                break;
            case "status":
                n.status = null;
                break;
            case "cvss":
                n.cvss = null
            }
            G()
        }

        function I(e) {
            var n = t.locations.indexOf(e);
            n > -1 ? n + 1 < t.locations.length && t.locations.splice(n + 1) : t.locations.splice(0),
            t.locId = e.locId
        }

        function k(e) {
            t.locations.push(e),
            t.locId = e.locId
        }

        function A(n) {
            if (t.selectedLocation = n, !t.selectedLocation) return i.when();
            var r = t.loadingTracker.createPromise();
            return T.getLocationDetails(t.scan.resultId, t.scan.scanId, n.locId, {
                cache: p
            }).then(function(n) {
                e.extend(t.selectedLocation, n)
            }).
            finally(r.resolve)
        }

        function L(e) {
            t.selectedVulnItems = e
        }

        function $() {
            return ["aborted", "completed", "failed"].indexOf(t.scan.status) > -1 || "completed" === t.scan.originalStatus
        }

        function E() {
            return ["aborted", "completed", "failed"].indexOf(t.scan.status) > -1 || "completed" === t.scan.originalStatus
        }

        function R() {
            g.chooseReportOptions().then(function(e) {
                return z(e.templateId, {
                    listType: "scan_result",
                    idList: [t.scan.resultId]
                })
            }).then(function() {
                a.go("app.list_reports", {},
                {
                    inherit: !1
                })
            })
        }

        function P(e, n) {
            var r = [];
            switch (n) {
            case "scan_result":
                r = [t.scan.resultId]
            }
            return W(e, {
                listType: n,
                idList: r
            })
        }

        function N() {
            var n = e.extend(t.$new(), {
                message: m("Are you sure you want to stop this scan?")
            });
            return d.confirm({
                scope: n
            }).then(function() {
                return Y()
            }).
            finally(function() {
                return n.$destroy()
            })
        }

        function D() {
            Z = !0,
            a.go(a.current.name, {
                view: "events"
            }).
            finally(function() {
                Z = !1
            })
        }

        function U() {
            t.loadingTracker.cancel()
        }

        function F(n) {
            return x.getScan(t.scan.scanId, e.extend({
                tracker: t.loadingTracker,
                onRetry: function() {
                    function e() {
                        return F()
                    }
                    return e
                } ()
            },
            n || {})).then(function(n) {
                if (null === n) r.warn("扫描 " + t.scan.scanId + "不再存在."),
                t.sections.items.forEach(function(e) {
                    return e.visible = !1
                });
                else {
                    e.extend(t.scan, n),
                    s.resultId !== t.scan.resultId && "default" !== s.resultId && (t.scan.resultId = s.resultId);
                    t.scan.schedule.recurrence && !t.sections.items.find(function(e) {
                        return "sessions" === e.view
                    }) && t.sections.items.push({
                        heading: m("Previous Sessions"),
                        view: "sessions",
                        visible: !1
                    }),
                    t.sections.items.forEach(function(e) {
                        return e.visible = n.resultId
                    }),
                    t.sections.items[0].visible = !0
                }
            }).then(function() {
                var e = t.scan,
                n = e.scanId,
                r = e.resultId;
                if (r && "stats" === t.currentSection) return T.getStatistics(n, r, {
                    noPublishError: !0
                }).then(function(e) {
                    t.scanStatus = e
                })
            }).
            finally(q).
            finally(function() {
                var e = x.getScanNextRefresh(t.scan);
                t.$$destroyed || "stats" !== t.currentSection || null !== e && c(function() {
                    return F({
                        noPublishError: !0,
                        noLoadingTracker: !0,
                        tracker: null
                    })
                },
                e)
            })
        }

        function M(e) {
            t.groupByPretty = m("type" === e ? "漏洞类型": "无")
        }

        function V() {
            switch (s.view) {
            case "stats":
                t.sections.currentIndex = 0,
                t.currentSection = "stats";
                break;
            case "vulns":
                t.sections.currentIndex = 1,
                t.currentSection = "vulns";
                break;
            case "crawl":
                t.sections.currentIndex = 2,
                t.currentSection = "crawl";
                break;
            case "events":
                t.sections.currentIndex = 3,
                t.currentSection = "events";
                break;
            case "sessions":
                t.sections.currentIndex = 4,
                t.currentSection = "sessions"
            }
        }

        function O() {
            var e = t.searchFilters,
            n = [];
            e.severity.length > 0 && n.push("severity:" + e.severity.join(",")),
            e.status && ("rediscovered" === e.status ? (n.push("status:open"), n.push("rediscovered:true")) : n.push("status:" + e.status)),
            e.cvss && ("4" === e.cvss ? n.push("cvss_score:<=" + e.cvss) : "4-7" === e.cvss ? (n.push("cvss_score:>=4"), n.push("cvss_score:<=7")) : "7" === e.cvss && n.push("cvss_score:>=" + e.cvss)),
            e.searchQuery = n.join(";")
        }

        function H(e, t) {
            t !== e && (O(), q(), G())
        }

        function j(e, t) {
            e === t || Z || a.reload(a.current)
        }

        function q() {
            var e = t.searchFilters,
            n = [];
            if (e.severity.length > 0 && n.push({
                key: "severity",
                label: m("严重性:"),
                value: e.severity.map(function(t) {
                    var n = e.severityList.find(function(e) {
                        return e.value === t
                    });
                    return v.getString(n.text)
                }).join(", ")
            }), e.status) {
                var r = e.statusList.find(function(t) {
                    return t.value === e.status
                });
                n.push({
                    key: "status",
                    label: m("状态:"),
                    value: v.getString(r.text)
                })
            }
            if (e.cvss) {
                var r = e.cvssList.find(function(t) {
                    return t.value === e.cvss
                });
                n.push({
                    key: "cvss",
                    label: "CVSS:",
                    value: v.getString(r.text)
                })
            }
            e.filterTags = n
        }

        function G() {
            var e = t.searchFilters;
            Z = !0;
            var n = {
                scanId: s.scanId,
                groupBy: "type",
                view: s.view,
                resultId: s.resultId,
                returnUrl: s.returnUrl,
                severity: e.severity.length > 0 ? e.severity.join(",") : void 0,
                status: null !== e.status ? e.status: void 0,
                cvss: null !== e.cvss ? e.cvss: void 0
            };
            a.go(a.current.name, n, {
                inherit: !1
            }).
            finally(function() {
                Z = !1
            })
        }

        function B() {
            return S.getExportTypes("scan_result", {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function e() {
                        return B()
                    }
                    return e
                } ()
            }).then(function(n) {
                t.exportTemplateTypeList = n.map(function(t) {
                    return e.extend({
                        sourceType: "scan_result"
                    },
                    t)
                })
            })
        }

        function W(n, r) {
            if (Q.active()) {
                var i = e.extend(t.$new(), {
                    message: m("另一个下载正在进行.")
                });
                return d.alert({
                    scope: i
                }).
                finally(function() {
                    return i.$destroy()
                })
            }
            var o = t.loadingTracker.createPromise();
            return S.generateNewExport(n, r, {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function e() {
                        return W(n, r)
                    }
                    return e
                } ()
            }).then(function(e) {
                "failed" !== e.status && b.success(v.getString("下载将在几分钟内启动")),
                K(e.reportId)
            }).
            finally(o.resolve)
        }

        function K(r) {
            var a, s, c = Q.createPromise(),
            u = !1;
            return u ? i.when() : (a = n(function() {
                return u = !0,
                S.getExport(r, {
                    tracker: Q,
                    noPublishError: !0
                }).then(function(t) {
                    if (null === t) {
                        var n = {
                            errorMessage: m("无法下载您的报告 [已删除报告]")
                        };
                        return c.reject(n),
                        i.reject(n)
                    }
                    if ("failed" === t.status) {
                        var n = {
                            errorMessage: m("无法导出数据 [失败]")
                        };
                        return i.reject(n)
                    } (t.downloadLinkPDF || t.downloadLinkHTML || t.downloadLinkXML) && (e.element("#download-helper").attr("src", t.downloadLinkPDF || t.downloadLinkHTML || t.downloadLinkXML), c.resolve())
                }).
                catch(function(e) {
                    throw c.reject(e),
                    o.$emit("axError", e),
                    e
                }).
                finally(function() {
                    u = !1
                })
            },
            5e3), s = t.$on("$destroy", a.cancel), c.promise.
            finally(function() {
                n.cancel(a),
                s()
            }), c.promise)
        }

        function z(e, n) {
            return S.generateNewReport(e, n, {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function t() {
                        return z(e, n)
                    }
                    return t
                } ()
            }).then(function() {
                b.success(v.getString("正在创建报表"))
            })
        }

        function Y() {
            return x.abortScan(t.scan.scanId, {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function e() {
                        return Y()
                    }
                    return e
                } ()
            }).then(function(n) {
                e.extend(t.scan, n),
                s.resultId !== t.scan.resultId && "default" !== s.resultId && (t.scan.resultId = s.resultId)
            })
        }
        var Q = y({
            activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        Z = !1;
        t.loadingTracker = y({
            activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        t.scan = {
            scanId: s.scanId,
            resultId: null,
            target: {
                targetId: null,
                address: ""
            }
        },
        t.filterAsideVisible = !1,
        t.returnUrl = s.returnUrl,
        t.searchFilters = {
            searchQuery: "",
            filterTags: [],
            status: h.getStateParam("status", !1, u.VULN_STATUS.map(function(e) {
                return e.value
            }).concat(["!open"])),
            statusList: u.VULN_STATUS.concat([{
                value: "!open",
                text: m("已关闭")
            }]),
            severity: h.getStateParam("severity", !0, u.VULN_SEVERITY_LEVEL.map(function(e) {
                return e.value
            })),
            severityList: u.VULN_SEVERITY_LEVEL,
            cvss: h.getStateParam("cvss", !1, u.CVSS_SCORE.map(function(e) {
                return e.value
            })),
            cvssList: u.CVSS_SCORE
        },
        t.groupBy = "type",
        t.groupByPretty = "",
        t.locId = 0,
        t.locations = [],
        t.selectedLocation = null,
        t.sections = {
            currentIndex: 0,
            items: [{
                heading: m("扫描统计信息"),
                view: "stats",
                visible: !1
            },
            {
                heading: m("漏洞"),
                view: "vulns",
                visible: !1
            },
            {
                heading: m("网站结构"),
                view: "crawl",
                visible: !1
            },
            {
                heading: m("事件"),
                view: "events",
                visible: !1
            }]
        },
        t.currentSection = "stats",
        t.selectedVulnItems = [],
        t.exportTemplateTypeList = [],
        t.scanStatus = void 0,
        t.hideLocationDetails = _,
        t.toggleFilter = C,
        t.onCrawlLocationLoaded = k,
        t.onCrawLocationDetails = A,
        t.onVulnerabilitiesSelectionChanged = L,
        t.removeFilterTag = w,
        t.onGenerateReport = R,
        t.onExport = P,
        t.changeLocation = I,
        t.canGenerateReport = $,
        t.canGenerateExport = E,
        t.onStopScan = N,
        t.navigateToEvents = D,
        t.$on("$destroy", U),
        t.$watch(function() {
            return s.view
        },
        function(e, t) {
            e !== t && V()
        }),
        t.$watch("sections.currentIndex",
        function(e, n) {
            if (e !== n) {
                var r = t.sections.items[e];
                t.currentSection = r.view,
                Z = !0,
                a.go(a.current.name, {
                    view: r.view
                }).
                finally(function() {
                    Z = !1
                })
            }
        }),
        t.$watch("groupBy", M),
        t.$watch("searchFilters.severity", H),
        t.$watch("searchFilters.status", H),
        t.$watch("searchFilters.cvss", H),
        t.$watchCollection(function() {
            return s
        },
        j),
        function() {
            f.setDocumentTitle(m("扫描")),
            f.setCurrentSection("scans"),
            q(),
            O(),
            V(),
            F(),
            B()
        } ()
    }
    n.$inject = ["$scope", "$interval", "$log", "$q", "$rootScope", "$state", "$stateParams", "$timeout", "axConstant", "axFormatDurationFilter", "axGeneralModal", "axLocationsCache", "axPage", "axReportOptionsModal", "axStateHelpers", "gettext", "gettextCatalog", "promiseTracker", "ReportsApi", "ResultsApi", "ScansApi", "toastr"],
    e.module("WVS").controller("axGroupedScanDetailsCtrl", n)
} (angular, _),
function(e) {
    "use strict";

    function t(e) {
        function t() {
            i.clipboardTooltipEnabled = !1
        }

        function n(t) {
            t.clearSelection(),
            i.clipboardTooltipEnabled = !0,
            i.clipboardTooltipText = e("已复制!")
        }

        function r() {
            i.clipboardTooltipEnabled = !0,
            i.clipboardTooltipText = e("按Ctrl+C复制!")
        }
        var i = this;
        i.clipboardTooltipEnabled = !1,
        i.clipboardTooltipText = "",
        i.sectionVisibility = {
            description: !0,
            attackDetails: !0,
            request: !1,
            responseHeaders: !1,
            impact: !0,
            recommendation: !0,
            classification: !0,
            longDescription: !1,
            references: !0
        },
        i.onClipboardSuccess = n,
        i.onClipboardError = r,
        i.disableClipboardToolTip = t
    }
    t.$inject = ["gettext"],
    e.module("WVS").component("axVulnDetails", {
        controller: t,
        templateUrl: __axtr("/templates/components/vulns/vuln-details/vuln-details.component.html"),
        bindings: {
            vuln: "<"
        }
    }).directive("axVulnDetailsCollapsibleSection", ["$parse",
    function(t) {
        return {
            restrict: "A",
            scope: !1,
            link: function() {
                function n(n, r, i) {
                    function o(e) {
                        e ? (s.removeClass("fa-angle-double-down").addClass("fa-angle-double-up"), r.next().show()) : (s.removeClass("fa-angle-double-up").addClass("fa-angle-double-down"), r.next().hide())
                    }
                    var a = t(i.axVulnDetailsCollapsibleSection),
                    s = e.element('<i class="fa fa-fw m-r-xs"></i>');
                    r.prepend(s),
                    n.$watch(function() {
                        return a(n)
                    },
                    o),
                    r.on("click",
                    function() {
                        n.$applyAsync(function() {
                            var e = !a(n);
                            a.assign(n, e),
                            o(e)
                        })
                    })
                }
                return n
            } ()
        }
    }])
} (angular),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l, d, p, f, g, h, m) {
        function v() {
            $ = o.$watchCollection(function() {
                return s
            },
            function() {
                E.returnUrl = l.currentUrlEncoded()
            })
        }

        function y(n) {
            var i = E.loadingTracker.createPromise();
            return r.when().then(function() {
                E.vulnList.gridApi.infiniteScroll.saveScrollPercentage()
            }).then(function() {
                var e = t.get(n, "limit", u.LIST_PAGE_SIZE);
                return m.getVulnerabilities(E.searchQuery, E.vulnList.nextCursor, e, {
                    onRetry: function() {
                        function e() {
                            return y()
                        }
                        return e
                    } ()
                })
            }).then(function(t) {
                var n = t.vulnerabilities,
                r = t.pagination;
                n.forEach(function(e) {
                    E.vulnList.items.find(function(t) {
                        return t.vulnId === e.vulnId
                    }) || E.vulnList.items.push(e)
                }),
                E.vulnList.nextCursor = r.nextCursor,
                E.vulnList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(r.nextCursor)),
                E.onItemsLoaded && E.onItemsLoaded({
                    items: E.vulnList.items
                })
            }).
            catch(function(e) {
                return E.vulnList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                r.reject(e)
            }).
            finally(i.resolve)
        }

        function S(n) {
            var i = E.loadingTracker.createPromise();
            return r.when().then(function() {
                E.vulnTypeList.gridApi.infiniteScroll.saveScrollPercentage()
            }).then(function() {
                var e = t.get(n, "limit", u.LIST_PAGE_SIZE);
                return m.getVulnerabilityTypes(E.groupBy, E.searchQuery, E.vulnTypeList.nextCursor, e, {
                    onRetry: function() {
                        function e() {
                            return S()
                        }
                        return e
                    } ()
                })
            }).then(function(t) {
                var n = t.vulnerabilityTypes,
                r = t.pagination;
                n.forEach(function(e) {
                    E.vulnTypeList.items.find(function(t) {
                        return t.vulnTypeId === e.vulnTypeId
                    }) || E.vulnTypeList.items.push(e)
                }),
                E.vulnTypeList.nextCursor = r.nextCursor,
                E.vulnTypeList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(r.nextCursor)),
                E.onItemsLoaded && E.onItemsLoaded({
                    items: E.vulnTypeList.items
                })
            }).
            catch(function(e) {
                return E.vulnTypeList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                r.reject(e)
            }).
            finally(i.resolve)
        }

        function T(t, n) {
            var r = E.groupBy ? E.vulnTypeList: E.vulnList,
            i = r.items,
            o = i.indexOf(n);
            o > -1 && R.promise.then(function(t) {
                t.selection.unSelectRow(n),
                i.splice(o, 1),
                e.isDefined(r.nextCursor) && (E.groupBy ? S({
                    limit: 1
                }) : y({
                    limit: 1
                }))
            })
        }

        function x(e, t) {
            var n = t.vulnId;
            try {
                var r = E.vulnList.items.find(function(e) {
                    return e.vulnId === n
                });
                r && E.vulnList.gridApi.selection.unSelectRow(r)
            } catch(e) {}
        }

        function b() {
            E.vulnTypeList && E.vulnTypeList.gridApi ? E.vulnTypeList.gridApi.infiniteScroll.resetScroll(!1, e.isDefined(E.vulnTypeList.nextCursor)) : E.vulnList && E.vulnList.gridApi && E.vulnList.gridApi.infiniteScroll.resetScroll(!1, e.isDefined(E.vulnList.nextCursor))
        }

        function _() {
            var e = E.groupBy ? E.vulnTypeList: E.vulnList;
            e.gridApi && e.gridApi.selection && e.gridApi.selection.clearSelectedRows(),
            e.items.splice(0),
            e.nextCursor = void 0,
            b();
            var t = r.defer();
            return c(function() {
                R.promise.then(E.groupBy ? S: y).then(t.resolve, t.reject)
            }),
            t.promise
        }

        function C() {
            if (E.layoutSaveKey) {
                var e = E[E.groupBy ? "vulnTypeList": "vulnList"].gridApi;
                p.set(E.layoutSaveKey, e.saveState.save())
            }
        }

        function w() {
            if (E.layoutSaveKey) {
                var e = p.get(E.layoutSaveKey);
                if (e) {
                    E[E.groupBy ? "vulnTypeList": "vulnList"].gridApi.saveState.restore(o, e)
                }
            }
        }

        function I() {
            E.layoutSaveKey && (p.remove(E.layoutSaveKey), a.reload(a.current))
        }

        function k() {
            if (e.isUndefined(E.returnUrl) && v(), E.layoutSaveKey) {
                E[E.groupBy ? "vulnTypeList": "vulnList"].gridOptions.gridMenuCustomItems = [{
                    title: g.getString("重置"),
                    action: I
                }]
            }
            R.promise.then(_).then(w),
            o.$watch(function() {
                return f.get()
            },
            function(e) {
                return e ? E.currentUser = e: void 0
            })
        }

        function A(t) {
            if (e.isDefined(t.returnUrl) && !t.returnUrl.isFirstChange() && (e.isString(t.returnUrl.currentValue) && !$ ? v() : e.isUndefined(t.returnUrl) && $ && ($(), $ = void 0)), e.isDefined(t.groupBy) && !t.groupBy.isFirstChange()) throw new Error("不支持动态更改 groupBy 表达式");
            e.isDefined(t.layoutSaveKey) && !t.layoutSaveKey.isFirstChange() && t.layoutSaveKey.previousValue && (p.remove(t.layoutSaveKey.previousValue), C()),
            e.isDefined(t.searchQuery) && !t.searchQuery.isFirstChange() && _()
        }

        function L() {
            E.loadingTracker.cancel()
        }
        var $, E = this,
        R = r.defer();
        E.currentUser = f.get(),
        E.loadingTracker = h({
            activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        E.groupBy ? (E.filterGroups = d.getStateParam("group", !0), E.filterCriticality = d.getStateParam("criticality", !0), E.vulnTypeList = {
            items: [],
            nextCursor: void 0
        },
        E.vulnTypeList.gridOptions = {
            data: E.vulnTypeList.items,
            appScopeProvider: E,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableRowHeaderSelection: !1,
            multiSelect: !1,
            gridMenuTitleFilter: n("translate"),
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/components/vulns/target-vulns/cell-templates/criticality.html"),
                displayName: g.getString("业务临界性"),
                field: "criticality",
                headerTooltip: !0,
                visible: "criticality" === E.groupBy || "criticality" !== E.groupBy && i.appConfig.showBusinessCriticality,
                width: 100
            },
            {
                cellTemplate: __axtr("/templates/components/vulns/target-vulns/cell-templates/severity.html"),
                displayName: g.getString("严重性"),
                field: "severity",
                headerTooltip: !0,
                width: 40
            },
            {
                cellTemplate: __axtr("/templates/components/vulns/target-vulns/cell-templates/grouped-name.html"),
                field: "name",
                displayName: g.getString("漏洞"),
                width: 520
            },
            {
                name: "count",
                displayName: g.getString("计数"),
                cellFilter: "number",
                width: 100
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.vulnTypeId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.vulnTypeId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    E.vulnTypeList.gridApi = e,
                    e.infiniteScroll.on.needLoadMoreData(o, S),
                    e.colResizable.on.columnSizeChanged(o, C),
                    e.core.on.columnVisibilityChanged(o, C),
                    e.core.on.sortChanged(o, C),
                    R.resolve(e)
                }
                return e
            } ()
        }) : (E.vulnList = {
            items: [],
            nextCursor: void 0
        },
        E.vulnList.gridOptions = {
            data: E.vulnList.items,
            appScopeProvider: E,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            gridMenuTitleFilter: n("translate"),
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/components/vulns/target-vulns/cell-templates/severity.html"),
                displayName: g.getString("严重性"),
                field: "severity",
                headerTooltip: !0,
                width: 40
            },
            {
                cellTemplate: __axtr("/templates/components/vulns/target-vulns/cell-templates/name.html"),
                displayName: g.getString("漏洞"),
                field: "name",
                width: 320
            },
            {
                cellTemplate: __axtr("/templates/components/vulns/target-vulns/cell-templates/address.html"),
                displayName: g.getString("URL"),
                field: "url",
                width: 420
            },
            {
                displayName: g.getString("目标描述"),
                field: "targetDescription",
                visible: !1,
                width: 240
            },
            {
                cellTemplate: __axtr("/templates/components/vulns/target-vulns/cell-templates/parameter.html"),
                displayName: g.getString("参数"),
                field: "parameter",
                width: 120
            },
            {
                cellFilter: "axBusinessCriticality",
                displayName: g.getString("业务临界性"),
                field: "criticality",
                visible: i.appConfig.showBusinessCriticality,
                width: 160
            },
            {
                cellFilter: "axVulnStatus",
                displayName: g.getString("状态"),
                field: "status",
                width: 100
            },
            {
                cellFilter: 'date:"medium"',
                displayName: g.getString("上次扫描"),
                field: "lastSeen",
                width: 160
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.vulnId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.vulnId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    E.vulnList.gridApi = e,
                    e.infiniteScroll.on.needLoadMoreData(o, y),
                    e.colResizable.on.columnSizeChanged(o, C),
                    e.core.on.columnVisibilityChanged(o, C),
                    e.core.on.sortChanged(o, C);
                    var t = function() {
                        function e() {
                            E.onSelectionChanged && E.onSelectionChanged({
                                items: E.vulnList.gridApi.selection.getSelectedRows()
                            })
                        }
                        return e
                    } ();
                    e.selection.on.rowSelectionChanged(o, t),
                    R.resolve(e)
                }
                return e
            } ()
        }),
        !0 !== f.hasFeature("target_business_criticality") && t.remove(E[E.groupBy ? "vulnTypeList": "vulnList"].gridOptions.columnDefs, t.matchesProperty("field", "criticality")),
        E.$onInit = k,
        E.$onChanges = A,
        E.$onDestroy = L,
        o.$on("axScrollTop", b),
        o.$on("$destroy", i.$on("axRemoveVulnItem", T)),
        o.$on("$destroy", i.$on("axDeselectVulnerability", x))
    }
    n.$inject = ["$filter", "$q", "$rootScope", "$scope", "$state", "$stateParams", "$timeout", "axConstant", "axPage", "axStateHelpers", "axUserPreferences", "CurrentUser", "gettextCatalog", "promiseTracker", "VulnerabilitiesApi"],
    e.module("WVS").component("axTargetVulns", {
        controller: n,
        templateUrl: __axtr("/templates/components/vulns/target-vulns/target-vulns.component.html"),
        bindings: {
            returnUrl: "<?",
            layoutSaveKey: "@?",
            searchQuery: "<?",
            groupBy: "<?",
            targetId: "<?",
            onSelectionChanged: "&?",
            onItemsLoaded: "&?"
        }
    })
} (angular, _),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l, d, p) {
        function f() {
            C = t.$watchCollection(function() {
                return o
            },
            function() {
                w.returnUrl = l.currentUrlEncoded()
            })
        }

        function g() {
            var t = w.loadingTracker.createPromise();
            return n.when().then(function() {
                w.vulnList.gridApi.infiniteScroll.saveScrollPercentage()
            }).then(function() {
                var t = {
                    tracker: w.loadingTracker,
                    onRetry: function() {
                        function e() {
                            return g()
                        }
                        return e
                    } ()
                };
                return e.isNumber(w.locId) ? d.getLocationVulnerabilities(w.resultId, w.scanId, w.locId, w.vulnList.nextCursor, u.LIST_PAGE_SIZE, t) : d.getScanVulnerabilities(w.resultId, w.scanId, w.searchQuery, w.vulnList.nextCursor, u.LIST_PAGE_SIZE, t)
            }).then(function(t) {
                var n = t.vulnerabilities,
                r = t.pagination;
                n.forEach(function(e) {
                    w.vulnList.items.find(function(t) {
                        return t.vulnId === e.vulnId
                    }) || w.vulnList.items.push(e)
                }),
                w.vulnList.nextCursor = r.nextCursor,
                w.vulnList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(r.nextCursor)),
                w.onItemsLoaded && w.onItemsLoaded({
                    items: w.vulnList.items
                })
            }).
            catch(function(e) {
                return w.vulnList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                n.reject(e)
            }).
            finally(t.resolve)
        }

        function h() {
            var t = w.loadingTracker.createPromise();
            return n.when().then(function() {
                w.vulnTypeList.gridApi.infiniteScroll.saveScrollPercentage()
            }).then(function() {
                var t = w.resultId,
                n = w.scanId,
                r = w.searchQuery,
                i = {
                    onRetry: function() {
                        function e() {
                            return h()
                        }
                        return e
                    } ()
                };
                return d.getScanVulnerabilityTypes(t, n, r, w.vulnTypeList.nextCursor, u.LIST_PAGE_SIZE, i).then(function(t) {
                    var n = t.vulnerabilityTypes,
                    r = t.pagination;
                    n.forEach(function(e) {
                        w.vulnTypeList.items.find(function(t) {
                            return t.vulnTypeId === e.vulnTypeId
                        }) || w.vulnTypeList.items.push(e)
                    }),
                    w.vulnTypeList.nextCursor = r.nextCursor,
                    w.vulnTypeList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(r.nextCursor)),
                    w.onItemsLoaded && w.onItemsLoaded({
                        items: w.vulnTypeList.items
                    })
                })
            }).
            catch(function(e) {
                return w.vulnTypeList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                n.reject(e)
            }).
            finally(t.resolve)
        }

        function m() {
            w.vulnTypeList && w.vulnTypeList.gridApi ? w.vulnTypeList.gridApi.infiniteScroll.resetScroll(!1, void 0 !== w.vulnTypeList.nextCursor) : w.vulnList && w.vulnList.gridApi && w.vulnList.gridApi.infiniteScroll.resetScroll(!1, void 0 !== w.vulnList.nextCursor)
        }

        function v() {
            var e = w.groupBy ? w.vulnTypeList: w.vulnList;
            e.items.splice(0),
            e.nextCursor = void 0,
            m();
            var t = n.defer();
            return a(function() {
                I.promise.then(w.groupBy ? h: g).then(t.resolve, t.reject)
            }),
            t.promise
        }

        function y() {
            if (w.layoutSaveKey) {
                var e = w[w.groupBy ? "vulnTypeList": "vulnList"].gridApi;
                p.set(w.layoutSaveKey, e.saveState.save())
            }
        }

        function S() {
            if (w.layoutSaveKey) {
                var e = p.get(w.layoutSaveKey);
                if (e) {
                    w[w.groupBy ? "vulnTypeList": "vulnList"].gridApi.saveState.restore(t, e)
                }
            }
        }

        function T() {
            w.layoutSaveKey && (p.remove(w.layoutSaveKey), i.reload(i.current))
        }

        function x() {
            if (e.isUndefined(w.returnUrl) && f(), w.layoutSaveKey) {
                w[w.groupBy ? "vulnTypeList": "vulnList"].gridOptions.gridMenuCustomItems = [{
                    title: s.getString("重置"),
                    action: T
                }]
            }
            I.promise.then(v).then(S)
        }

        function b(t) {
            if (e.isDefined(t.returnUrl) && !t.returnUrl.isFirstChange() && (e.isString(t.returnUrl.currentValue) && !C ? f() : e.isUndefined(t.returnUrl) && C && (C(), C = void 0)), e.isDefined(t.groupBy) && !t.groupBy.isFirstChange()) throw new Error("不支持动态更改 groupBy 表达式");
            e.isDefined(t.layoutSaveKey) && !t.layoutSaveKey.isFirstChange() && t.layoutSaveKey.previousValue && (p.remove(t.layoutSaveKey.previousValue), y()),
            e.isDefined(t.searchQuery) && !t.searchQuery.isFirstChange() ? v() : e.isDefined(t.locId) && !t.locId.isFirstChange() ? v() : e.isDefined(t.resultId) && !t.resultId.isFirstChange() ? v() : e.isDefined(t.scanId) && !t.scanId.isFirstChange() && v()
        }

        function _() {
            w.loadingTracker.cancel()
        }
        var C, w = this,
        I = n.defer();
        w.loadingTracker = c({
            activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        w.groupBy ? (w.vulnTypeList = {
            items: [],
            nextCursor: void 0
        },
        w.vulnTypeList.gridOptions = {
            data: w.vulnTypeList.items,
            appScopeProvider: w,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableRowHeaderSelection: !1,
            multiSelect: !1,
            gridMenuTitleFilter: r("translate"),
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/components/vulns/scan-vulns/cell-templates/severity.html"),
                displayName: s.getString("严重性"),
                field: "severity",
                headerTooltip: !0,
                width: 40
            },
            {
                cellTemplate: __axtr("/templates/components/vulns/scan-vulns/cell-templates/grouped-name.html"),
                displayName: s.getString("漏洞"),
                field: "name",
                width: 520
            },
            {
                cellFilter: "number",
                displayName: s.getString("数量"),
                field: "count",
                width: 100
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.vulnTypeId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.vulnTypeId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    w.vulnTypeList.gridApi = e,
                    e.infiniteScroll.on.needLoadMoreData(t, h),
                    e.colResizable.on.columnSizeChanged(t, y),
                    e.core.on.columnVisibilityChanged(t, y),
                    e.core.on.sortChanged(t, y),
                    I.resolve()
                }
                return e
            } ()
        }) : (w.vulnList = {
            items: [],
            nextCursor: void 0
        },
        w.vulnList.gridOptions = {
            data: w.vulnList.items,
            appScopeProvider: w,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableRowHeaderSelection: !1,
            multiSelect: !1,
            gridMenuTitleFilter: r("translate"),
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/components/vulns/scan-vulns/cell-templates/severity.html"),
                displayName: s.getString("严重性"),
                field: "severity",
                headerTooltip: !0,
                width: 40
            },
            {
                cellTemplate: __axtr("/templates/components/vulns/scan-vulns/cell-templates/name.html"),
                displayName: s.getString("漏洞"),
                field: "name",
                width: 320
            },
            {
                displayName: s.getString("URL"),
                field: "url",
                width: 420
            },
            {
                cellTemplate: __axtr("/templates/components/vulns/scan-vulns/cell-templates/parameter.html"),
                displayName: s.getString("参数"),
                field: "parameter",
                width: 120
            },
            {
                cellFilter: "axVulnStatus",
                displayName: s.getString("状态"),
                field: "status",
                width: 160
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.vulnId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.vulnId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    w.vulnList.gridApi = e,
                    e.infiniteScroll.on.needLoadMoreData(t, g),
                    e.colResizable.on.columnSizeChanged(t, y),
                    e.core.on.columnVisibilityChanged(t, y),
                    e.core.on.sortChanged(t, y),
                    I.resolve()
                }
                return e
            } ()
        }),
        w.$onInit = x,
        w.$onChanges = b,
        w.$onDestroy = _,
        t.$on("axScrollTop", m)
    }
    t.$inject = ["$scope", "$q", "$filter", "$state", "$stateParams", "$timeout", "gettextCatalog", "promiseTracker", "axConstant", "axPage", "ResultsApi", "axUserPreferences"],
    e.module("WVS").component("axScanVulns", {
        controller: t,
        templateUrl: __axtr("/templates/components/vulns/scan-vulns/scan-vulns.component.html"),
        bindings: {
            returnUrl: "<?",
            layoutSaveKey: "@?",
            searchQuery: "<?",
            groupBy: "@?",
            scanId: "<",
            resultId: "<",
            locId: "<?",
            onSelectionChanged: "&?",
            onItemsLoaded: "&?"
        }
    })
} (angular),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l, d) {
        function p(e) {
            return v(function() {
                return d.setVulnerabilityStatus(t.vuln.vulnId, e, {
                    onRetry: function() {
                        function t() {
                            return p(e)
                        }
                        return t
                    } ()
                }).then(function() {
                    t.vuln.status = e,
                    s.success(a.getString("状态已更改"))
                })
            })
        }

        function f() {
            return d.createIssue(t.vuln.vulnId, {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function e() {
                        return f()
                    }
                    return e
                } ()
            }).then(function() {
                return s.success(a.getString("问题已创建")),
                m()
            })
        }

        function g() {
            var n = e.extend(t.$new(), {
                message: a.getString("是否确实要重新测试所选的漏洞?")
            });
            return u.confirm({
                scope: n
            }).then(function() {
                return d.recheckVulnerability(t.vuln.vulnId, {
                    tracker: t.loadingTracker
                })
            }).then(function() {
                s.success(a.getString("已创建扫描以检查所选的漏洞"))
            })
        }

        function h() {
            t.loadingTracker.cancel()
        }

        function m() {
            return v(function() {
                return d.getVulnerabilityDetails(t.vuln.vulnId, {
                    onRetry: function() {
                        function e() {
                            return m()
                        }
                        return e
                    } ()
                }).then(function(e) {
                    return t.vuln = e
                })
            })
        }

        function v(e) {
            var r = t.loadingTracker.createPromise().resolve;
            return n.when().then(e).
            finally(r)
        }
        t.loadingTracker = i({
            activationDelay: c.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        t.vuln = {
            vulnId: r.vulnId
        },
        t.changeVulnStatus = p,
        t.onCreateIssues = f,
        t.onRecheckVulnerability = g,
        t.$on("$destroy", h),
        function() {
            l.setDocumentTitle(o("漏洞")),
            l.setCurrentSection("vulns"),
            m()
        } ()
    }
    t.$inject = ["$scope", "$q", "$stateParams", "promiseTracker", "gettext", "gettextCatalog", "toastr", "axConstant", "axGeneralModal", "axPage", "VulnerabilitiesApi"],
    e.module("WVS").controller("axVulnDetailsCtrl", t)
} (angular),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l) {
        function d() {
            var n = e.extend(t.$new(), {
                message: r.getString("是否确实要重新测试所选的漏洞?")
            });
            return c.confirm({
                scope: n
            }).then(function() {
                return l.recheckVulnerability(t.resultId, t.scanId, t.vuln.vulnId, {
                    tracker: t.loadingTracker
                })
            }).then(function() {
                a.success(r.getString("已创建扫描以检查所选的漏洞"))
            })
        }

        function p() {
            t.loadingTracker.cancel()
        }

        function f() {
            var e = t.loadingTracker.createPromise();
            return l.getScanVulnerabilityDetails(t.resultId, t.scanId, t.vuln.vulnId, {
                onRetry: function() {
                    function e() {
                        return f()
                    }
                    return e
                } ()
            }).then(function(e) {
                t.vuln = e,
                t.$$destroyed || u.setDocumentTitle(n("扫描漏洞 - ") + t.vuln.name)
            }).
            finally(e.resolve)
        }
        t.loadingTracker = i({
            activationDelay: s.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        t.scanId = o.scanId,
        t.resultId = o.resultId,
        t.vuln = {
            vulnId: o.vulnId
        },
        t.onRecheckVulnerability = d,
        t.$on("$destroy", p),
        function() {
            u.setDocumentTitle(n("扫描漏洞")),
            u.setCurrentSection("scans"),
            f()
        } ()
    }

    function n(e) {
        e.state("app.result_details", {
            url: "scans/:scanId/results/:resultId/:vulnId/?returnUrl=",
            templateUrl: __axtr("/templates/vulns/result-details/result-details.html"),
            controller: t,
            data: {
                page: {
                    icon: "fa-area-chart",
                    section: "scans"
                }
            },
            onEnter: function() {
                function e(e) {
                    e.scrollTopActionVisible = !1
                }
                return e.$inject = ["$rootScope"],
                e
            } (),
            onExit: function() {
                function e(e) {
                    e.scrollTopActionVisible = !0
                }
                return e.$inject = ["$rootScope"],
                e
            } ()
        })
    }
    t.$inject = ["$scope", "gettext", "gettextCatalog", "promiseTracker", "$stateParams", "toastr", "axConstant", "axGeneralModal", "axPage", "ResultsApi"],
    n.$inject = ["$stateProvider"],
    e.module("WVS").config(n)
} (angular),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l, d, p, f, g, h, m, v, y, S, T, x, b, _, C, w, I, k) {
        function A(t) {
            return Z(function() {
                var r = e.isString(t) && t.length > 0 ? "name:*" + encodeURIComponent(t) : void 0;
                return i.when().then(function() {
                    if (!0 !== y.hasFeature("target_groups")) return i.reject({
                        status: 403
                    })
                }).then(function() {
                    return C.getGroups(r, void 0, 10, {
                        cache: p,
                        noPublishError: !0
                    }).then(function(e) {
                        var t = e.groups;
                        n.searchFilters.groupList = t
                    })
                }).then(function() {
                    if (n.searchFilters.group.length > 0) return n.searchFilters.group.reduce(function(e, t) {
                        return n.searchFilters.groupList.find(function(e) {
                            return e.groupId === n.searchFilters.groupList
                        }) ? e: e.then(function() {
                            return C.getGroup(t, {
                                cache: p,
                                noPublishError: !0
                            })
                        }).then(function(e) {
                            n.searchFilters.groupList.push(e)
                        })
                    },
                    i.when())
                }).then(function() {
                    n.searchFilters.groupList = x(n.searchFilters.groupList, "name")
                }).
                catch(function(e) {
                    return 403 === e.status || e.publishResponseError && e.publishResponseError(e),
                    i.reject(e)
                }).
                finally(q)
            })
        }

        function L(t) {
            return Z(function() {
                var r = e.isString(t) && t.length > 0 ? "text_search:*" + encodeURIComponent(t) : void 0;
                return i.when().then(function() {
                    if (n.filterAsideVisible) return w.getTargets(r, void 0, 10, {
                        cache: m
                    }).then(function(e) {
                        var t = e.targets;
                        n.searchFilters.targetList = t
                    })
                }).then(function() {
                    if (n.searchFilters.target) {
                        if (!n.searchFilters.targetList.find(function(e) {
                            return e.targetId === n.searchFilters.target
                        })) return w.getTarget(n.searchFilters.target, {
                            cache: m
                        }).then(function(e) {
                            n.searchFilters.targetList.push(e)
                        })
                    }
                }).then(function() {
                    n.searchFilters.targetList = x(n.searchFilters.targetList, "address")
                }).
                finally(q)
            })
        }

        function $() {
            n.filterAsideVisible = !n.filterAsideVisible
        }

        function E(t) {
            var r = e.extend(n.$new(), {
                message: T.getPlural(n.selectedItems.length, "是否确认要将所选的漏洞标记为<strong>{{status|axVulnStatus}}</strong>?", "是否确认要将选定的漏洞标记为<strong>{{status|axVulnStatus}}</strong>?", {
                    status: t
                })
            });
            return d.confirm({
                scope: r
            }).then(function() {
                var e = n.loadingTracker.createPromise();
                return n.selectedItems.reduce(function(e, r) {
                    return e.then(function() {
                        return k.setVulnerabilityStatus(r.vulnId, t).then(function() {
                            r.status = t,
                            null !== n.searchFilters.status && ("!open" === n.searchFilters.status && "open" !== r.status ? o.$emit("axRemoveVulnItem", r) : n.searchFilters.status !== r.status && o.$emit("axRemoveVulnItem", r))
                        })
                    })
                },
                i.when()).then(function() {
                    I.success(T.getString("漏洞状态已更改"))
                }).
                finally(e.resolve)
            }).
            finally(function() {
                return r.$destroy()
            })
        }

        function R() {
            return f.currentUrlEncoded()
        }

        function P(e) {
            var t = n.searchFilters;
            switch (t.filterTags.splice(t.filterTags.indexOf(e), 1), e.key) {
            case "severity":
                t.severity = [];
                break;
            case "criticality":
                t.criticality = [];
                break;
            case "status":
                t.status = null;
                break;
            case "cvss":
                t.cvss = null;
                break;
            case "target":
                t.target = null;
                break;
            case "group":
                t.group = [];
                break;
            case "vuln_type":
                t.vulnType = null
            }
            G()
        }

        function N(e) {
            n.selectedItems = e
        }

        function D() {
            g.chooseReportOptions().then(function(e) {
                var t = n.selectedItems.map(function(e) {
                    return e.vulnId
                });
                return K(e.templateId, {
                    listType: "vulnerabilities",
                    idList: t
                })
            }).then(function() {
                a.go("app.list_reports")
            })
        }

        function U(e, t) {
            var r = [];
            return "all_vulnerabilities" !== t && (r = n.selectedItems.map(function(e) {
                return e.vulnId
            })),
            Y(e, {
                listType: t,
                idList: r
            })
        }

        function F() {
            var r = n.loadingTracker.createPromise(),
            a = {
                failures: []
            },
            s = n.selectedItems.length;
            return i.when().then(function() {
                return n.selectedItems.reduce(function(e, t) {
                    var n = t.vulnId;
                    return e.then(function() {
                        return k.createIssue(n, {
                            noPublishError: !0
                        })
                    }).then(function() {
                        o.$emit("axDeselectVulnerability", {
                            vulnId: n
                        })
                    }).
                    catch(function(e) {
                        return 401 === e.status ? i.reject(e) : (a.failures.push({
                            vulnId: n,
                            errorMessage: e.errorMessage
                        }), null)
                    })
                },
                i.when())
            }).then(function() {
                if (r.resolve(), a.failures.length > 0) {
                    var i = e.extend(n.$new(), {
                        message: S("某些漏洞无法发送到问题跟踪器-它们已被选中.") + '<br/><strong class="block text-danger m-t-sm m-b-sm">错误:<br/></strong><ul>' + t.chain(a.failures).uniqBy(t.property("errorMessage")).map(function(e) {
                            var t = e.errorMessage;
                            return "<li>" + l(t) + "</li>"
                        }).join("").value() + "</ul>"
                    });
                    return d.alert({
                        scope: i
                    }).
                    finally(function() {
                        return i.$destroy()
                    })
                }
            }).then(function() {
                0 === a.failures.length && I.success(T.getPlural(s, "问题已创建", "问题已创建"))
            }).
            finally(r.resolve)
        }

        function M() {
            var r = e.extend(n.$new(), {
                message: T.getPlural(n.selectedItems.length, "是否确实要重新测试所选的漏洞?", "是否确实要重新测试所选的漏洞?")
            });
            return d.confirm({
                scope: r
            }).then(function() {
                var r = n.loadingTracker.createPromise(),
                a = {
                    failures: []
                },
                s = n.selectedItems.length;
                return i.when().then(function() {
                    return n.selectedItems.reduce(function(e, t) {
                        var n = t.vulnId;
                        return e.then(function() {
                            return k.recheckVulnerability(n, {
                                noPublishError: !0
                            })
                        }).then(function() {
                            o.$emit("axDeselectVulnerability", {
                                vulnId: n
                            })
                        }).
                        catch(function(e) {
                            return 401 === e.status ? i.reject(e) : (a.failures.push({
                                vulnId: n,
                                errorMessage: e.errorMessage
                            }), null)
                        })
                    },
                    i.when())
                }).then(function() {
                    if (r.resolve(), a.failures.length > 0) {
                        var i = e.extend(n.$new(), {
                            message: S("无法重新测试某些漏洞-它们已被选中.") + '<br/><strong class="block text-danger m-t-sm m-b-sm">错误:<br/></strong><ul>' + t.chain(a.failures).uniqBy(t.property("errorMessage")).map(function(e) {
                                var t = e.errorMessage;
                                return "<li>" + l(t) + "</li>"
                            }).join("").value() + "</ul>"
                        });
                        return d.alert({
                            scope: i
                        }).
                        finally(function() {
                            return i.$destroy()
                        })
                    }
                }).then(function() {
                    0 === a.failures.length && I.success(T.getPlural(s, "已创建扫描以检查所选的漏洞", "已创建了多个扫描以检查所选的漏洞"))
                }).
                finally(r.resolve)
            })
        }

        function V() {
            return c.addTarget().then(function(e) {
                a.go("app.target_config", {
                    returnUrl: R(),
                    targetId: e.targetId
                },
                {
                    inherit: !1
                })
            })
        }

        function O() {
            n.loadingTracker.cancel()
        }

        function H(e, t) {
            t !== e && (B(), q(), G())
        }

        function j(e, t) {
            e === t || J || a.reload(a.current)
        }

        function q() {
            var e = n.searchFilters,
            t = [];
            if (e.severity.length > 0 && t.push({
                key: "severity",
                label: S("严重性:"),
                value: e.severity.map(function(t) {
                    var n = e.severityList.find(function(e) {
                        return e.value === t
                    });
                    return T.getString(n.text)
                }).join(", ")
            }), e.criticality.length > 0 && t.push({
                label: S("临界性:"),
                key: "criticality",
                value: e.criticality.map(function(t) {
                    var n = e.criticalityList.find(function(e) {
                        return e.value === t
                    });
                    return T.getString(n.text)
                }).join(", ")
            }), e.status) {
                var r = e.statusList.find(function(t) {
                    return t.value === e.status
                });
                t.push({
                    key: "status",
                    label: S("状态:"),
                    value: T.getString(r.text)
                })
            }
            if (e.cvss) {
                var r = e.cvssList.find(function(t) {
                    return t.value === e.cvss
                });
                t.push({
                    key: "cvss",
                    label: "CVSS:",
                    value: T.getString(r.text)
                })
            }
            if (e.target) {
                var r = e.targetList.find(function(t) {
                    return t.targetId === e.target
                });
                t.push({
                    key: "target",
                    label: S("目标:"),
                    value: r ? r.address: T.getString("N/A")
                })
            }
            e.group.length > 0 && t.push({
                label: S("组:"),
                key: "group",
                value: e.group.map(function(t) {
                    var n = e.groupList.find(function(e) {
                        return e.groupId === t
                    });
                    return n ? T.getString(n.name) : T.getString("N/A")
                }).join(", ")
            }),
            e.vulnType && t.push({
                key: "vuln_type",
                label: S("漏洞类型:"),
                value: e.vulnTypeName || e.vulnType
            }),
            n.searchFilters.filterTags = t
        }

        function G() {
            J = !0;
            var t = n.searchFilters,
            r = t.severity,
            i = t.criticality,
            o = t.status,
            c = t.cvss,
            u = t.target,
            l = t.group,
            d = t.vulnType,
            p = function(t) {
                return e.isArray(t) && t.length > 0 ? t.join(",") : null !== t && "" !== t ? t: void 0
            },
            f = {
                severity: p(r),
                criticality: p(i),
                status: p(o),
                cvss: p(c),
                target: p(u),
                group: p(l),
                type: p(d),
                returnUrl: s.returnUrl
            };
            e.isString(a.current.name) && a.go(a.current.name, f, {
                inherit: !1
            }).
            finally(function() {
                J = !1
            })
        }

        function B() {
            var e = [],
            t = n.searchFilters,
            r = t.severity,
            i = t.criticality,
            o = t.status,
            a = t.cvss,
            s = t.target,
            c = t.group,
            u = t.vulnType;
            if (r.length > 0 && e.push("severity:" + r.join(",")), i.length > 0 && e.push("criticality:" + i.join(",")), o) switch (o) {
            case "rediscovered":
                e.push("status:open"),
                e.push("rediscovered:true");
                break;
            default:
                e.push("status:" + o)
            }
            if (a) switch (a) {
            case "4":
                e.push("cvss_score:<=" + a);
                break;
            case "4-7":
                e.push("cvss_score:>=4"),
                e.push("cvss_score:<=7");
                break;
            case "7":
                e.push("cvss_score:>=" + a)
            }
            s && e.push("target_id:" + s),
            c.length > 0 && e.push("group_id:" + c.join(",")),
            u && e.push("vt_id:" + u),
            n.searchFilters.searchQuery = e.join(";")
        }

        function W() {
            return Z(function() {
                return k.getVulnerabilityType(n.searchFilters.vulnType, {
                    tracker: n.loadingTracker,
                    cache: v
                }).then(function(e) {
                    var t = e.name;
                    n.searchFilters.vulnTypeName = t
                }).
                finally(q)
            })
        }

        function K(e, t) {
            return _.generateNewReport(e, t, {
                tracker: n.loadingTracker,
                onRetry: function() {
                    function n() {
                        return K(e, t)
                    }
                    return n
                } ()
            }).then(function() {
                I.success(T.getString("正在创建报表"))
            })
        }

        function z() {
            var t = n.loadingTracker.createPromise();
            return _.getExportTypes("vulnerabilities").then(function(t) {
                n.exportTemplateTypeList = t.map(function(t) {
                    return e.extend(t, {
                        sourceType: "vulnerabilities"
                    })
                })
            }).
            finally(t.resolve)
        }

        function Y(t, r) {
            if (ee.active()) {
                var i = e.extend(n.$new(), {
                    message: S("正在进行另一项下载.")
                });
                return d.alert({
                    scope: i
                }).
                finally(function() {
                    return i.$destroy()
                })
            }
            var o = n.loadingTracker.createPromise();
            return _.generateNewExport(t, r, {
                onRetry: function() {
                    function e() {
                        return Y(t, r)
                    }
                    return e
                } ()
            }).then(function(e) {
                "failed" !== e.status && I.success(T.getString("您的下载将在几分钟内自动启动")),
                Q(e.reportId)
            }).
            finally(o.resolve)
        }

        function Q(t) {
            var a, s, c = ee.createPromise(),
            u = !1;
            return u ? i.when() : (a = r(function() {
                return u = !0,
                _.getExport(t, {
                    tracker: ee,
                    noPublishError: !0
                }).then(function(t) {
                    if (null === t) {
                        var n = {
                            errorMessage: S("无法下载您的报告 [已删除报告]")
                        };
                        return c.reject(n),
                        i.reject(n)
                    }
                    if ("failed" === t.status) {
                        var n = {
                            errorMessage: S("无法导出数据 [失败]")
                        };
                        return i.reject(n)
                    } (t.downloadLinkPDF || t.downloadLinkHTML || t.downloadLinkXML) && (e.element("#download-helper").attr("src", t.downloadLinkPDF || t.downloadLinkHTML || t.downloadLinkXML), c.resolve())
                }).
                catch(function(e) {
                    throw c.reject(e),
                    o.$emit("axError", e),
                    e
                }).
                finally(function() {
                    u = !1
                })
            },
            5e3), s = n.$on("$destroy", a.cancel), c.promise.
            finally(function() {
                r.cancel(a),
                s()
            }), c.promise)
        }

        function Z(e) {
            var t = n.loadingTracker.createPromise();
            return i.when().then(e).
            finally(t.resolve)
        }

        function X() {
            return k.getVulnerabilities(void 0, void 0, 1, {
                noLoadingTracker: !0
            }).then(function(e) {
                return 0 === e.vulnerabilities.length && w.getTargets(void 0, void 0, 1, {
                    noLoadingTracker: !0
                }).then(function(e) {
                    return 0 === e.targets.length
                })
            }).then(function(e) {
                n.noTargetsOrScansInSystem = e
            })
        }
        var J = !1,
        ee = b({
            activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
        });
        e.extend(n, {
            loadingTracker: b({
                activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
            }),
            filterAsideVisible: !1,
            returnUrl: s.returnUrl,
            searchFilters: {
                searchQuery: "",
                severity: h.getStateParam("severity", !0, u.VULN_SEVERITY_LEVEL.map(function(e) {
                    return e.value
                })),
                severityList: u.VULN_SEVERITY_LEVEL,
                criticality: h.getStateParam("criticality", !0, u.BUSINESS_CRITICALITY.map(function(e) {
                    return e.value
                })),
                criticalityList: u.BUSINESS_CRITICALITY,
                status: h.getStateParam("status", !1, u.VULN_STATUS.map(function(e) {
                    return e.value
                }).concat(["!open"])),
                statusList: u.VULN_STATUS.concat([{
                    value: "!open",
                    text: S("已关闭")
                }]),
                cvss: h.getStateParam("cvss", !1, u.CVSS_SCORE.map(function(e) {
                    return e.value
                })),
                cvssList: u.CVSS_SCORE,
                target: h.getStateParam("target"),
                targetList: [],
                group: h.getStateParam("group", !0),
                groupList: [],
                vulnType: h.getStateParam("type"),
                vulnTypeName: null,
                filterTags: []
            },
            selectedItems: [],
            exportTemplateTypeList: [],
            noTargetsOrScansInSystem: !1
        }),
        e.extend(n, {
            addTargetModal: V,
            changeVulnStatus: E,
            currentUrl: R,
            onCreateIssues: F,
            onExport: U,
            onGenerateReport: D,
            onRecheckVulnerability: M,
            onVulnerabilitiesSelectionChanged: N,
            removeFilterTag: P,
            searchGroups: A,
            searchTargets: L,
            toggleFilter: $
        }),
        n.$on("$destroy", O),
        n.$watch(function() {
            return n.searchFilters.severity
        },
        H),
        n.$watch(function() {
            return n.searchFilters.criticality
        },
        H),
        n.$watch(function() {
            return n.searchFilters.status
        },
        H),
        n.$watch(function() {
            return n.searchFilters.cvss
        },
        H),
        n.$watch(function() {
            return n.searchFilters.target
        },
        H),
        n.$watch(function() {
            return n.searchFilters.group
        },
        H),
        n.$watch(function() {
            return n.searchFilters.vulnType
        },
        H),
        n.$watchCollection(function() {
            return s
        },
        j),
        function() {
            f.setDocumentTitle(S("漏洞")),
            f.setCurrentSection("vulns"),
            B(),
            q(),
            L(),
            A(),
            z(),
            n.searchFilters.vulnType && W(),
            X()
        } ()
    }
    n.$inject = ["$scope", "$interval", "$q", "$rootScope", "$state", "$stateParams", "axAddTargetModal", "axConstant", "axEscapeHtmlFilter", "axGeneralModal", "axGroupsCache", "axPage", "axReportOptionsModal", "axStateHelpers", "axTargetsCache", "axVulnTypesCache", "CurrentUser", "gettext", "gettextCatalog", "orderByFilter", "promiseTracker", "ReportsApi", "TargetGroupsApi", "TargetsApi", "toastr", "VulnerabilitiesApi"],
    e.module("WVS").controller("axListVulnsCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l, d, p, f, g, h) {
        function m(e, t) {
            var r = {
                current: e,
                next: t
            };
            return n.$broadcast("axSectionChanging", r),
            !0 !== r.cancel
        }

        function v() {
            n.loadingTracker.cancel()
        }
        var y = function(e) {
            return t.findIndex(n.sections.items, t.matchesProperty("name", e))
        };
        if (n.loadingTracker = p({
            activationDelay: a.PROMISE_TRACKER_ACTIVATION_DELAY
        }), n.currentSection = o.section, n.sections = {
            currentIndex: 0,
            items: [{
                name: "general",
                heading: l("一般")
            },
            {
                name: "crawl",
                heading: l("爬行")
            },
            {
                name: "http",
                heading: l("HTTP")
            },
            {
                name: "advanced",
                heading: l("高级")
            }]
        },
        "network" === h.target.targetType) { ["crawl", "http"].forEach(function(e) {
                var t = n.sections.items.findIndex(function(t) {
                    return t.name === e
                });
                t > -1 && n.sections.items.splice(t, 1)
            })
        }
        n.sections.currentIndex = y(o.section),
        n.uiForms = {},
        n.$on("$destroy", v),
        function() {
            c.setDocumentTitle(l("配置目标 - ") + h.target.address),
            c.setCurrentSection("targets")
        } (),
        n.onChangeSection = function(e, t) {
            e !== n.currentSection && (m(n.currentSection, e) ? n.changeSection(e) : t && t.preventDefault())
        },
        n.currentUrl = function() {
            return c.currentUrlEncoded()
        },
        n.onCreateScan = function() {
            var e = !1,
            t = null,
            r = n.currentUrl(),
            o = function(n) {
                var r = n.scanId;
                "instant" === n.scanningOptions.scheduleType && (e = !0, t = r)
            },
            a = function() {
                e ? i.go("app.scan_details", {
                    view: "stats",
                    scanId: t,
                    returnUrl: r
                },
                {
                    inherit: !1
                }) : i.go("app.list_scans", {
                    returnUrl: r
                },
                {
                    inherit: !1
                })
            };
            return u.createScansWizard([h.target], n.loadingTracker).then(a, null, o)
        },
        n.notifyTargetUpdated = function(e) {
            void 0 === e && (e = l("目标已更新")),
            g.success(d.getString(e))
        },
        n.askSaveChanges = function() {
            var t = e.extend(n.$new(), {
                message: l("保存当前的更改?")
            }),
            i = r.defer();
            return s.confirm({
                scope: t
            }).then(i.resolve, i.reject).
            finally(function() {
                return t.$destroy()
            }),
            i.promise
        },
        n.reloadSection = function() {
            i.go(i.current.name, {
                section: n.currentSection
            },
            {
                reload: i.current.name
            })
        },
        n.changeSection = function(e) {
            y(e) !== n.sections.currentIndex && i.go(i.current.name, {
                section: e
            },
            {
                reload: i.current.name
            })
        }
    }
    n.$inject = ["$scope", "$q", "$state", "$stateParams", "axConstant", "axGeneralModal", "axPage", "axScansModal", "gettext", "gettextCatalog", "promiseTracker", "CurrentUser", "toastr", "targetInfo"],
    e.module("WVS").controller("axTargetConfigCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l, d, p, f, g, h, m, v, y, S, T, x, b, _, C, w, I, k, A, L, $) {
        function E(t) {
            return ue(function() {
                var r = e.isString(t) && t.length > 0 ? "name:*" + encodeURIComponent(t) : void 0;
                return i.when().then(function() {
                    if (!0 !== x.hasFeature("target_groups")) return i.reject({
                        status: 403
                    })
                }).then(function() {
                    return A.getGroups(r, void 0, 10, {
                        cache: h,
                        noPublishError: !0
                    }).then(function(e) {
                        var t = e.groups;
                        n.searchFilters.groupList = t
                    })
                }).then(function() {
                    if (n.searchFilters.group.length > 0) return n.searchFilters.group.reduce(function(e, t) {
                        return n.searchFilters.groupList.find(function(e) {
                            return e.groupId === t
                        }) ? e: e.then(function() {
                            return A.getGroup(t, {
                                cache: h,
                                noPublishError: !0
                            })
                        }).then(function(e) {
                            n.searchFilters.groupList.push(e)
                        })
                    },
                    i.when())
                }).then(function() {
                    n.searchFilters.groupList = w(n.searchFilters.groupList, "name")
                }).
                catch(function(e) {
                    return 403 === e.status || e.publishResponseError && e.publishResponseError(e),
                    i.reject(e)
                }).
                finally(Z)
            })
        }

        function R() {
            n.filterAsideVisible = !n.filterAsideVisible
        }

        function P() {
            var e = n.targetList.gridApi && n.targetList.gridApi.selection;
            return e ? e.getSelectedRows() : []
        }

        function N() {
            var e = n.targetList.gridApi && n.targetList.gridApi.selection;
            return e ? e.getSelectedCount() : 0
        }

        function D() {
            return l.addTarget().then(function(e) {
                a.go("app.target_config", {
                    returnUrl: M(),
                    targetId: e.targetId
                },
                {
                    inherit: !1
                })
            })
        }

        function U() {
            var t = e.extend(n.$new(), {
                message: _(N() > 1 ? "确实要删除选定的目标吗？对所选目标的扫描也将被删除.": "确实要删除选定的目标吗？对所选目标的扫描也将被删除.")
            });
            return g.confirm({
                scope: t
            }).then(function() {
                return J(!0)
            }).
            finally(function() {
                return t.$destroy()
            })
        }

        function F() {
            return d.configureGroups(P())
        }

        function M() {
            return m.currentUrlEncoded()
        }

        function V(e) {
            var t = n.searchFilters;
            switch (t.filterTags.splice(t.filterTags.indexOf(e), 1), e.key) {
            case "threat":
                t.threatLevel = [];
                break;
            case "criticality":
                t.criticality = [];
                break;
            case "type":
                t.type = [];
                break;
            case "group":
                t.group = [];
                break;
            case "scanned":
                t.lastScannedType = null;
                break;
            case "free_text":
                t.freeText = null
            }
            X()
        }

        function O() {
            return P().filter(function(e) {
                return !! e.lastScanResultId
            }).length > 0
        }

        function H() {
            v.chooseReportOptions().then(function(e) {
                var t = P().filter(function(e) {
                    return !! e.lastScanResultId
                }).map(function(e) {
                    return e.targetId
                });
                return ne(e.templateId, {
                    listType: "targets",
                    idList: t
                })
            }).then(function() {
                a.go("app.list_reports", {
                    returnUrl: M()
                },
                {
                    inherit: !1
                })
            })
        }

        function j() {
            return N() > 0 && P().filter(function(e) {
                return !! e.lastScanResultId
            }).length > 0
        }

        function q(e, t) {
            return ie(e, {
                listType: t,
                idList: P().filter(function(e) {
                    return !! e.lastScanResultId
                }).map(function(e) {
                    return e.targetId
                })
            })
        }

        function G() {
            var e = N(),
            t = !1,
            r = null,
            i = M(),
            o = function(i) {
                var o = i.target,
                a = i.scanId,
                s = i.scanningOptions;
                n.targetList.gridApi.selection.unSelectRow(o),
                1 === e && "instant" === s.scheduleType && (t = !0, r = a)
            },
            s = function() {
                t ? a.go("app.scan_details", {
                    view: "stats",
                    scanId: r,
                    returnUrl: i
                },
                {
                    inherit: !1
                }) : a.go("app.list_scans", {
                    returnUrl: i
                },
                {
                    inherit: !1
                })
            };
            return y.createScansWizard(P(), n.loadingTracker).then(s, null, o)
        }

        function B() {
            n.loadingTracker.cancel()
        }

        function W(r) {
            var o = n.loadingTracker.createPromise();
            return i.when().then(function() {
                n.targetList.gridApi.infiniteScroll.saveScrollPercentage()
            }).then(function() {
                return L.getTargets(Q(), n.targetList.nextCursor, t.get(r, "limit", p.LIST_PAGE_SIZE), {
                    onRetry: function() {
                        function e() {
                            return W(r)
                        }
                        return e
                    } ()
                })
            }).then(function(t) {
                var r = t.targets,
                i = t.pagination;
                r.forEach(function(e) {
                    n.targetList.items.find(function(t) {
                        return t.targetId === e.targetId
                    }) || n.targetList.items.push(e)
                }),
                n.targetList.nextCursor = i.nextCursor,
                n.targetList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(i.nextCursor))
            }).
            catch(function(e) {
                return n.targetList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                i.reject(e)
            }).
            finally(o.resolve)
        }

        function K(t) {
            n.targetList.hasFilters = e.isString(t) && t.length > 0
        }

        function z(e, t) {
            t !== e && ("before_date" !== e ? (Z(), X(), le()) : (n.searchFilters.lastScannedDate = null, n.searchFilters.lastScannedDateCalendarVisible = !0))
        }

        function Y(e, t) {
            e === t || de || a.reload(a.current)
        }

        function Q() {
            var e = n.searchFilters,
            r = [],
            i = t.curryRight(t.join, 2)(",");
            return e.threatLevel.length > 0 && r.push("threat:" + i(e.threatLevel)),
            e.criticality.length > 0 && r.push("criticality:" + i(e.criticality)),
            e.type.length > 0 && r.push("type:" + i(e.type)),
            e.group.length > 0 && r.push("group_id:" + i(e.group)),
            "never" === e.lastScannedType ? r.push("never_scanned") : "before_date" === e.lastScannedType && e.lastScannedDate && r.push("last_scanned:<=" + encodeURIComponent(b(e.lastScannedDate, "yyyy-MM-ddTHH:mm:ss.sssZ"))),
            e.freeText && r.push("text_search:*" + encodeURIComponent(e.freeText)),
            r.join(";")
        }

        function Z() {
            var r = n.searchFilters,
            i = [],
            o = t.curryRight(t.join, 2)(", "),
            a = function(t, n) {
                return e.isObject(n) && n.hasOwnProperty(t) ? C.getString(String(n[t])) : _("N/A")
            };
            r.threatLevel.length > 0 && i.push({
                key: "threat",
                label: _("Threat:"),
                value: o(r.threatLevel.map(function(e) {
                    var t = r.threatLevelList.find(function(t) {
                        return t.value == e
                    });
                    return a("text", t)
                }))
            }),
            r.criticality.length > 0 && i.push({
                label: _("Criticality:"),
                key: "criticality",
                value: o(r.criticality.map(function(e) {
                    var t = r.criticalityList.find(function(t) {
                        return t.value == e
                    });
                    return a("text", t)
                }))
            }),
            r.type.length > 0 && i.push({
                label: _("Target Type:"),
                key: "type",
                value: o(r.type.map(function(e) {
                    var t = r.typeList.find(function(t) {
                        return t.value == e
                    });
                    return a("text", t)
                }))
            }),
            r.group.length > 0 && i.push({
                label: _("Groups:"),
                key: "group",
                value: o(r.group.map(function(e) {
                    var t = r.groupList.find(function(t) {
                        return t.groupId === e
                    });
                    return a("name", t)
                }))
            }),
            "never" === r.lastScannedType && i.push({
                key: "scanned",
                label: _("Last Scanned:"),
                value: C.getString("从不")
            }),
            "before_date" === r.lastScannedType && r.lastScannedDate && i.push({
                key: "scanned",
                label: _("Last Scanned:"),
                value: "Before " + b(r.lastScannedDate, "mediumDate")
            }),
            r.freeText && i.push({
                key: "free_text",
                label: _("Free Text:"),
                value: r.freeText
            }),
            r.filterTags = i
        }

        function X() {
            var e = n.searchFilters;
            de = !0;
            var t = {};
            e.threatLevel.length > 0 && (t.threat = e.threatLevel.join(",")),
            e.criticality.length > 0 && (t.criticality = e.criticality.join(",")),
            e.type.length > 0 && (t.type = e.type.join(",")),
            e.group.length > 0 && (t.group = e.group.join(",")),
            "never" === e.lastScannedType && (t.never_scanned = !0),
            "before_date" === e.lastScannedType && e.lastScannedDate && (t.scanned_before = b(e.lastScannedDate, "yyyy-MM-ddTHH:mm:ss.sssZ")),
            e.freeText && (t.free = e.freeText),
            s.returnUrl && (t.returnUrl = s.returnUrl),
            n.launchScanView && (t.ls = s.ls),
            n.generateReportView && (t.gr = s.gr),
            a.go(a.current.name, t, {
                inherit: !1
            }).
            finally(function() {
                de = !1
            })
        }

        function J(r) {
            void 0 === r && (r = !1);
            var a = n.loadingTracker.createPromise(),
            s = [];
            return P().reduce(function(e, o) {
                var a = function(e) {
                    "target in use" === t.toLower(t.get(e, "data.message", "")) && (e.errorMessage = C.getString("目标 {{address}} 无法删除", {
                        address: o.address
                    }))
                };
                return e.then(function() {
                    return L.removeTarget(o.targetId, {
                        formatError: a,
                        noPublishError: !0
                    })
                }).then(function() {
                    n.targetList.gridApi.selection.unSelectRow(o),
                    n.targetList.items.splice(n.targetList.items.indexOf(o), 1)
                }).
                catch(function(e) {
                    return s.push(o),
                    r ? i.when() : i.reject(e)
                })
            },
            i.when()).then(function() {}).
            finally(function() {
                if (s.length > 1) {
                    var t = e.extend(o.$new(), {
                        message: [_("<p>无法删除下列目标:</p>"), "<ul>"].concat(s.map(function(e) {
                            return "<li>" + f(e.address) + "</li>"
                        }), ["</ul>"]).join("")
                    });
                    g.alert({
                        scope: t,
                        backdrop: "static",
                        keyboard: !1
                    }).
                    finally(function() {
                        return t.$destroy()
                    })
                } else if (1 === s.length) {
                    var n = _("无法删除目标, 因为它正被扫描.");
                    o.$emit("axError", {
                        errorMessage: n
                    })
                }
            }).
            finally(a.resolve)
        }

        function ee() {
            n.targetList.gridApi && n.targetList.gridApi.infiniteScroll.resetScroll(!1, void 0 !== n.targetList.nextCursor)
        }

        function te() {
            return u.addGroup().then(F)
        }

        function ne(e, t) {
            return ue(function() {
                return k.generateNewReport(e, t, {
                    tracker: n.loadingTracker,
                    onRetry: function() {
                        function n() {
                            return ne(e, t)
                        }
                        return n
                    } ()
                }).then(function() {
                    $.success(C.getString("正在创建报表"))
                })
            })
        }

        function re() {
            return k.getExportTypes("targets", {
                tracker: n.loadingTracker
            }).then(function(t) {
                n.exportTemplateTypeList = t.map(function(t) {
                    return e.extend(t, {
                        sourceType: "targets"
                    })
                })
            })
        }

        function ie(t, r) {
            if (fe.active()) {
                var i = e.extend(n.$new(), {
                    message: _("正在进行另一项下载.")
                });
                return g.alert({
                    scope: i
                }).
                finally(function() {
                    return i.$destroy()
                })
            }
            var o = n.loadingTracker.createPromise();
            return k.generateNewExport(t, r, {
                onRetry: function() {
                    function e() {
                        return ie(t, r)
                    }
                    return e
                } ()
            }).then(function(e) {
                "failed" !== e.status && $.success(C.getString("您的下载将在几分钟内自动启动")),
                oe(e.reportId)
            }).
            finally(o.resolve)
        }

        function oe(t) {
            var a, s, c = fe.createPromise(),
            u = !1;
            return u ? i.when() : (a = r(function() {
                return u = !0,
                k.getExport(t, {
                    tracker: fe,
                    noPublishError: !0
                }).then(function(t) {
                    if (null === t) {
                        var n = {
                            errorMessage: _("无法下载您的报告 [已删除报告]")
                        };
                        return c.reject(n),
                        i.reject(n)
                    }
                    if ("failed" === t.status) {
                        var n = {
                            errorMessage: _("无法导出数据 [失败]")
                        };
                        return i.reject(n)
                    } (t.downloadLinkPDF || t.downloadLinkHTML || t.downloadLinkXML) && (e.element("#download-helper").attr("src", t.downloadLinkPDF || t.downloadLinkHTML || t.downloadLinkXML), c.resolve())
                }).
                catch(function(e) {
                    throw c.reject(e),
                    o.$emit("axError", e),
                    e
                }).
                finally(function() {
                    u = !1
                })
            },
            5e3), s = n.$on("$destroy", a.cancel), c.promise.
            finally(function() {
                r.cancel(a),
                s()
            }), c.promise)
        }

        function ae() {
            T.set("list-targets", n.targetList.gridApi.saveState.save())
        }

        function se() {
            var e = T.get("list-targets");
            e && n.targetList.gridApi.saveState.restore(n, e)
        }

        function ce() {
            T.remove("list-targets"),
            a.reload(a.current)
        }

        function ue(e) {
            var t = n.loadingTracker.createPromise();
            return i.when().then(e).
            finally(t.resolve)
        }

        function le() {
            n.targetList.items.splice(0),
            n.targetList.nextCursor = void 0,
            n.targetList.gridApi && n.targetList.gridApi.selection && n.targetList.gridApi.selection.clearSelectedRows(),
            ee();
            var e = i.defer();
            return c(function() {
                pe.promise.then(function() {
                    return W()
                }).then(function() {
                    return e.resolve()
                },
                e.reject)
            }),
            e.promise
        }
        var de = !1,
        pe = i.defer(),
        fe = I({
            activationDelay: p.PROMISE_TRACKER_ACTIVATION_DELAY
        });
        if (n.loadingTracker = I({
            activationDelay: p.PROMISE_TRACKER_ACTIVATION_DELAY
        }), n.targetList = {
            items: [],
            nextCursor: void 0,
            hasFilters: !1
        },
        n.targetList.gridOptions = {
            data: n.targetList.items,
            appScopeProvider: n,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/targets/list-targets/cell/address.html"),
                displayName: C.getString("地址"),
                field: "address",
                width: 320
            },
            {
                cellTooltip: !0,
                displayName: C.getString("描述"),
                field: "description",
                width: 240
            },
            {
                cellFilter: "axBusinessCriticality",
                displayName: C.getString("业务临界性"),
                field: "criticality",
                visible: o.appConfig.showBusinessCriticality,
                width: 160
            },
            {
                cellTemplate: __axtr("/templates/targets/list-targets/cell/status.html"),
                displayName: C.getString("状态"),
                field: "status",
                width: 300
            },
            {
                cellTemplate: __axtr("/templates/targets/list-targets/cell/vuln-counters.html"),
                displayName: C.getString("漏洞"),
                field: "severityCounts",
                width: 160
            }],
            gridMenuCustomItems: [{
                title: C.getString("重置"),
                action: ce
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.targetId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.targetId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    n.targetList.gridApi = e,
                    e.infiniteScroll.on.needLoadMoreData(n, W),
                    e.colResizable.on.columnSizeChanged(n, ae),
                    e.core.on.columnVisibilityChanged(n, ae),
                    e.core.on.sortChanged(n, ae),
                    pe.resolve(e)
                }
                return e
            } ()
        },
        !0 !== x.hasFeature("target_business_criticality")) {
            var ge = n.targetList.gridOptions.columnDefs.findIndex(function(e) {
                return "criticality" === e.field
            });
            ge > -1 && n.targetList.gridOptions.columnDefs.splice(ge, 1)
        }
        n.searchFilters = {
            threatLevel: S.getStateParam("threat", !0, p.THREAT_LEVEL.map(function(e) {
                return e.value
            })),
            threatLevelList: p.THREAT_LEVEL,
            criticality: S.getStateParam("criticality", !0, p.BUSINESS_CRITICALITY.map(function(e) {
                return e.value
            })),
            criticalityList: p.BUSINESS_CRITICALITY,
            lastScannedType: s.never_scanned ? "never": s.scanned_before ? "before_date": null,
            lastScannedTypeList: [{
                value: null,
                text: _("所有")
            },
            {
                value: "never",
                text: _("从不扫描")
            },
            {
                value: "before_date",
                text: _("在一个特殊日期前")
            }],
            lastScannedDate: s.scanned_before ? new Date(S.getStateParam("scanned_before")) : null,
            lastScannedDateCalendarVisible: !0,
            freeText: S.getStateParam("free"),
            group: S.getStateParam("group", !0),
            groupList: [],
            type: S.getStateParam("type", !0, p.TARGET_TYPE.map(function(e) {
                return e.value
            })),
            typeList: p.TARGET_TYPE,
            filterTags: []
        },
        n.filterAsideVisible = !1,
        n.lastScannedDateDatePickerOptions = {
            showWeeks: !1
        },
        n.launchScanView = !!s.ls,
        n.generateReportView = !!s.gr,
        n.exportTemplateTypeList = [],
        n.selectedItems = P,
        n.selectedItemsCount = N,
        n.toggleFilter = R,
        n.addTargetModal = D,
        n.onDeleteSelectedTargets = U,
        n.updateGroupMembership = F,
        n.searchGroups = E,
        n.currentUrl = M,
        n.removeFilterTag = V,
        n.canGenerateReport = O,
        n.onGenerateReport = H,
        n.onScanModal = G,
        n.onExport = q,
        n.canExport = j,
        n.$on("$destroy", B),
        n.$on("axScrollTop", ee),
        n.$on("$destroy", o.$on("axCreateGroupModal", te)),
        n.$watch("searchFilters.threatLevel", z),
        n.$watch("searchFilters.criticality", z),
        n.$watch("searchFilters.type", z),
        n.$watch("searchFilters.group", z),
        n.$watch("searchFilters.lastScannedDate", z),
        n.$watch("searchFilters.freeText", z),
        n.$watch("searchFilters.lastScannedType", z),
        n.$watchCollection(function() {
            return s
        },
        Y),
        n.$watch(Q, K),
        function() {
            Z(),
            E(),
            re(),
            pe.promise.then(function() {
                return W()
            }).then(se).then(function() {
                c(function() {
                    return n.targetList.gridApi.core.handleWindowResize()
                },
                0)
            }),
            m.setDocumentTitle(_("目标")),
            m.setCurrentSection("targets"),
            s.ls ? (m.setDocumentTitle(_("目标 - 创建扫描")), m.setCurrentSection("")) : s.gr && (m.setDocumentTitle(_("目标-生成报告")), m.setCurrentSection(""))
        } ()
    }

    function r(e) {
        var t = function(e, t, n) {
            e.documentTitle = t("目标"),
            e.globalHelpLink = n.HELP_LINKS["targets.list"]
        };
        t.$inject = ["$rootScope", "gettext", "axConstant"];
        var r = function(e) {
            e.globalHelpLink = ""
        };
        r.$inject = ["$rootScope"],
        e.state("app.list_targets", {
            url: "?threat=&criticality=&type=&scanned_before=&never_scanned=&group=&free=&ls=&gr=&returnUrl=",
            controller: n,
            templateUrl: __axtr("/templates/targets/list-targets/list-targets.html"),
            reloadOnSearch: !1,
            data: {
                page: {
                    icon: "fa-dot-circle-o",
                    section: "targets"
                }
            },
            onEnter: t,
            onExit: r
        })
    }
    n.$inject = ["$scope", "$interval", "$q", "$rootScope", "$state", "$stateParams", "$timeout", "axAddGroupModal", "axAddTargetModal", "axConfigureGroupsModal", "axConstant", "axEscapeHtmlFilter", "axGeneralModal", "axGroupsCache", "axPage", "axReportOptionsModal", "axScansModal", "axStateHelpers", "axUserPreferences", "CurrentUser", "dateFilter", "gettext", "gettextCatalog", "orderByFilter", "promiseTracker", "ReportsApi", "TargetGroupsApi", "TargetsApi", "toastr"],
    e.module("WVS").config(["$stateProvider", r])
} (angular, _),
function(e, t) {
    "use strict";

    function n(t, n, r, i, o, a, s, c, u, l, d, p) {
        function f(e, n) {
            var r = {
                current: e,
                next: n
            };
            return t.$broadcast("axSectionChanging", r),
            !0 !== r.cancel
        }

        function g() {
            t.loadingTracker.cancel()
        }
        var h = function(e) {
            return t.sections.items.find(function(t) {
                return t.name === e
            })
        },
        m = function(e) {
            var n = t.sections.items.findIndex(function(t) {
                return t.name === e
            });
            return n > -1 ? t.sections.items.splice(n, 1) : null
        };
        t.loadingTracker = d({
            activationDelay: o.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        t.uiForms = {},
        t.sections = {
            current: null,
            items: [{
                name: "updates",
                heading: u("产品更新")
            },
            {
                name: "proxy",
                heading: u("代理设置")
            },
            {
                name: "notifications",
                heading: u("通知设置")
            },
            {
                name: "users",
                heading: u("用户设置")
            },
            {
                name: "target-groups",
                heading: u("目标组")
            },
            {
                name: "issue-trackers",
                heading: u("问题跟踪器")
            },
            {
                name: "scanning-profiles",
                heading: u("扫描选项")
            },
            {
                name: "excluded-hours",
                heading: u("排除的小时数")
            },
            {
                name: "workers",
                heading: u("引擎")
            }]
        },
        t.sections.current = h(i.section),
        t.showToolbar = !1,
        t.$on("$destroy", g),
        function() {
            s.setDocumentTitle(u("系统配置")),
            s.setCurrentSection("settings"),
            c.hasFeature("multi_user") && c.hasPermission("childUsers") || m("users"),
            c.hasFeature("bug_tracking_integration") && c.hasPermission("viewIssueTrackers") || m("issue-trackers"),
            c.hasFeature("target_groups") || m("target-groups"),
            c.hasFeature("scanning_profiles") || m("scanning-profiles"),
            c.hasPermission("systemConfig") || (m("notifications"), m("proxy"), m("scanning-profiles")),
            c.hasFeature("multi_engine") || m("workers"),
            t.sections.items.forEach(function(e, t) {
                return e.index = t
            }),
            t.showToolbar = c.hasPermission("systemConfig") || c.hasFeature("multi_engine") || "excluded-hours" === i.section && c.hasPermission("manageExcludedHours") || "target-groups" === i.section && c.hasFeature("target_groups") && (c.hasPermission("addGroup") || c.hasPermission("removeGroup"))
        } (),
        t.currentUrl = function() {
            return s.currentUrlEncoded()
        },
        t.onChangeSection = function(e, n) {
            e !== t.sections.current.name && (f(t.sections.current.name, e) ? t.changeSection(e) : n && n.preventDefault())
        },
        t.reloadSection = function() {
            r.go(r.current.name, {
                section: t.sections.current.name
            },
            {
                reload: r.current.name
            })
        },
        t.changeSection = function(e) {
            var n = h(e);
            n && n.name !== t.sections.current.name && r.go(r.current.name, {
                section: e
            },
            {
                reload: r.current.name
            })
        },
        t.notifySettingsUpdated = function(e) {
            void 0 === e && (e = u("设置已更新")),
            p.success(l.getString(e))
        },
        t.askSaveChanges = function() {
            var r = e.extend(t.$new(), {
                message: u("保存当前的更改?")
            }),
            i = n.defer(),
            o = i.resolve,
            s = i.notify,
            c = i.reject,
            l = i.promise;
            return a.confirm({
                scope: r
            }).then(o, s, c).
            finally(function() {
                return r.$destroy()
            }),
            l
        }
    }
    n.$inject = ["$scope", "$q", "$state", "$stateParams", "axConstant", "axGeneralModal", "axPage", "CurrentUser", "gettext", "gettextCatalog", "promiseTracker", "toastr"],
    e.module("WVS").controller("axSystemConfigCtrl", n)
} (angular, _),
function(e, t) {
    "use strict";

    function n(e) {
        var t = function(e) {
            e.scrollTopActionVisible = !1
        };
        t.$inject = ["$rootScope"];
        var n = function(e) {
            e.scrollTopActionVisible = !0
        };
        n.$inject = ["$rootScope"],
        e.state("app.scanning_profile", {
            url: "settings/scanning-profiles/:profileId/?returnUrl=",
            reloadOnSearch: !1,
            controller: r,
            controllerAs: "$ctrl",
            templateUrl: __axtr("/templates/settings/scanning-profile/scanning-profile.html"),
            params: {
                profileId: "create"
            },
            data: {
                page: {
                    icon: "fa-cog",
                    section: "settings"
                }
            },
            onEnter: t,
            onExit: n
        })
    }
    var r = function() {
        function e(e, t, n, r, i, o, a, s, c, u) {
            var l = this;
            this.$scope = e,
            this.$q = t,
            this.$state = n,
            this.$stateParams = r,
            this.axConstant = i,
            this.axPage = o,
            this.gettext = a,
            this.promiseTracker = s,
            this.ScannerApi = c,
            this.toastr = u,
            this.loadingTracker = s({
                activationDelay: i.PROMISE_TRACKER_ACTIVATION_DELAY
            }),
            this.scanningProfile = {
                name: "",
                checks: [],
                isCustom: !0
            },
            this.treeOptions = {
                nodeChildren: "checks",
                allowDeselect: !1,
                dirSelectable: !0,
                equality: function() {
                    function e(e, t) {
                        return e == t || !(!e || !t) && e.key === t.key
                    }
                    return e
                } (),
                isLeaf: function() {
                    function e(e) {
                        return null === e.checks
                    }
                    return e
                } (),
                injectClasses: {
                    iLeaf: "fa fa-file-text",
                    iExpanded: "fa fa-folder-open",
                    iCollapsed: "fa fa-folder",
                    li: "scanning-profile-tree__li",
                    ul: "scanning-profile-tree__ul"
                }
            },
            this.expandedNodes = [],
            this.treeModel = [],
            this.treeOrderByExpr = "title",
            this.selectedNode = null,
            this.searchTerm = "",
            this.selectedChecks = {
                web: []
            },
            e.$on("$destroy",
            function() {
                return l._destroy()
            }),
            e.$watchCollection(function() {
                return l.selectedChecks.web
            },
            function() {
                return l._updateScanningProfileChecks()
            }),
            this._init()
        }
        return e.prototype.onNodeSelected = function(e, n) {
            if (n);
            else {
                var r = t.find(this.expandedNodes, t.matchesProperty("key", e.key));
                r > -1 && this.expandedNodes.splice(r, 1)
            }
        },
        e.prototype.toggleCheckMark = function(e, n) {
            var r = this,
            i = e.isChecked = !e.isChecked;
            if (this.toggleSelectedWebCheck(e, e.isChecked), e.checks && this._wt(e.checks,
            function(e) {
                e.isChecked = i,
                r.toggleSelectedWebCheck(e, e.isChecked)
            }), n.length > 1) for (var o = 1; o < n.length; o++) {
                var a = n[o],
                s = !(!a.checks || !t.some(a.checks,
                function(e) {
                    return e.isChecked
                }));
                s !== a.isChecked && (a.isChecked = s, this.toggleSelectedWebCheck(a, a.isChecked))
            }
        },
        e.prototype.toggleSelectedWebCheck = function(e, t) {
            var n = this.selectedChecks.web.indexOf(e.keyPath);
            t ? n < 0 && this.selectedChecks.web.push(e.keyPath) : n > -1 && this.selectedChecks.web.splice(n, 1)
        },
        e.prototype.onSave = function() {
            var e = this,
            t = this,
            n = t.$q,
            r = t.$state,
            i = t.$stateParams,
            o = t.ScannerApi,
            a = t.toastr,
            s = this.loadingTracker.createPromise();
            return n.when().then(function() {
                return "create" === i.profileId ? o.createScanningProfile(e.scanningProfile) : o.updateScanningProfile(e.scanningProfile)
            }).then(function(t) {
                if ("create" === i.profileId) return a.success("扫描配置文件已创建"),
                r.go(r.current, {
                    profileId: t.profileId
                },
                {
                    inherit: !0,
                    reload: !1,
                    replace: !0
                });
                a.success("扫描配置文件已更新"),
                e.scanningProfile = t
            }).
            finally(s.resolve)
        },
        e.prototype._init = function() {
            var e = this,
            t = this,
            n = t.$q,
            r = t.$stateParams,
            i = t.gettext,
            o = t.ScannerApi,
            a = t.axPage;
            a.setDocumentTitle(i("create" === r.profileId ? "设置-创建扫描类型": "设置-编辑扫描类型")),
            a.setCurrentSection("settings");
            var s = this.loadingTracker.createPromise();
            n.when().then(function() {
                return o.getWebScanningChecks({
                    noPublishError: !0
                })
            }).then(function(t) {
                e.treeModel = t.checks,
                e.selectedNode = t.checks[0],
                e.expandedNodes.push(e.selectedNode)
            }).then(function() {
                if ("create" !== r.profileId) return o.getScanningProfile(r.profileId).then(function(t) {
                    e.scanningProfile = t
                }).then(function() {
                    e.treeModel[0].isChecked = !0,
                    e._wt(e.treeModel[0].checks,
                    function(t) {
                        if (t.isChecked = null == e.scanningProfile.checks.find(function(e) {
                            return e.substr(3) === t.keyPath
                        }), !t.isChecked && t.checks) return e._wt(t.checks,
                        function(e) {
                            return e.isChecked = !1
                        }),
                        !1
                    }),
                    e._wt(e.treeModel[0].checks,
                    function(t) { ! t.isChecked && t.checks && t.checks.forEach(function(t) {
                            t.isChecked = e.scanningProfile.checks.indexOf("+wvs" + t.keyPath) > -1
                        })
                    }),
                    e._wt(e.treeModel,
                    function(t) {
                        t.isChecked && e.selectedChecks.web.push(t.keyPath)
                    })
                });
                e._wt(e.treeModel[0].checks,
                function(t) {
                    t.isChecked && e.selectedChecks.web.push(t.keyPath)
                })
            }).
            finally(s.resolve)
        },
        e.prototype._destroy = function() {
            this.loadingTracker.cancel()
        },
        e.prototype._wt = function(e, t) {
            for (var n = 0; n < e.length; n++) { ! 1 !== t(e[n]) && (e[n].checks && this._wt(e[n].checks, t))
            }
        },
        e.prototype._updateScanningProfileChecks = function() {
            var e = this;
            if (this.treeModel.length > 0) return this.scanningProfile.checks = [],
            this._wt(this.treeModel[0].checks,
            function(t) {
                if (!t.isChecked && (e.scanningProfile.checks.indexOf(t.parentKeyPath) < 0 && e.scanningProfile.checks.push(t.keyPath), t.checks)) return ! 1
            }),
            void this.scanningProfile.checks.forEach(function(e, t, n) {
                "/" === e[0] && (n[t] = "wvs" + e)
            })
        },
        e.$inject = ["$scope", "$q", "$state", "$stateParams", "axConstant", "axPage", "gettext", "promiseTracker", "ScannerApi", "toastr"],
        e
    } ();
    e.module("WVS").config(["$stateProvider", n])
} (angular, _),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l, d, p, f, g) {
        function h() {
            var e = t.groupList.gridApi ? t.groupList.gridApi.selection: null;
            return e ? e.getSelectedRows() : []
        }

        function m() {
            var e = t.loadingTracker.createPromise().resolve,
            n = {
                accessAllGroups: t.userProfile.accessAllGroups,
                groups: h().map(function(e) {
                    return e.groupId
                })
            };
            return u.setAccess(t.userProfile.userId, n, {
                onRetry: function() {
                    function e() {
                        return m()
                    }
                    return e
                } ()
            }).then(function() {
                f.success(l.getString("已更新权限"))
            }).then(function() {
                return t.canNavigateBack() ? t.navigateBack() : i.go("app.edit_user", {
                    userId: t.userProfile.userId
                },
                {
                    inherit: !1
                })
            }).
            finally(e)
        }

        function v() {
            return ! e.equals(T(), w)
        }

        function y() {
            a.addGroup().then(function(e) {
                t.groupList.items.push(e)
            })
        }

        function S() {
            t.loadingTracker.cancel()
        }

        function T() {
            return {
                access_all_groups: t.userProfile.accessAllGroups,
                group_id_list: h().map(function(e) {
                    return e.groupId
                })
            }
        }

        function x() {
            var n = t.loadingTracker.createPromise();
            return u.getUser(t.userProfile.userId).then(function(n) {
                return e.merge(t.userProfile, n)
            }).
            finally(n.resolve)
        }

        function b() {
            var e = t.loadingTracker.createPromise();
            return p.getGroups(void 0, t.groupList.nextCursor, s.LIST_PAGE_SIZE).then(function(e) {
                var n = e.groups,
                r = e.pagination;
                t.groupList.items.push.apply(t.groupList.items, n),
                t.groupList.nextCursor = r.nextCursor
            }).
            finally(e.resolve)
        }

        function _() {
            var e = t.loadingTracker.createPromise();
            return u.getAccess(t.userProfile.userId, {
                onRetry: function() {
                    function e() {
                        return _()
                    }
                    return e
                } ()
            }).then(function(e) {
                if (t.groupList.items.length > 0) {
                    var r = e.groups;
                    e.accessAllGroups !== t.userProfile.accessAllGroups && n.warn("用户访问可能处于不正确的状态", {
                        ua: e.accessAllGroups,
                        aag: t.userProfile.accessAllGroups
                    }),
                    C.promise.then(function(e) {
                        t.groupList.items.forEach(function(t) {
                            r.indexOf(t.groupId) > -1 && e.selection.selectRow(t)
                        })
                    })
                }
            }).then(function() {
                w = T()
            }).
            finally(e.resolve)
        }
        var C = r.defer(),
        w = null;
        t.loadingTracker = d({
            activationDelay: s.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        t.userProfile = {
            userId: o.userId,
            accessAllGroups: !1,
            fullName: ""
        },
        t.groupList = {
            items: [],
            nextCursor: void 0
        },
        t.groupList.gridOptions = {
            data: t.groupList.items,
            appScopeProvider: t,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableHorizontalScrollbar: g.scrollbars.ALWAYS,
            enableVerticalScrollbar: g.scrollbars.ALWAYS,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                field: "name",
                displayName: l.getString("组名"),
                width: 320
            },
            {
                field: "description",
                displayName: l.getString("描述"),
                width: 240
            },
            {
                field: "targetCount",
                displayName: l.getString("组内目标"),
                width: 150
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.groupId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.groupId
                }
                return e
            } (),
            onRegisterApi: function() {
                function e(e) {
                    t.groupList.gridApi = e,
                    C.resolve(e)
                }
                return e
            } ()
        },
        t.selectedGroups = h,
        t.update = m,
        t.hasChanges = v,
        t.onAddGroup = y,
        t.$on("destroy", S),
        function() {
            c.setDocumentTitle("目标组-配置权限"),
            c.setCurrentSection("settings");
            var e = t.loadingTracker.createPromise();
            C.promise.then(function() {
                return r.all([x(), b()])
            }).then(_).
            finally(e.resolve)
        } ()
    }

    function n(e) {
        e.state("app.edit_user_groups", {
            url: "settings/user/:userId/groups/?returnUrl=",
            controller: t,
            templateUrl: __axtr("/templates/settings/edit-user-groups/edit-user-groups.html"),
            data: {
                page: {
                    icon: "fa-cog",
                    section: "settings"
                }
            }
        })
    }
    t.$inject = ["$scope", "$log", "$q", "$state", "$stateParams", "axAddGroupModal", "axConstant", "axPage", "ChildUsersApi", "gettextCatalog", "promiseTracker", "TargetGroupsApi", "toastr", "uiGridConstants"],
    e.module("WVS").config(["$stateProvider", n])
} (angular),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l, d, p, f, g, h) {
        function m() {
            var n = t.loadingTracker.createPromise().resolve;
            return u.getUser(t.userProfile.userId).then(function(n) {
                n ? (t.userProfile = e.extend({},
                n, {
                    retypePassword: n.password
                }), k = e.copy(t.userProfile)) : r.$emit("axError", {
                    errorMessage: d("This user does not exist anymore")
                })
            }).
            finally(n)
        }

        function v() {
            var r = t.loadingTracker.createPromise();
            return n.when().then(function() {
                t.groupList.gridApi.infiniteScroll.saveScrollPercentage()
            }).then(function() {
                if (!0 !== l.hasFeature("target_groups")) return n.reject({
                    status: 403
                })
            }).then(function() {
                return g.getGroups("user_id:" + t.userProfile.userId, t.groupList.nextCursor, a.LIST_PAGE_SIZE)
            }).then(function(n) {
                var r = n.groups,
                i = n.pagination;
                r.forEach(function(e) {
                    t.groupList.items.find(function(t) {
                        return t.groupId === e.groupId
                    }) || t.groupList.items.push(e)
                }),
                t.groupList.nextCursor = i.nextCursor,
                t.groupList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(i.nextCursor))
            }).
            catch(function(e) {
                return t.groupList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                n.reject(e)
            }).
            finally(r.resolve)
        }

        function y() {
            var e = t.loadingTracker.createPromise();
            return u.updateUser(t.userProfile, {
                onRetry: function() {
                    function e() {
                        return y()
                    }
                    return e
                } ()
            }).then(function() {
                h.success(p.getString("配置文件已更新"))
            }).then(function() {
                if (!t.canNavigateBack || !t.canNavigateBack()) return i.go("app.edit_settings", {},
                {
                    inherit: !1
                });
                t.navigateBack()
            }).
            finally(e.resolve)
        }

        function S() {
            return s.currentUrlEncoded()
        }

        function T() {
            return ! e.equals(k, t.userProfile)
        }

        function x() {
            return t.profileForm && t.profileForm.$invalid ? d("表单无效") : T() ? "": d("没有需要保存的更改")
        }

        function b() {
            t.loadingTracker.cancel()
        }

        function _() {
            c.set("settings-user-list-groups", t.groupList.gridApi.saveState.save())
        }

        function C() {
            var e = c.get("settings-user-list-groups");
            e && t.groupList.gridApi.saveState.restore(t, e)
        }

        function w() {
            c.remove("settings-user-list-groups"),
            i.reload(i.current)
        }
        var I = n.defer(),
        k = null;
        t.loadingTracker = f({
            activationDelay: a.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        t.userProfile = {
            userId: o.userId,
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            retypePassword: "",
            role: "",
            accessAllGroups: !1,
            enabled: !1
        },
        t.groupList = {
            items: [],
            nextCursor: void 0
        },
        t.groupList.gridOptions = {
            data: t.groupList.items,
            appScopeProvider: t,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableRowHeaderSelection: !1,
            multiSelect: !1,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                field: "name",
                displayName: p.getString("组名"),
                width: 320
            },
            {
                field: "description",
                displayName: p.getString("描述"),
                width: 240
            },
            {
                field: "targetCount",
                displayName: p.getString("组内目标"),
                cellFilter: "number",
                width: 180
            }],
            gridMenuCustomItems: [{
                title: p.getString("重置"),
                action: w
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.groupId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.groupId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    t.groupList.gridApi = e,
                    e.infiniteScroll.on.needLoadMoreData(t, v),
                    e.colResizable.on.columnSizeChanged(t, _),
                    e.core.on.columnVisibilityChanged(t, _),
                    e.core.on.sortChanged(t, _),
                    I.resolve()
                }
                return e
            } ()
        },
        t.roleList = a.USER_ROLE,
        t.loadProfile = m,
        t.updateProfile = y,
        t.currentUrl = S,
        t.hasChanges = T,
        t.saveActionStatusMessage = x,
        t.$on("$destroy", b),
        function() {
            s.setDocumentTitle(d("设置-编辑用户")),
            s.setCurrentSection("settings");
            var e = t.loadingTracker.createPromise();
            n.when([m(), I.promise.then(v).then(C)]).
            finally(e.resolve)
        } ()
    }

    function n(e) {
        var n = function(e) {
            e.scrollTopActionVisible = !1
        };
        n.$inject = ["$rootScope"];
        var r = function(e) {
            e.scrollTopActionVisible = !0
        };
        r.$inject = ["$rootScope"],
        e.state("app.edit_user", {
            url: "settings/edit-user/:userId/?returnUrl=",
            controller: t,
            templateUrl: __axtr("/templates/settings/edit-user/edit-user.html"),
            data: {
                page: {
                    icon: "fa-cog",
                    section: "settings"
                }
            },
            onEnter: n,
            onExit: r
        })
    }
    t.$inject = ["$scope", "$q", "$rootScope", "$state", "$stateParams", "axConstant", "axPage", "axUserPreferences", "ChildUsersApi", "CurrentUser", "gettext", "gettextCatalog", "promiseTracker", "TargetGroupsApi", "toastr"],
    e.module("WVS").config(["$stateProvider", n])
} (angular),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l, d, p, f, g, h, m) {
        function v() {
            var e = t.targetList.gridApi && t.targetList.gridApi.selection;
            return e ? e.getSelectedRows() : []
        }

        function y() {
            var e = t.targetList.gridApi && t.targetList.gridApi.selection;
            return e ? e.getSelectedCount() : 0
        }

        function S() {
            return f.changeTargets(t.group.groupId, t.changeSet, {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function e() {
                        return S()
                    }
                    return e
                } ()
            }).then(function() {
                t.changeSet = {
                    add: [],
                    remove: []
                },
                h.success(d.getString("已更新组成员身份"))
            }).then(function() {
                if (!t.canNavigateBack || !t.canNavigateBack()) return i.go("app.edit_settings", {
                    section: "target-groups"
                },
                {
                    inherit: !1
                });
                t.navigateBack()
            })
        }

        function T() {
            return t.changeSet.add.length > 0 || t.changeSet.remove.length > 0
        }

        function x() {
            t.loadingTracker.cancel()
        }

        function b() {
            return f.getGroup(t.group.groupId, {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function e() {
                        return b()
                    }
                    return e
                } ()
            }).then(function(e) {
                if (null === e) {
                    var i = l("The specified group does not exist");
                    return r.$emit("axError", {
                        message: i,
                        onRetry: function() {
                            function e() {
                                return b()
                            }
                            return e
                        } ()
                    }),
                    n.reject({
                        message: i
                    })
                }
                t.group = e
            })
        }

        function _() {
            var r = t.loadingTracker.createPromise(),
            i = !1;
            return t.targetList.gridApi.infiniteScroll.saveScrollPercentage(),
            g.getTargets(void 0, t.targetList.nextCursor, a.LIST_PAGE_SIZE, {
                onRetry: function() {
                    function e() {
                        return _()
                    }
                    return e
                } ()
            }).then(function(n) {
                var r = n.targets,
                o = n.pagination;
                r.forEach(function(e) {
                    t.targetList.items.find(function(t) {
                        return t.targetId === e.targetId
                    }) || t.targetList.items.push(e)
                }),
                t.targetList.nextCursor = o.nextCursor,
                t.targetList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(o.nextCursor)),
                i = !0
            }).then(L).then(C).
            catch(function(e) {
                return i || t.targetList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                n.reject(e)
            }).
            finally(r.resolve)
        }

        function C() {
            var e = t.loadingTracker.createPromise();
            return f.listTargets(t.group.groupId, {
                onRetry: function() {
                    function e() {
                        return C()
                    }
                    return e
                } ()
            }).then(function(e) {
                if (e.length > 0) {
                    E = !0;
                    try {
                        t.targetList.items.forEach(function(n) {
                            e.indexOf(n.targetId) > -1 && t.targetList.gridApi.selection.selectRow(n)
                        })
                    } finally {
                        E = !1
                    }
                }
            }).
            finally(e.resolve)
        }

        function w(t) {
            if (!E) { (e.isArray(t) ? t: [t]).forEach(function(e) {
                    var t = e.isSelected,
                    n = e.entity;
                    return t ? k(n) : I(n)
                })
            }
        }

        function I(e) {
            var n = t.changeSet.add.indexOf(e.targetId);
            n < 0 ? t.changeSet.remove.push(e.targetId) : t.changeSet.add.splice(n, 1)
        }

        function k(e) {
            var n = t.changeSet.remove.indexOf(e.targetId);
            n < 0 ? t.changeSet.add.push(e.targetId) : t.changeSet.remove.splice(n, 1)
        }

        function A() {
            c.set("edit-group-targets", t.targetList.gridApi.saveState.save())
        }

        function L() {
            var e = c.get("edit-group-targets");
            e && t.targetList.gridApi.saveState.restore(t, e)
        }

        function $() {
            c.remove("edit-group-targets"),
            i.reload(i.current)
        }
        var E = !1,
        R = n.defer();
        t.group = {
            groupId: o.groupId,
            name: ""
        },
        t.loadingTracker = p({
            activationDelay: a.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        t.changeSet = {
            add: [],
            remove: []
        },
        t.targetList = {
            items: [],
            nextCursor: void 0
        },
        t.targetList.gridOptions = {
            data: t.targetList.items,
            appScopeProvider: t,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableFullRowSelection: !1,
            enableRowHeaderSelection: u.hasPermission("changeGroupMembership"),
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            gridMenuTitleFilter: m,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                field: "address",
                displayName: d.getString("地址"),
                width: 320
            },
            {
                field: "description",
                displayName: d.getString("描述"),
                cellTooltip: !0,
                width: 240
            },
            {
                field: "criticality",
                displayName: d.getString("业务临界性"),
                cellFilter: "axBusinessCriticality",
                visible: !1,
                width: 160
            }],
            gridMenuCustomItems: [{
                title: d.getString("重置"),
                action: $
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.targetId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.targetId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    t.targetList.gridApi = e,
                    e.infiniteScroll.on.needLoadMoreData(t, _),
                    e.selection.on.rowSelectionChanged(t, w),
                    e.colResizable.on.columnSizeChanged(t, A),
                    e.core.on.columnVisibilityChanged(t, A),
                    e.core.on.sortChanged(t, A),
                    R.resolve(e)
                }
                return e
            } ()
        },
        e.extend(t, {
            hasChanges: T,
            selectedItems: v,
            selectedItemsCount: y,
            update: S
        }),
        t.$on("destroy", x),
        function() {
            s.setDocumentTitle(l("设置-配置组成员身份")),
            s.setCurrentSection("settings"),
            b().then(R.promise).then(_)
        } ()
    }

    function n(e) {
        e.state("app.edit_group_targets", {
            url: "settings/group/:groupId/targets/?returnUrl=",
            controller: t,
            templateUrl: __axtr("/templates/settings/edit-group-targets/edit-group-targets.html"),
            data: {
                page: {
                    icon: "fa-cog",
                    section: "settings"
                }
            }
        })
    }
    t.$inject = ["$scope", "$q", "$rootScope", "$state", "$stateParams", "axConstant", "axPage", "axUserPreferences", "CurrentUser", "gettext", "gettextCatalog", "promiseTracker", "TargetGroupsApi", "TargetsApi", "toastr", "translateFilter"],
    e.module("WVS").config(["$stateProvider", n])
} (angular),
function(e, t) {
    "use strict";

    function n(n, c, u, l, d, p, f) {
        function g(e) {
            return v(e.url) && (!0 !== e.noLoadingTracker && (s(e.tracker) || (e.tracker = e.tracker ? [e.tracker] : []), e.tracker.indexOf(l.globalPromiseTracker) < 0 && (e.tracker.unshift(l.globalPromiseTracker), void 0 === e.$promiseTrackerDeferred && (e.$promiseTrackerDeferred = e.$promiseTrackerDeferred || []), e.$promiseTrackerDeferred.push(l.globalPromiseTracker.createPromise()))), !0 !== e.noAuthToken && (e.headers || (e.headers = {}), e.headers[d.API_AUTH_HEADER] = f.get(d.API_AUTH_HEADER)), e.timeout || (e.timeout = d.API_REQUEST_TIMEOUT)),
            e
        }

        function h(e) {
            if (e && e.config && v(e.config.url)) {
                var t = e.headers ? e.headers(d.API_AUTH_HEADER) : void 0;
                t && f.set(d.API_AUTH_HEADER, t)
            }
            return e
        }

        function m(t) {
            if (t && t.config && v(t.config.url)) {
                if (c.error({
                    httpStatus: t.status,
                    errorInfo: t.data
                }), 404 === t.status) return t.data = null,
                u.when(t);
                e.extend(t, {
                    publishResponseError: S
                },
                y(t.status, t.statusText, t.data, t.config));
                o(t.config.formatError) && t.config.formatError(t),
                !0 !== t.config.noPublishError && l.$emit("axApiError", t),
                401 === t.status && !0 !== t.config.noLoginRedirect && l.$emit("axAuthRequired", t)
            }
            return u.reject(t)
        }

        function v(e) {
            return i(e) && 0 === e.indexOf(d.API_BASE_PATH)
        }

        function y(o, s, c, u) {
            var f = n.get("gettextCatalog"),
            g = n.get("axEscapeHtmlFilter"),
            h = g("http-" + o),
            m = g(s);
            if (r(c) && c.code === d.SYI_ERROR_CODES.LICENSE_NOT_ACTIVATED && l.$emit(d.PRODUCT_ACTIVATION_REQUIRED), [ - 1, 502, 504].indexOf(o) > -1) m = f.getString("无法建立到服务器的连接. [Status: {{status}}]", {
                status: o
            });
            else if (413 === o) m = f.getString("请求的操作无法完成 [输入大小太大].");
            else if (403 === o) m = c && "too many scanning engines" === c.message ? f.getString("您已达到此许可证的扫描引擎限制.") : f.getString("用户角色拒绝访问.请与管理员联系.");
            else if (r(c) && c.message) {
                if (m = c.message, 409 === o && e.isString(c.message) && "group name should be unique" === t.replace(c.message.toLowerCase(), /_/g, " ")) m = f.getString("具有此名称的组已存在.");
                else if (409 === o && e.isString(c.message) && "max web scan count reached" === t.replace(c.message.toLowerCase(), /_/g, " ")) m = f.getString("达到的最大免费试用 web 扫描数.应用许可证密钥以提高.");
                else if (409 === o && e.isString(c.message) && "target requires network only profile" === t.replace(c.message.toLowerCase(), /_/g, " ")) m = f.getString("已选择 Web 扫描类型.此目标只能使用网络扫描类型进行扫描");
                else if (409 === o && e.isString(c.message) && "invalid user state" === t.replace(c.message.toLowerCase(), /_/g, " ")) m = f.getString("多次验证失败, 请联系support@acunetix.com.");
                else if (409 === o && e.isString(c.message) && "max standard targets count exceeded" === t.replace(c.message.toLowerCase(), /_/g, " ")) m = f.getString("达到的最大免费试用目标数.");
                else if (409 === o && e.isString(c.message) && "max network targets count exceeded" === t.replace(c.message.toLowerCase(), /_/g, " ")) m = f.getString("达到的最大的免费试用网络目标数.");
                else if (409 === o && e.isString(c.message) && "invalid license" === t.replace(c.message.toLowerCase(), /_/g, " ")) m = f.getString("应用许可证启用 Web 扫描.");
                else if (409 === o && e.isString(c.message) && "invalid license key" === t.replace(c.message.toLowerCase(), /_/g, " ")) m = f.getString('检查许可证时出错.请联系<a target="_blank" href="mailto:support@acunetix.com">我们</a>.');
                else if (409 === o && e.isString(c.message) && "user not validated" === t.replace(c.message.toLowerCase(), /_/g, " ")) m = f.getString("验证帐户以运行网络扫描.");
                else if (409 === o && e.isString(c.message) && "too many failed requests" === t.replace(c.message.toLowerCase(), /_/g, " ")) m = f.getString("验证失败多次, 请联系support@acunetix.com.");
                else if (400 === o && 400 === c.code && t.get(c, "details[0].body.problems[0].code")) {
                    var v = t.get(c, "details[0].body.problems[0]");
                    switch (v.code) {
                    case "invalid_condition":
                        "maxLength" === v.condition && (m = p("输入长度超过受支持的值."));
                        break;
                    case "format":
                        "email" === v.expected_format ? m = p("提供的电子邮件地址无效.") : "license_key" === v.expected_format && (m = p("提供的许可证密钥无效."))
                    }
                } else if (403 === o && "Forbidden" === m) m = f.getString("用户角色拒绝访问.请与管理员联系.");
                else if (409 === o && a(c.code)) switch (c.code) {
                case d.SYI_ERROR_CODES.MI_CONTINUOUS_MODE_NOT_SUPPORTED:
                    m = f.getString("无法启用连续扫描, 因为此目标的扫描需要手动干预.");
                    break;
                case d.SYI_ERROR_CODES.MI_NOT_FROM_LOCALHOST:
                case d.SYI_ERROR_CODES.MI_NO_SESSION_ID:
                    m = f.getString("此目标的扫描需要手动干预-扫描只能在安装此产品的计算机上创建.");
                    break;
                case d.SYI_ERROR_CODES.MI_RECURRENT_SCANS_NOT_ALLOWED:
                case d.SYI_ERROR_CODES.MI_ONLY_SCAN_NOW_ALLOWED:
                    m = f.getString("此目标的扫描需要手动干预-只允许即时扫描.");
                    break;
                case d.SYI_ERROR_CODES.MI_SCAN_NOW_NOT_POSSIBLE_SYSTEM_EXCLUDED_HOURS:
                case d.SYI_ERROR_CODES.MI_SCAN_NOW_NOT_POSSIBLE_TARGET_EXCLUDED_HOURS:
                    m = f.getString("这一目标的扫描需要人工干预, 排除的时间正在使用中.")
                }
            } else c && (m = i(c) && c.length > 0 ? g(c) : "<b>" + g(String(o)) + " " + g(s) + (u ? " [<em>" + g(u.method) + " " + g(u.url) + "</em>]": "") + '</b>: <span class="text-danger">' + g(e.toJson(c)) + "</span>");
            switch (o) {
            case 401:
                h = d.ERROR_CODES.AUTH_REQUIRED,
                m = p("Authentication required")
            }
            return {
                errorCode: h,
                errorMessage: t.upperFirst(t.endsWith(m, ".") ? m: m + ".")
            }
        }

        function S(e) {
            l.$emit("axApiError", e),
            401 === e.status && l.$emit("axAuthRequired", e)
        }
        return {
            request: g,
            response: h,
            responseError: m
        }
    }
    n.$inject = ["$injector", "$log", "$q", "$rootScope", "axConstant", "gettext", "localStorageService"];
    var r = e.isObject,
    i = e.isString,
    o = e.isFunction,
    a = e.isNumber,
    s = e.isArray;
    e.module("WVS").factory("axApiInterceptor", n)
} (angular, _),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l, d, p, f, g, h, m, v, y, S, T, x, b, _, C) {
        function w() {
            t.selectedLocation = null
        }

        function I() {
            t.filterAsideVisible = !t.filterAsideVisible
        }

        function k(e) {
            var n = t.searchFilters;
            switch (n.filterTags.splice(n.filterTags.indexOf(e), 1), e.key) {
            case "severity":
                n.severity = [];
                break;
            case "status":
                n.status = null;
                break;
            case "cvss":
                n.cvss = null;
                break;
            case "vuln_type":
                n.vulnType = null
            }
            W()
        }

        function A() {
            return f.currentUrlEncoded()
        }

        function L(e) {
            t.selectedVulnItems = e
        }

        function $() {
            return ["aborted", "completed", "failed"].indexOf(t.scan.status) > -1 || "completed" === t.scan.originalStatus
        }

        function E() {
            return ["aborted", "completed", "failed"].indexOf(t.scan.status) > -1 || "completed" === t.scan.originalStatus
        }

        function R() {
            g.chooseReportOptions().then(function(e) {
                return Z(e.templateId, {
                    listType: "scan_result",
                    idList: [t.scan.resultId]
                })
            }).then(function() {
                a.go("app.list_reports", {},
                {
                    inherit: !1
                })
            })
        }

        function P(e, n) {
            var r = [];
            switch (n) {
            case "scan_result":
                r = [t.scan.resultId]
            }
            return Y(e, {
                listType: n,
                idList: r
            })
        }

        function N() {
            var n = e.extend(t.$new(), {
                message: v("你确定要停止扫描吗?")
            });
            return d.confirm({
                scope: n
            }).then(function() {
                return X()
            }).
            finally(function() {
                return n.$destroy()
            })
        }

        function D() {
            J = !0,
            a.go(a.current.name, {
                view: "events"
            }).
            finally(function() {
                J = !1
            })
        }

        function U(n) {
            if (t.selectedLocation = n, t.locId = n.locId, t.locations = j(n), !t.selectedLocation) return i.when();
            var r = t.loadingTracker.createPromise();
            return x.getLocationDetails(t.scan.resultId, t.scan.scanId, n.locId, {
                cache: p
            }).then(function(n) {
                e.extend(t.selectedLocation, n)
            }).
            finally(r.resolve)
        }

        function F() {
            t.loadingTracker.cancel()
        }

        function M() {
            switch (s.view) {
            case "stats":
                t.sections.currentIndex = 0,
                t.currentSection = "stats";
                break;
            case "vulns":
                t.sections.currentIndex = 1,
                t.currentSection = "vulns";
                break;
            case "crawl":
                t.sections.currentIndex = 2,
                t.currentSection = "crawl";
                break;
            case "events":
                t.sections.currentIndex = 3,
                t.currentSection = "events";
                break;
            case "sessions":
                t.sections.currentIndex = 4,
                t.currentSection = "sessions"
            }
        }

        function V() {
            var e = t.searchFilters,
            n = [];
            e.severity.length > 0 && n.push("severity:" + e.severity.join(",")),
            e.status && ("rediscovered" === e.status ? (n.push("status:open"), n.push("rediscovered:true")) : n.push("status:" + e.status)),
            e.cvss && ("4" === e.cvss ? n.push("cvss_score:<=" + e.cvss) : "4-7" === e.cvss ? (n.push("cvss_score:>=4"), n.push("cvss_score:<=7")) : "7" === e.cvss && n.push("cvss_score:>=" + e.cvss)),
            e.vulnType && n.push("vt_id:" + e.vulnType),
            e.searchQuery = n.join(";")
        }

        function O(n) {
            return b.getScan(t.scan.scanId, e.extend({
                tracker: t.loadingTracker
            },
            n)).then(function(n) {
                if (null === n) r.warn("扫描 " + t.scan.scanId + " 不再存在."),
                t.sections.items.forEach(function(e) {
                    return e.visible = !1
                });
                else {
                    e.extend(t.scan, n),
                    s.resultId !== t.scan.resultId && "default" !== s.resultId && (t.scan.resultId = s.resultId);
                    t.scan.schedule.recurrence && !t.sections.items.find(function(e) {
                        return "sessions" === e.view
                    }) && t.sections.items.push({
                        heading: v("Previous Sessions"),
                        view: "sessions",
                        visible: !0
                    }),
                    t.sections.items.forEach(function(e) {
                        return e.visible = n.resultId
                    }),
                    t.sections.items[0].visible = !0
                }
            }).then(function() {
                var e = t.scan,
                n = e.scanId,
                r = e.resultId;
                if (r && "stats" === t.currentSection) return x.getStatistics(n, r, {
                    noPublishError: !0,
                    noLoadingTracker: !0
                }).then(function(e) {
                    t.scanStatus = e
                })
            }).
            finally(B).
            finally(function() {
                var e = b.getScanNextRefresh(t.scan);
                t.$$destroyed || "stats" !== t.currentSection || null !== e && c(function() {
                    return O({
                        noPublishError: !0,
                        noLoadingTracker: !0,
                        tracker: null
                    })
                },
                e)
            })
        }

        function H(e) {
            t.locations.push(e)
        }

        function j(e) {
            var t = [];
            if (e) do {
                t.unshift(e), e = e.parentLoc
            } while ( e );
            return t
        }

        function q(e, t) {
            t !== e && (V(), B(), W())
        }

        function G(e, t) {
            e === t || J || a.reload(a.current)
        }

        function B() {
            var e = t.searchFilters,
            n = [];
            if (e.severity.length > 0 && n.push({
                key: "severity",
                label: v("Severity:"),
                value: e.severity.map(function(t) {
                    var n = e.severityList.find(function(e) {
                        return e.value === t
                    });
                    return y.getString(n.text)
                }).join(", ")
            }), e.status) {
                var r = e.statusList.find(function(t) {
                    return t.value === e.status
                });
                n.push({
                    key: "status",
                    label: v("Status:"),
                    value: y.getString(r.text)
                })
            }
            if (e.cvss) {
                var r = e.cvssList.find(function(t) {
                    return t.value === e.cvss
                });
                n.push({
                    key: "cvss",
                    label: "CVSS:",
                    value: y.getString(r.text)
                })
            }
            e.vulnType && n.push({
                key: "vuln_type",
                label: v("Vulnerability Type:"),
                value: e.vulnTypeName || e.vulnType
            }),
            e.filterTags = n
        }

        function W() {
            var e = t.searchFilters;
            J = !0;
            var n = {
                scanId: s.scanId,
                view: s.view,
                returnUrl: s.returnUrl,
                severity: e.severity.length > 0 ? e.severity.join(",") : void 0,
                status: null !== e.status ? e.status: void 0,
                cvss: null !== e.cvss ? e.cvss: void 0,
                type: null !== e.vulnType ? e.vulnType: void 0
            };
            a.go(a.current.name, n, {
                inherit: !1
            }).
            finally(function() {
                J = !1
            })
        }

        function K() {
            var e = t.loadingTracker.createPromise(),
            n = {
                tracker: t.loadingTracker,
                cache: m
            };
            return C.getVulnerabilityType(t.searchFilters.vulnType, n).then(function(e) {
                var n = e.name;
                t.searchFilters.vulnTypeName = n
            }).
            finally(e.resolve).
            finally(B)
        }

        function z() {
            return T.getExportTypes("scan_result", {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function e() {
                        return z()
                    }
                    return e
                } ()
            }).then(function(n) {
                t.exportTemplateTypeList = n.map(function(t) {
                    return e.extend({
                        sourceType: "scan_result"
                    },
                    t)
                })
            })
        }

        function Y(n, r) {
            if (ee.active()) {
                var i = e.extend(t.$new(), {
                    message: v("Another download is in progress.")
                });
                return d.alert({
                    scope: i
                }).
                finally(function() {
                    return i.$destroy()
                })
            }
            var o = t.loadingTracker.createPromise();
            return T.generateNewExport(n, r, {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function e() {
                        return Y(n, r)
                    }
                    return e
                } ()
            }).then(function(e) {
                "failed" !== e.status && _.success(y.getString("您的下载将在几分钟内自动启动")),
                Q(e.reportId)
            }).
            finally(o.resolve)
        }

        function Q(r) {
            var a, s, c = ee.createPromise(),
            u = !1;
            return u ? i.when() : (a = n(function() {
                return u = !0,
                T.getExport(r, {
                    tracker: ee,
                    noPublishError: !0
                }).then(function(t) {
                    if (null === t) {
                        var n = {
                            errorMessage: v("无法下载您的报告 [已删除报告]")
                        };
                        return c.reject(n),
                        i.reject(n)
                    }
                    if ("failed" === t.status) {
                        var n = {
                            errorMessage: v("无法导出数据 [失败]")
                        };
                        return i.reject(n)
                    } (t.downloadLinkPDF || t.downloadLinkHTML || t.downloadLinkXML) && (e.element("#download-helper").attr("src", t.downloadLinkPDF || t.downloadLinkHTML || t.downloadLinkXML), c.resolve())
                }).
                catch(function(e) {
                    throw c.reject(e),
                    o.$emit("axError", e),
                    e
                }).
                finally(function() {
                    u = !1
                })
            },
            5e3), s = t.$on("$destroy", a.cancel), c.promise.
            finally(function() {
                n.cancel(a),
                s()
            }), c.promise)
        }

        function Z(e, n) {
            return T.generateNewReport(e, n, {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function t() {
                        return Z(e, n)
                    }
                    return t
                } ()
            }).then(function() {
                _.success(y.getString("正在创建报表"))
            })
        }

        function X() {
            return b.abortScan(t.scan.scanId, {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function e() {
                        return X()
                    }
                    return e
                } ()
            }).then(function(n) {
                e.extend(t.scan, n),
                s.resultId !== t.scan.resultId && "default" !== s.resultId && (t.scan.resultId = s.resultId)
            })
        }
        var J = !1,
        ee = S({
            activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
        });
        t.loadingTracker = S({
            activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        t.scan = {
            scanId: s.scanId,
            resultId: null,
            target: {
                targetId: null,
                address: ""
            }
        },
        t.filterAsideVisible = !1,
        t.returnUrl = s.returnUrl,
        t.searchFilters = {
            searchQuery: "",
            severity: h.getStateParam("severity", !0, u.VULN_SEVERITY_LEVEL.map(function(e) {
                return e.value
            })),
            severityList: u.VULN_SEVERITY_LEVEL,
            status: h.getStateParam("status", !1, u.VULN_STATUS.map(function(e) {
                return e.value
            }).concat(["!open"])),
            statusList: u.VULN_STATUS.concat([{
                value: "!open",
                text: v("已关闭")
            }]),
            cvss: h.getStateParam("cvss", !1, u.CVSS_SCORE.map(function(e) {
                return e.value
            })),
            cvssList: u.CVSS_SCORE,
            vulnType: h.getStateParam("type"),
            vulnTypeName: null,
            filterTags: []
        },
        t.locId = 0,
        t.locations = [],
        t.selectedLocation = null,
        t.sections = {
            currentIndex: 0,
            items: [{
                heading: v("扫描统计信息"),
                view: "stats",
                visible: !1
            },
            {
                heading: v("漏洞"),
                view: "vulns",
                visible: !1
            },
            {
                heading: v("网站结构"),
                view: "crawl",
                visible: !1
            },
            {
                heading: v("事件"),
                view: "events",
                visible: !1
            }]
        },
        t.currentSection = "stats",
        t.selectedVulnItems = [],
        t.exportTemplateTypeList = [],
        t.scanStatus = void 0,
        t.hideLocationDetails = w,
        t.toggleFilter = I,
        t.onCrawlLocationLoaded = H,
        t.onCrawLocationDetails = U,
        t.onVulnerabilitiesSelectionChanged = L,
        t.removeFilterTag = k,
        t.onGenerateReport = R,
        t.currentUrl = A,
        t.onExport = P,
        t.canGenerateReport = $,
        t.canGenerateExport = E,
        t.onStopScan = N,
        t.navigateToEvents = D,
        t.$on("$destroy", F),
        t.$watch(function() {
            return s.view
        },
        function(e, t) {
            e !== t && M()
        }),
        t.$watch(function() {
            return t.sections.currentIndex
        },
        function(n, r) {
            if (n !== r) {
                var i = t.sections.items[n];
                t.currentSection = i.view,
                J = !0,
                a.go(a.current.name, e.extend({
                    view: i.view
                })).
                finally(function() {
                    J = !1
                })
            }
        }),
        t.$watch("searchFilters.severity", q),
        t.$watch("searchFilters.status", q),
        t.$watch("searchFilters.cvss", q),
        t.$watch("searchFilters.vulnType", q),
        t.$watchCollection(function() {
            return s
        },
        G),
        function() {
            f.setDocumentTitle(v("扫描")),
            f.setCurrentSection("scans"),
            B(),
            V(),
            M(),
            O(),
            z(),
            t.searchFilters.vulnType && K()
        } (),
        t.changeLocation = function(e) {
            var n = t.locations.indexOf(e);
            n > -1 ? n + 1 < t.locations.length && t.locations.splice(n + 1) : t.locations.splice(0),
            t.locId = e.locId
        }
    }
    t.$inject = ["$scope", "$interval", "$log", "$q", "$rootScope", "$state", "$stateParams", "$timeout", "axConstant", "axFormatDurationFilter", "axGeneralModal", "axLocationsCache", "axPage", "axReportOptionsModal", "axStateHelpers", "axVulnTypesCache", "gettext", "gettextCatalog", "promiseTracker", "ReportsApi", "ResultsApi", "ScansApi", "toastr", "VulnerabilitiesApi"],
    e.module("WVS").controller("axScanDetailsCtrl", t)
} (angular),
function(e) {
    "use strict";

    function t() {}
    e.module("WVS").controller("axScanDetailsVulnsCtrl", t)
} (angular),
function(e) {
    "use strict";

    function t(e) {
        e.statsNotAvailable = function() {
            e.noStats = !0
        },
        e.noStats = !1
    }
    t.$inject = ["$scope"],
    e.module("WVS").controller("axScanDetailsStatsCtrl", t)
} (angular),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l) {
        function d() {
            return c.currentUrlEncoded()
        }

        function p() {
            var r = t.loadingTracker.createPromise();
            return n.when().then(function() {
                return t.sessionList.gridApi.infiniteScroll.saveScrollPercentage()
            }).then(function() {
                return u.getScanResultHistory(i.scanId, t.sessionList.nextCursor, s.LIST_PAGE_SIZE, {
                    onRetry: function() {
                        function e() {
                            return p()
                        }
                        return e
                    } ()
                })
            }).then(function(n) {
                var r = n.results,
                i = n.pagination;
                r.forEach(function(e) {
                    t.sessionList.items.find(function(t) {
                        return t.resultId === e.resultId
                    }) || t.sessionList.items.push(e)
                }),
                t.sessionList.nextCursor = i.nextCursor,
                t.sessionList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(i.nextCursor))
            }).
            catch(function(e) {
                return t.sessionList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                n.reject(e)
            }).
            finally(r.resolve)
        }

        function f() {
            l.set("scan-details-sessions", t.sessionList.gridApi.saveState.save())
        }

        function g() {
            var e = l.get("scan-details-sessions");
            e && t.sessionList.gridApi.saveState.restore(t, e)
        }

        function h() {
            l.remove("scan-details-sessions"),
            r.reload(r.current.name)
        }
        var m = n.defer();
        t.loadingTracker = a({
            activationDelay: s.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        t.sessionList = {
            items: [],
            nextCursor: void 0
        },
        t.sessionList.gridOptions = {
            data: t.sessionList.items,
            appScopeProvider: t,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellFilter: "date:'medium'",
                displayName: o.getString("开始日期"),
                field: "startDate",
                width: 160
            },
            {
                cellFilter: "date:'medium'",
                displayName: o.getString("结束日期"),
                field: "endDate",
                width: 160
            },
            {
                cellTemplate: __axtr("/templates/scans/scan-details/sections/sessions/cells/status.html"),
                displayName: o.getString("状态"),
                field: "status",
                width: 130
            },
            {
                cellTemplate: __axtr("/templates/scans/scan-details/sections/sessions/cells/actions.html"),
                displayName: "",
                name: "actions",
                width: 160
            }],
            gridMenuCustomItems: [{
                title: o.getString("重置"),
                action: h
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.scanId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.scanId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    t.sessionList.gridApi = e,
                    e.infiniteScroll.on.needLoadMoreData(t, p),
                    e.colResizable.on.columnSizeChanged(t, f),
                    e.core.on.columnVisibilityChanged(t, f),
                    e.core.on.sortChanged(t, f),
                    m.resolve()
                }
                return e
            } ()
        },
        t.returnUrl = i.returnUrl,
        t.currentUrl = d,
        function() {
            m.promise.then(p).
            finally(g)
        } ()
    }
    t.$inject = ["$scope", "$q", "$state", "$stateParams", "gettextCatalog", "promiseTracker", "axConstant", "axPage", "ScansApi", "axUserPreferences"],
    e.module("WVS").controller("axScanDetailsSessionsCtrl", t)
} (angular),
function(e) {
    "use strict";

    function t(e) {
        e.searchFilters = {
            searchQuery: "resource_type:6;resource_id:" + e.scan.resultId
        }
    }
    t.$inject = ["$scope"],
    e.module("WVS").controller("axScanDetailsEventsCtrl", t)
} (angular),
function(e) {
    "use strict";

    function t() {}
    e.module("WVS").controller("axScanDetailsCrawlCtrl", t)
} (angular),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l, d, p, f, g, h, m, v, y, S, T, x, b, _, C, w, I, k, A, L) {
        function $(t) {
            return ce(function() {
                var n = e.isString(t) && t.length > 0 ? "name:*" + encodeURIComponent(t) : void 0;
                return r.when().then(function() {
                    if (!0 !== y.hasFeature("target_groups")) return r.reject({
                        status: 403
                    })
                }).then(function() {
                    return I.getGroups(n, void 0, 10, {
                        cache: p,
                        noPublishError: !0
                    }).then(function(e) {
                        var t = e.groups;
                        i.searchFilters.groupList = t
                    })
                }).then(function() {
                    if (i.searchFilters.group.length > 0) return i.searchFilters.group.reduce(function(e, t) {
                        return i.searchFilters.groupList.find(function(e) {
                            return e.groupId === i.searchFilters.groupList
                        }) ? e: e.then(function() {
                            return I.getGroup(t, {
                                cache: p,
                                noPublishError: !0
                            })
                        }).then(function(e) {
                            i.searchFilters.groupList.push(e)
                        })
                    },
                    r.when())
                }).then(function() {
                    i.searchFilters.groupList = x(i.searchFilters.groupList, "name")
                }).
                catch(function(e) {
                    return 403 === e.status || e.publishResponseError && e.publishResponseError(e),
                    r.reject(e)
                }).
                finally(Y)
            })
        }

        function E(t) {
            return ce(function() {
                var n = e.isString(t) && t.length > 0 ? "text_search:*" + encodeURIComponent(t) : void 0;
                return r.when().then(function() {
                    if (i.filterAsideVisible) return k.getTargets(n, void 0, 10, {
                        cache: m
                    }).then(function(e) {
                        var t = e.targets;
                        i.searchFilters.targetList = t
                    })
                }).then(function() {
                    if (i.searchFilters.target) {
                        if (!i.searchFilters.targetList.find(function(e) {
                            return e.targetId === i.searchFilters.target
                        })) return k.getTarget(i.searchFilters.target, {
                            cache: m
                        }).then(function(e) {
                            i.searchFilters.targetList.push(e)
                        })
                    }
                }).then(function() {
                    i.searchFilters.targetList = x(i.searchFilters.targetList, "address")
                }).
                finally(Y)
            })
        }

        function R() {
            i.filterAsideVisible = !i.filterAsideVisible
        }

        function P(t) {
            var n = i.scanList.gridApi && i.scanList.gridApi.selection,
            r = n ? n.getSelectedRows() : [];
            return r.length > 0 && e.isDefined(t) && (e.isArray(t) || (t = [t]), r = r.filter(function(e) {
                return t.indexOf(e.status) > -1
            })),
            r
        }

        function N(t) {
            if (!e.isDefined(t)) {
                var n = i.scanList.gridApi && i.scanList.gridApi.selection;
                return n ? n.getSelectedCount() : 0
            }
            return P(t).length
        }

        function D() {
            var t = e.extend(i.$new(), {
                message: S(N() > 1 ? "是否要删除选定的扫描?": "是否要删除选定的扫描?"),
                title: S(N() > 1 ? "删除扫描": "删除扫描")
            });
            return d.confirm({
                scope: t
            }).then(function() {
                return te()
            }).then(function() {
                return W()
            }).
            finally(function() {
                return t.$destroy()
            })
        }

        function U() {
            if (P().filter(function(e) {
                return ["queued", "starting", "processing"].indexOf(e.status) > -1
            }).length > 0) {
                var t = e.extend(i.$new(), {
                    message: S(N() > 1 ? "是否要停止选定的扫描?": "是否要停止选定的扫描?"),
                    title: S(N() > 1 ? "停止扫描": "停止扫描")
                });
                return d.confirm({
                    scope: t
                }).then(function() {
                    return ne()
                }).
                finally(function() {
                    return t.$destroy()
                })
            }
        }

        function F() {
            return N(["aborted", "completed", "failed"]) > 0 || P(["scheduled"]).filter(function(e) {
                return "completed" === e.originalStatus
            }).length > 0
        }

        function M() {
            var e = P(["aborted", "completed", "failed"]).concat(P(["scheduled"]).filter(function(e) {
                return "completed" === e.originalStatus
            }));
            return 2 === e.map(function(e) {
                return e.scanId
            }).length && 1 === t.uniqBy(e,
            function(e) {
                return e.target.targetId
            }).length
        }

        function V() {
            var e = P(["aborted", "completed", "failed"]).concat(P(["scheduled"]).filter(function(e) {
                return "completed" === e.originalStatus
            })),
            n = e.map(function(e) {
                return e.scanId
            }),
            r = 2 === n.length && 1 === t.uniqBy(e,
            function(e) {
                return e.target.targetId
            }).length;
            g.chooseReportOptions(r).then(function(e) {
                return ee(e.templateId, {
                    listType: "scans",
                    idList: n
                })
            }).then(function() {
                o.go("app.list_reports", {},
                {
                    inherit: !1
                })
            })
        }

        function O() {
            var e = P(["aborted", "completed", "failed"]).concat(P(["scheduled"]).filter(function(e) {
                return "completed" === e.originalStatus
            })),
            n = e.map(function(e) {
                return e.scanId
            }),
            r = i.loadingTracker.createPromise();
            _.getReportTemplates().then(function(e) {
                return ee(t.get(e.find(function(e) {
                    return e.comparison
                }), "templateId"), {
                    listType: "scans",
                    idList: n
                })
            }).then(function() {
                o.go("app.list_reports", {},
                {
                    inherit: !1
                })
            }).
            finally(r.resolve)
        }

        function H() {
            return f.currentUrlEncoded()
        }

        function j(e) {
            var t = i.searchFilters;
            switch (t.filterTags.splice(t.filterTags.indexOf(e), 1), e.key) {
            case "threat":
                t.threatLevel = [];
                break;
            case "criticality":
                t.criticality = [];
                break;
            case "status":
                t.status = [];
                break;
            case "profile":
                t.profile = [];
                break;
            case "target":
                t.target = null;
                break;
            case "group":
                t.group = []
            }
            Q()
        }

        function q(t) {
            return l.editSchedule(t.schedule).then(function(n) {
                var r = {
                    schedule: {
                        scheduleDate: n.recurrence ? void 0 : n.scheduleDate,
                        disabled: n.disabled,
                        timeSensitive: n.timeSensitive,
                        recurrence: n.recurrence
                    }
                };
                return le(t.scanId, r).then(function(n) {
                    e.extend(t, n),
                    A.success(T.getString("计划已更新."))
                }).then(function() {
                    i.scanList.gridApi.core.notifyDataChange(L.dataChange.EDIT)
                })
            })
        }

        function G() {
            return c.addTarget().then(function(e) {
                o.go("app.target_config", {
                    returnUrl: H(),
                    targetId: e.targetId
                },
                {
                    inherit: !1
                })
            })
        }

        function B() {
            if (de) try {
                n.cancel(de)
            } finally {
                de = null
            }
            i.loadingTracker.cancel()
        }

        function W() {
            return r.all([k.getTargets(void 0, void 0, 1, {
                noLoadingTracker: !0
            }), w.getScans(void 0, void 0, 1, {
                noLoadingTracker: !0
            })]).then(function(e) {
                var t = e[0].targets,
                n = e[1].scans;
                i.noScansInSystem = 0 === n.length,
                i.noTargetsInSystem = 0 === t.length && i.noScansInSystem
            })
        }

        function K(e, t) {
            t !== e && (Y(), Q(), ue())
        }

        function z(e, t) {
            e === t || fe || o.reload(o.current)
        }

        function Y() {
            var e = i.searchFilters,
            n = [],
            r = t.curryRight(t.join, 2)(", "),
            o = function(e, n) {
                return T.getString(t.get(n, e, S("N/A")))
            };
            e.threatLevel.length > 0 && n.push({
                key: "threat",
                label: S("Threat:"),
                value: r(e.threatLevel.map(function(t) {
                    var n = e.threatLevelList.find(function(e) {
                        return e.value === t
                    });
                    return o("text", n)
                }))
            }),
            e.criticality.length > 0 && n.push({
                label: S("Criticality:"),
                key: "criticality",
                value: r(e.criticality.map(function(t) {
                    var n = e.criticalityList.find(function(e) {
                        return e.value === t
                    });
                    return o("text", n)
                }))
            }),
            e.status.length > 0 && n.push({
                key: "status",
                label: S("Status:"),
                value: r(e.status.map(function(t) {
                    var n = e.statusList.find(function(e) {
                        return e.value === t
                    });
                    return o("text", n)
                }))
            }),
            e.profile.length > 0 && n.push({
                key: "profile",
                label: S("Scan Type:"),
                value: r(e.profile.map(function(t) {
                    var n = e.profileList.find(function(e) {
                        return e.profileId === t
                    });
                    return o("name", n)
                }))
            }),
            e.target && n.push({
                key: "target",
                label: S("Target:"),
                value: o("address", e.targetList.find(function(t) {
                    return t.targetId === e.target
                }))
            }),
            e.group.length > 0 && n.push({
                label: S("Groups:"),
                key: "group",
                value: r(e.group.map(function(t) {
                    var n = e.groupList.find(function(e) {
                        return e.groupId === t
                    });
                    return o("name", n)
                }))
            }),
            i.searchFilters.filterTags = n
        }

        function Q() {
            var e = i.searchFilters,
            t = e.threatLevel,
            n = e.criticality,
            r = e.status,
            s = e.profile,
            c = e.group,
            u = e.target,
            l = function(e) {
                return Array.isArray(e) ? e.length > 0 ? e.join(",") : void 0 : null !== e && "" !== e ? e: void 0
            },
            d = i.generateReportView ? a.gr: void 0,
            p = {
                threat: l(t),
                criticality: l(n),
                status: l(r),
                profile: l(s),
                group: l(c),
                target: l(u),
                gr: d
            };
            fe = !0,
            o.go(o.current.name, p, {
                inherit: !1
            }).
            finally(function() {
                fe = !1
            })
        }

        function Z() {
            return C.getScanningProfiles({
                tracker: i.loadingTracker
            }).then(function(e) {
                i.searchFilters.profileList = e,
                i.searchFilters.profile = h.getStateParam("profile", !0, e.map(function(e) {
                    return e.profileId
                })),
                Y()
            })
        }

        function X() {
            var e = [],
            n = i.searchFilters,
            r = t.curryRight(t.join, 2)(",");
            return n.threatLevel.length > 0 && e.push("threat:" + r(n.threatLevel)),
            n.criticality.length > 0 && e.push("criticality:" + r(n.criticality)),
            n.status.length > 0 && e.push("status:" + r(n.status)),
            n.profile.length > 0 && e.push("profile_id:" + r(n.profile)),
            n.target && e.push("target_id:" + n.target),
            n.group.length > 0 && e.push("group_id:" + r(n.group)),
            e.join(";")
        }

        function J(t) {
            return ce(function() {
                return i.scanList.gridApi.infiniteScroll.saveScrollPercentage(),
                w.getScans(X(), i.scanList.nextCursor, t ? t.limit: u.LIST_PAGE_SIZE, {
                    onRetry: function() {
                        function e() {
                            return J(t)
                        }
                        return e
                    } ()
                }).then(function(t) {
                    var n = t.scans,
                    r = t.pagination;
                    n.forEach(function(e) {
                        i.scanList.items.find(function(t) {
                            return t.scanId === e.scanId
                        }) || i.scanList.items.push(e)
                    }),
                    i.scanList.nextCursor = r.nextCursor,
                    i.scanList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(i.scanList.nextCursor))
                }).
                catch(function(e) {
                    return i.scanList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                    r.reject(e)
                })
            })
        }

        function ee(e, t) {
            return _.generateNewReport(e, t, {
                tracker: i.loadingTracker,
                onRetry: function() {
                    function n() {
                        return ee(e, t)
                    }
                    return n
                } ()
            }).then(function() {
                A.success(T.getString("正在创建报表"))
            })
        }

        function te() {
            return ce(function() {
                var e = 0;
                return P().reduce(function(t, n) {
                    return t.then(function() {
                        return w.removeScan(n.scanId)
                    }).then(function() {
                        i.scanList.gridApi.selection.unSelectRow(n),
                        i.scanList.items.splice(i.scanList.items.indexOf(n), 1),
                        e++
                    })
                },
                r.when()).then(function() {
                    if (e > 0 && void 0 !== i.scanList.nextCursor) return J({
                        limit: e
                    })
                }).then(W)
            })
        }

        function ne() {
            return ce(function() {
                var t = 0,
                n = ["aborted", "aborting", "completed", "failed", "scheduled"];
                return P().reduce(function(r, o) {
                    return n.indexOf(o.status) > -1 ? (i.scanList.gridApi.selection.unSelectRow(o), r) : r.then(function() {
                        return w.abortScan(o.scanId)
                    }).then(function(n) {
                        n ? (e.extend(o, n), i.scanList.gridApi.selection.unSelectRow(o)) : (i.scanList.items.splice(i.scanList.items.indexOf(o), 1), t++)
                    })
                },
                r.when()).then(function() {
                    if (t > 0 && void 0 !== i.scanList.nextCursor) return J({
                        limit: t
                    })
                })
            })
        }

        function re() {
            i.scanList.gridApi && i.scanList.gridApi.infiniteScroll.resetScroll(!1, e.isDefined(i.scanList.nextCursor))
        }

        function ie() {
            v.set("list-scans", i.scanList.gridApi.saveState.save())
        }

        function oe() {
            var e = v.get("list-scans");
            e && i.scanList.gridApi.saveState.restore(i, e)
        }

        function ae() {
            v.remove("list-scans"),
            o.reload(o.current)
        }

        function se() {
            if (i.$$destroyed || pe) return r.when();
            var e = r.defer(),
            n = i.$on("$destroy",
            function() {
                return e.resolve()
            });
            r.when().then(function() {
                pe = !0
            }).then(function() {
                var n = t.chain(t.get(i, "scanList.gridApi.grid.renderContainers.body.renderedRows", [])).map(t.property("entity")).take(20).value();
                return w.refreshScans(n, {
                    timeout: e.promise
                }).then(function(e) {
                    e.forEach(function(e) {
                        var t = i.scanList.items,
                        n = t.find(function(t) {
                            return t.scanId === e.scanId
                        });
                        if (n && "processing" === n.status) {
                            if (t.indexOf(n) > 0) for (var r = 1; r < t.length; r++) if (null === i.scanList.items[r].lastRun || n.lastRun > t[r].lastRun) {
                                t.splice(r, 0, n),
                                t.splice(t.lastIndexOf(n), 1);
                                break
                            }
                        }
                    })
                })
            }).
            finally(function() {
                n(),
                pe = !1
            })
        }

        function ce(e) {
            var t = i.loadingTracker.createPromise();
            return r.when().then(e).
            finally(t.resolve)
        }

        function ue() {
            i.scanList.items.splice(0),
            i.scanList.nextCursor = void 0,
            i.scanList.gridApi && i.scanList.gridApi.selection && i.scanList.gridApi.selection.clearSelectedRows(),
            re();
            var e = r.defer();
            return s(function() {
                ge.promise.then(J).then(e.resolve, e.reject)
            }),
            e.promise
        }

        function le(e, t) {
            return w.updateScan(e, t, {
                onRetry: function() {
                    function n() {
                        return le(e, t)
                    }
                    return n
                } ()
            })
        }
        var de, pe, fe = !1,
        ge = r.defer(),
        he = u.SCAN_STATUS.filter(function(e) {
            return "continuous" !== e.value
        });
        i.loadingTracker = b({
            activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        i.scanList = {
            items: [],
            nextCursor: void 0
        },
        i.scanList.gridOptions = {
            data: i.scanList.items,
            appScopeProvider: i,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                cellTemplate: __axtr("/templates/scans/list-scan/cell/address.html"),
                field: "target.address",
                displayName: T.getString("目标"),
                width: 320
            },
            {
                displayName: T.getString("目标描述"),
                field: "target.description",
                visible: !1,
                width: 240
            },
            {
                displayName: T.getString("扫描类型"),
                field: "profile.name",
                width: 230
            },
            {
                cellTemplate: __axtr("/templates/scans/list-scan/cell/schedule.html"),
                displayName: T.getString("计划"),
                field: "schedule",
                width: 350
            },
            {
                cellTemplate: __axtr("/templates/scans/list-scan/cell/status.html"),
                displayName: T.getString("状态"),
                field: "status",
                width: 130
            },
            {
                cellTemplate: __axtr("/templates/scans/list-scan/cell/vuln-counters.html"),
                displayName: T.getString("漏洞"),
                field: "severityCounts",
                width: 160
            }],
            gridMenuCustomItems: [{
                title: T.getString("重置"),
                action: ae
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.scanId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.scanId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    i.scanList.gridApi = e,
                    e.infiniteScroll.on.needLoadMoreData(i, J),
                    e.colResizable.on.columnSizeChanged(i, ie),
                    e.core.on.columnVisibilityChanged(i, ie),
                    e.core.on.sortChanged(i, ie),
                    ge.resolve()
                }
                return e
            } ()
        },
        i.searchFilters = {
            threatLevel: h.getStateParam("threat", !0, u.THREAT_LEVEL.map(function(e) {
                return e.value
            })),
            threatLevelList: u.THREAT_LEVEL,
            criticality: h.getStateParam("criticality", !0, u.BUSINESS_CRITICALITY.map(function(e) {
                return e.value
            })),
            criticalityList: u.BUSINESS_CRITICALITY,
            status: h.getStateParam("status", !0, he.map(function(e) {
                return e.value
            })),
            statusList: he,
            profile: h.getStateParam("profile", !0),
            profileList: [],
            target: h.getStateParam("target", !1),
            targetList: [],
            group: h.getStateParam("group", !0),
            groupList: [],
            filterTags: []
        },
        i.filterAsideVisible = !1,
        i.generateReportView = !!a.gr,
        i.noTargetsInSystem = !1,
        i.noScansInSystem = !1,
        i.toggleFilter = R,
        i.selectedItems = P,
        i.selectedItemsCount = N,
        i.onDeleteSelectedScans = D,
        i.onStopSelectedScans = U,
        i.canGenerateReport = F,
        i.canGenerateComparisonReport = M,
        i.onGenerateReport = V,
        i.onGenerateComparisonReport = O,
        i.searchGroups = $,
        i.searchTargets = E,
        i.currentUrl = H,
        i.removeFilterTag = j,
        i.editSchedule = q,
        i.addTargetModal = G,
        i.$on("$destroy", B),
        i.$on("axScrollTop", re),
        i.$watch("searchFilters.status", K),
        i.$watch("searchFilters.target", K),
        i.$watch("searchFilters.group", K),
        i.$watch("searchFilters.profile", K),
        i.$watch("searchFilters.threatLevel", K),
        i.$watch("searchFilters.criticality", K),
        i.$watchCollection(function() {
            return a
        },
        z),
        function() {
            Y(),
            ge.promise.then(function() {
                return $().
                catch(function() {
                    return null
                })
            }).then(function() {
                return E().
                catch(function() {
                    return null
                })
            }).then(function() {
                return Z().
                catch(function() {
                    return null
                })
            }).then(function() {
                return W().
                catch(function() {
                    return null
                })
            }).then(J).
            finally(function() {
                oe(),
                de = n(se, u.LIST_REFRESH_INTERVAL)
            }),
            f.setDocumentTitle(S("扫描")),
            f.setCurrentSection("scans"),
            a.gr && f.setDocumentTitle(S("扫描-生成报告"))
        } ()
    }

    function r(e) {
        e.state("app.list_scans", {
            url: "scans/?threat=&criticality=&status=&profile=&target=&group=&gr=&returnUrl=",
            controller: n,
            templateUrl: __axtr("/templates/scans/list-scan/list-scans.html"),
            reloadOnSearch: !1,
            data: {
                page: {
                    icon: "fa-area-chart",
                    section: "scans"
                }
            },
            onEnter: ["axConstant", "axPage",
            function(e, t) {
                t.setHelpLink(e.HELP_LINKS["scans.list"])
            }],
            onExit: ["axPage",
            function(e) {
                e.setDefaultHelpLink()
            }]
        })
    }
    n.$inject = ["$interval", "$q", "$scope", "$state", "$stateParams", "$timeout", "axAddTargetModal", "axConstant", "axEditScheduleModal", "axGeneralModal", "axGroupsCache", "axPage", "axReportOptionsModal", "axStateHelpers", "axTargetsCache", "axUserPreferences", "CurrentUser", "gettext", "gettextCatalog", "orderByFilter", "promiseTracker", "ReportsApi", "ScannerApi", "ScansApi", "TargetGroupsApi", "TargetsApi", "toastr", "uiGridConstants"],
    e.module("WVS").config(["$stateProvider", r])
} (angular, _),
function(e) {
    "use strict";
    var t = function() {
        function e(e) {
            var t = this;
            this.$scope = e,
            this.secretSection = {
                secret: "",
                retypeSecret: "",
                secretHash: "",
                visible: !1
            },
            e.$watch(function() {
                return t.secretSection.secret
            },
            function() {
                return t._updateSecretHash()
            }),
            e.$watch(function() {
                return t.secretSection.visible
            },
            function() {
                return t._updateSecretHash()
            })
        }
        return e.$inject = ["$scope"],
        e.prototype.onResetSecret = function() {
            var e = this.$scope,
            t = this.secretSection,
            n = t.visible,
            r = t.secretHash;
            e.$emit("axResetSensorSecret", {
                sensorSecret: n && r ? r: void 0
            })
        },
        e.prototype._updateSecretHash = function() {
            var e = this.secretSection,
            t = e.secret,
            n = e.visible;
            this.secretSection.secretHash = n && t ? CryptoJS.MD5(t).toString() : ""
        },
        e
    } (),
    n = function() {
        function e(e, t, n) {
            this.$rootScope = e,
            this.$q = t,
            this.$uibModal = n
        }
        return e.$inject = ["$rootScope", "$q", "$uibModal"],
        e.prototype.resetSensorSecret = function() {
            var e = this,
            n = e.$rootScope,
            r = e.$q,
            i = e.$uibModal,
            o = r.defer(),
            a = n.$new(),
            s = i.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/sensor-secret/sensor-secret.modal.html"),
                scope: a,
                controller: t,
                controllerAs: "$ctrl",
                bindToController: !0
            });
            return a.$on("axResetSensorSecret",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                s.close(t)
            }),
            s.result.then(function(e) {
                o.resolve(e)
            }).
            finally(function() {
                a.$destroy()
            }),
            o.promise
        },
        e
    } ();
    e.module("WVS").service("axSensorSecretModal", n)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function t(e, t, n, r, i, o, a) {
            var s = this;
            this.$scope = e,
            this.$q = t,
            this.axConstant = n,
            this.gettext = r,
            this.promiseTracker = i,
            this.ReportsApi = o,
            this.ScannerApi = a,
            this.error = "",
            this.loadingTracker = i({
                activationDelay: n.PROMISE_TRACKER_ACTIVATION_DELAY
            }),
            this.scanningOptions = {
                reportType: null,
                scanProfile: null
            },
            this.targetCount = e.scanningOptions ? e.scanningOptions.targetCount: 0,
            this.reportTypeList = [],
            this.scanProfileList = [],
            this.currentSchedule = null,
            this.selectedSchedule = {},
            this.grouping = !1,
            e.scanningOptions && (this.targetCount = e.scanningOptions.targetCount, e.scanningOptions.profileId && (this.scanningOptions.scanProfile = e.scanningOptions.profileId), e.scanningOptions.reportType && (this.scanningOptions.reportType = e.scanningOptions.reportType), e.scanningOptions.schedule && (this.currentSchedule = e.scanningOptions.schedule)),
            e.$on("$destroy",
            function() {
                s.loadingTracker.cancel()
            }),
            e.$applyAsync(function() {
                s._init()
            })
        }
        return t.prototype.onLaunchScan = function() {
            var t = this.scanningOptions,
            n = e.extend({
                reportType: t.reportType,
                scanProfile: t.scanProfile
            },
            this.selectedSchedule);
            this.$scope.$emit("axLaunchScan", n)
        },
        t.prototype.onScheduleChanged = function(e) {
            this.selectedSchedule = e
        },
        t.prototype._init = function() {
            this._loadScanningProfiles(),
            this._loadReportTemplates()
        },
        t.prototype._loadScanningProfiles = function() {
            var e = this,
            t = this,
            n = t.ScannerApi,
            r = t.gettext;
            return n.getScanningProfiles({
                noPublishError: !0,
                tracker: this.loadingTracker
            }).then(function(t) {
                e.scanProfileList = t,
                e.scanningOptions.scanProfile = _.get(t, "[0].profileId", null),
                t.find(function(e) {
                    return e.isCustom
                }) && (e.grouping = !0, e.scanProfileList.forEach(function(e) {
                    e.group = r(e.isCustom ? "Custom Scan Types": "Standard Scan Types")
                }))
            }).
            catch(function(t) {
                e.error = t.errorMessage
            })
        },
        t.prototype._loadReportTemplates = function() {
            var e = this;
            this.ReportsApi.getReportTemplates({
                noPublishError: !0,
                tracker: this.loadingTracker
            }).then(function(t) { (n = e.reportTypeList).push.apply(n, t.filter(function(e) {
                    return ! e.comparison
                }));
                var n
            }).
            catch(function(t) {
                e.error = t.errorMessage
            })
        },
        t.$inject = ["$scope", "$q", "axConstant", "gettext", "promiseTracker", "ReportsApi", "ScannerApi"],
        t
    } (),
    n = function() {
        function n(e, t, n) {
            this.$q = e,
            this.$rootScope = t,
            this.$uibModal = n
        }
        return n.prototype.chooseScanningOptions = function(n) {
            void 0 === n && (n = null);
            var r = this,
            i = r.$rootScope,
            o = r.$q,
            a = r.$uibModal,
            s = o.defer(),
            c = e.extend(i.$new(), {
                scanningOptions: n
            }),
            u = a.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/scanning-options/scanning-options.modal.html"),
                scope: c,
                controller: t,
                controllerAs: "$ctrl",
                bindToController: !0
            });
            return c.$on("axLaunchScan",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                u.close(t)
            }),
            u.result.then(function(e) {
                s.resolve(e)
            }).
            finally(function() {
                c.$destroy()
            }),
            s.promise
        },
        n.$inject = ["$q", "$rootScope", "$uibModal"],
        n
    } ();
    e.module("WVS").service("axScanningOptionsModal", n)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function e(e, t, n, r, i) {
            var o = this;
            this.$scope = e,
            this.$q = t,
            this.promiseTracker = n,
            this.axConstant = r,
            this.ReportsApi = i,
            this.error = "",
            this.loadingTracker = n({
                activationDelay: r.PROMISE_TRACKER_ACTIVATION_DELAY
            }),
            this.reportOptions = {
                templateId: null,
                templateList: []
            },
            this.aboutReportTemplatesHelpLink = r.HELP_LINKS["reports.templates"],
            this.allowComparisonTemplates = e.allowComparisonTemplates,
            e.$on("$destroy",
            function() {
                o.loadingTracker.cancel()
            }),
            e.$applyAsync(function() {
                o._init()
            })
        }
        return e.$inject = ["$scope", "$q", "promiseTracker", "axConstant", "ReportsApi"],
        e.prototype.onGenerateReport = function() {
            this.$scope.$emit("axGenerateReport", {
                templateId: this.reportOptions.templateId
            })
        },
        e.prototype._init = function() {
            this._loadReportTemplates()
        },
        e.prototype._loadReportTemplates = function() {
            var e = this,
            t = this,
            n = (t.$scope, t.$q),
            r = t.ReportsApi,
            i = this.loadingTracker.createPromise();
            r.getReportTemplates({
                noPublishError: !0
            }).then(function(t) {
                e.reportOptions.templateList = e.allowComparisonTemplates ? t: t.filter(function(e) {
                    return ! e.comparison
                })
            }).
            catch(function(t) {
                return e.error = t.errorMessage,
                n.reject(t)
            }).
            finally(i.resolve)
        },
        e
    } (),
    n = function() {
        function n(e, t, n) {
            this.$rootScope = e,
            this.$q = t,
            this.$uibModal = n
        }
        return n.$inject = ["$rootScope", "$q", "$uibModal"],
        n.prototype.chooseReportOptions = function(n) {
            void 0 === n && (n = !1);
            var r = this,
            i = r.$q,
            o = r.$rootScope,
            a = r.$uibModal,
            s = i.defer(),
            c = e.extend(o.$new(), {
                allowComparisonTemplates: n
            }),
            u = a.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/report-options/report-options.modal.html"),
                scope: c,
                controller: t,
                controllerAs: "$ctrl",
                bindToController: !0
            });
            return c.$on("axGenerateReport",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                u.close(t)
            }),
            u.result.then(function(e) {
                s.resolve(e)
            }).
            finally(function() {
                c.$destroy()
            }),
            s.promise
        },
        n
    } ();
    e.module("WVS").service("axReportOptionsModal", n)
} (angular),
function(e) {
    "use strict";

    function t(e, t, n, r, i, o) {
        function a() {
            var n = g.connectionTracker.createPromise();
            return i.checkConnection(t.trackerConfig, {
                noPublishError: !0
            }).then(function(t) {
                var n = t.success,
                r = t.errorMessage;
                if (g.error = n ? null: r, g.error) return e.reject({
                    errorMessage: r
                })
            }).
            catch(function(t) {
                return g.error = t.errorMessage || r("Connection to issue tracker cannot be established"),
                e.reject(t)
            }).then(function() {
                if (0 === g.projects.length) return s().then(function() {
                    if (g.projects.length > 0) return t.trackerConfig.project = g.projects[0],
                    c();
                    g.noProjects = !0
                })
            }).
            finally(n.resolve)
        }

        function s() {
            var n = g.projectsTracker.createPromise();
            return i.listProjects(t.trackerConfig, {
                noPublishError: !0
            }).then(function(e) {
                g.error = null,
                g.projects = e,
                g.noProjects = 0 === e.length
            }).
            catch(function(t) {
                return g.error = t.errorMessage || r("No projects are available"),
                e.reject(t)
            }).
            finally(n.resolve)
        }

        function c() {
            if (t.trackerConfig.project) {
                var n = g.issueTypesTracker.createPromise();
                return i.listIssueTypes(t.trackerConfig, t.trackerConfig.project, {
                    noPublishError: !0
                }).then(function(e) {
                    g.error = null,
                    g.issueTypes = e
                }).
                catch(function(t) {
                    return g.error = t.errorMessage || r("No issue types are available for selected project"),
                    e.reject(t)
                }).
                finally(n.resolve)
            }
            return e.resolve()
        }

        function u() {
            return e.when().then(function() {
                return g.validateOnClose ? p() : void 0
            }).then(function() {
                g.error = null,
                t.$emit("axUpdateTrackerConfig", t.trackerConfig.bugTracker ? t.trackerConfig: null)
            })
        }

        function l() {
            return g.connectionTracker.active() || g.validationTracker.active() || g.projectsTracker.active() || g.issueTypesTracker.active()
        }

        function d() {
            g.validationTracker.cancel(),
            g.connectionTracker.cancel()
        }

        function p() {
            var n = g.validationTracker.createPromise();
            return i.checkConnection(t.trackerConfig, {
                noPublishError: !0
            }).then(function(t) {
                var n = t.success,
                r = t.errorMessage;
                if (g.error = n ? null: r, r) return e.reject(r)
            }).then(function() {
                return i.listProjects(t.trackerConfig, {
                    noPublishError: !0
                })
            }).then(function(n) {
                if (!n.find(function(e) {
                    return null != t.trackerConfig.project && t.trackerConfig.project.projectId === e.projectId
                })) return g.error = r("The selected project is not available"),
                e.reject(g.error)
            }).then(function() {
                if (t.trackerConfig.issueType && t.trackerConfig.project) return i.listIssueTypes(t.trackerConfig, t.trackerConfig.project, {
                    noPublishError: !0
                }).then(function(n) {
                    if (!n.find(function(e) {
                        return null != t.trackerConfig.issueType && e.issueTypeId === t.trackerConfig.issueType.issueTypeId
                    })) return g.error = r("The selected issue type is not available"),
                    e.reject(g.error)
                })
            }).
            catch(function(t) {
                return g.validateFailed = !0,
                g.error = t.errorMessage || t.message || String(t),
                e.reject(t)
            }).
            finally(n.resolve)
        }

        function f(e, n) {
            if (e !== n) {
                switch (e) {
                case "github":
                    t.trackerConfig.auth.kind = "http_basic",
                    t.trackerConfig.url = h;
                    break;
                case "tfs":
                    t.trackerConfig.url = m,
                    t.trackerConfig.auth.kind = "ntlm";
                    break;
                case "jira":
                    t.trackerConfig.url = v,
                    t.trackerConfig.auth.kind = "http_basic"
                } ("tfs" === e || "jira" === e) && g.issueTypeForm && g.issueTypeForm.issueType.$invalid && g.issueTypeForm.issueType.$setTouched()
            }
        }
        var g = this,
        h = "https://api.github.com/",
        m = "http://localhost:8080/tfs",
        v = "http://localhost:8080/";
        g.bugTrackers = n.BUG_TRACKERS,
        g.authOptions = {
            jira: n.JIRA_BUG_TRACKER_AUTH
        },
        g.projects = [],
        g.issueTypes = [],
        g.validateOnClose = !0,
        g.validateFailed = !1,
        g.error = "",
        g.noProjects = !1,
        g.validationTracker = o({
            activationDelay: 0
        }),
        g.connectionTracker = o({
            activationDelay: 0
        }),
        g.projectsTracker = o({
            activationDelay: 0
        }),
        g.issueTypesTracker = o({
            activationDelay: 0
        }),
        g.newTrackerConfig = t.newTrackerConfig,
        g.onTestConnection = a,
        g.onRefreshProjects = s,
        g.onRefreshIssueTypes = c,
        g.onUpdate = u,
        g.shouldOverlayContents = l,
        t.$on("$destroy", d),
        function() {
            t.$watch("trackerConfig.bugTracker", f),
            g.projects = t.trackerConfig.project ? [t.trackerConfig.project] : [],
            g.issueTypes = t.trackerConfig.issueType ? [t.trackerConfig.issueType] : []
        } ()
    }
    t.$inject = ["$q", "$scope", "axConstant", "gettext", "IssueTrackersApi", "promiseTracker"];
    var n = function() {
        function n(e, t, n, r) {
            this.$rootScope = e,
            this.$q = t,
            this.gettext = n,
            this.$uibModal = r
        }
        return n.prototype.configureIssueTracker = function(n) {
            var r = this,
            i = r.$uibModal,
            o = r.$rootScope,
            a = r.$q,
            s = r.gettext,
            c = {
                bugTracker: "github",
                url: "https://api.github.com",
                project: null,
                issueType: null,
                name: s("Default"),
                auth: {
                    kind: "http_basic",
                    username: "",
                    password: ""
                }
            },
            u = !n;
            n = e.extend({},
            c, n || {});
            var l = a.defer(),
            d = e.extend(o.$new(), {
                trackerConfig: n,
                newTrackerConfig: u
            }),
            p = i.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/issue-tracker/issue-tracker.modal.html"),
                scope: d,
                controller: t,
                controllerAs: "$ctrl",
                bindToController: !0
            });
            return d.$on("axUpdateTrackerConfig",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                p.close(t)
            }),
            p.result.then(function(e) {
                l.resolve(e)
            }).
            finally(function() {
                d.$destroy()
            }),
            l.promise
        },
        n.$inject = ["$rootScope", "$q", "gettext", "$uibModal"],
        n
    } ();
    e.module("WVS").service("axConfigureIssueTrackerModal", n)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function t(e, t, n, r, i) {
            var o = this;
            this.$scope = e,
            this.CurrentUser = t,
            this.gettext = n,
            this.promiseTracker = r,
            this.ExcludedHoursApi = i,
            this.error = "",
            this.loadingTracker = r({
                activationDelay: 0
            }),
            this.selectedProfile = void 0,
            this.currentUser = t.get(),
            e.$on("$destroy",
            function() {
                o.loadingTracker.cancel()
            }),
            e.$applyAsync(function() {
                o._init()
            })
        }
        return t.$inject = ["$scope", "CurrentUser", "gettext", "promiseTracker", "ExcludedHoursApi"],
        t.prototype.onExclusionsChanged = function(t) {
            this.selectedProfile && (this.selectedProfile.exclusions = e.copy(t))
        },
        t.prototype.onCreateProfile = function() {
            var e = this,
            t = this,
            n = t.$scope,
            r = t.gettext,
            i = t.ExcludedHoursApi,
            o = this.loadingTracker.createPromise();
            i.createExcludedHoursProfile(this.selectedProfile, {
                noPublishError: !0
            }).then(function(t) {
                e.error = "",
                n.$emit("axProfileCreated", t)
            }).
            catch(function(t) {
                e.error = t.errorMessage || r("The excluded hours profile could not be created")
            }).
            finally(o.resolve)
        },
        t.prototype.onUpdateProfile = function() {
            var e = this,
            t = this,
            n = t.$scope,
            r = t.gettext,
            i = t.ExcludedHoursApi,
            o = this.loadingTracker.createPromise();
            i.modifyExcludedHoursProfile(_.omit(this.selectedProfile, ["isNew"]), {
                noPublishError: !0
            }).then(function(t) {
                e.error = "",
                n.$emit("axProfileCreated", t)
            }).
            catch(function(t) {
                e.error = t.errorMessage || r("The excluded hours profile could not be updated")
            }).
            finally(o.resolve)
        },
        t.prototype._init = function() {
            var t = this,
            n = t.$scope,
            r = t.gettext;
            n.profile ? this.selectedProfile = e.copy(n.profile) : this.selectedProfile = {
                name: r("New Profile"),
                timeOffset: -(new Date).getTimezoneOffset(),
                exclusions: _.range(168).map(_.stubFalse),
                isNew: !0
            }
        },
        t
    } (),
    n = function() {
        function n(e, t, n) {
            this.$rootScope = e,
            this.$q = t,
            this.$uibModal = n
        }
        return n.$inject = ["$rootScope", "$q", "$uibModal"],
        n.prototype.open = function(n) {
            var r = this,
            i = r.$q,
            o = r.$rootScope,
            a = r.$uibModal,
            s = i.defer(),
            c = e.extend(o.$new(), {
                profile: n
            }),
            u = a.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/exclusion-hours/exclusion-hours.modal.html"),
                scope: c,
                controller: t,
                controllerAs: "$ctrl",
                bindToController: !0,
                size: "lg"
            });
            return c.$on("axProfileUpdated",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                u.close(t)
            }),
            c.$on("axProfileCreated",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                u.close(t)
            }),
            u.result.then(function(e) {
                s.resolve(e)
            }).
            finally(function() {
                c.$destroy()
            }),
            s.promise
        },
        n
    } ();
    e.module("WVS").service("axExclusionHoursProfileModal", n)
} (angular),
function(e) {
    "use strict";
    var t = e.extend,
    n = e.copy,
    r = function() {
        function e(e) {
            this.$scope = e,
            this.currentSchedule = e.schedule,
            this.selectedSchedule = {}
        }
        return e.prototype.onUpdateSchedule = function() {
            this.$scope.$emit("axUpdateSchedule", t(n(this.selectedSchedule), {
                disabled: !1
            }))
        },
        e.prototype.onDisableSchedule = function() {
            this.$scope.$emit("axDisableSchedule", t(n(this.selectedSchedule), {
                disabled: !0
            }))
        },
        e.prototype.onScheduleChanged = function(e) {
            this.selectedSchedule = e
        },
        e.$inject = ["$scope"],
        e
    } (),
    i = function() {
        function t(e, t, n) {
            this.$rootScope = e,
            this.$q = t,
            this.$uibModal = n
        }
        return t.prototype.editSchedule = function(t) {
            if (null == t) throw new Error("Parameter 'schedule' cannot be null.");
            var n = this,
            i = n.$uibModal,
            o = n.$q,
            a = n.$rootScope,
            s = o.defer(),
            c = e.extend(a.$new(), {
                schedule: t
            }),
            u = i.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/edit-schedule/edit-schedule.modal.html"),
                scope: c,
                controller: r,
                controllerAs: "$ctrl",
                bindToController: !0
            });
            return c.$on("axUpdateSchedule",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                u.close(t)
            }),
            c.$on("axDisableSchedule",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                u.close({
                    disabled: t.disabled
                })
            }),
            u.result.then(function(e) {
                s.resolve(e)
            }).
            finally(function() {
                c.$destroy()
            }),
            s.promise
        },
        t.$inject = ["$rootScope", "$q", "$uibModal"],
        t
    } ();
    e.module("WVS").service("axEditScheduleModal", i)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function t(e, t, n, r, i) {
            var o = this;
            this.$scope = e,
            this.$q = t,
            this.promiseTracker = n,
            this.axConstant = r,
            this.TargetGroupsApi = i,
            this.error = "",
            this.loadingTracker = n({
                activationDelay: r.PROMISE_TRACKER_ACTIVATION_DELAY
            }),
            e.$on("$destroy",
            function() {
                o.loadingTracker.cancel()
            })
        }
        return t.$inject = ["$scope", "$q", "promiseTracker", "axConstant", "TargetGroupsApi"],
        t.prototype.onUpdateGroup = function() {
            var t = this,
            n = this,
            r = n.$scope,
            i = n.TargetGroupsApi,
            o = this.loadingTracker.createPromise();
            i.updateGroup(this.group, {
                noPublishError: !0
            }).then(function(n) {
                return t.error = "",
                r.$emit("axGroupUpdated", e.copy(n)),
                n
            }).
            catch(function(e) {
                t.error = e.errorMessage
            }).
            finally(o.resolve)
        },
        t
    } (),
    n = function() {
        function n(e, t, n) {
            this.$rootScope = e,
            this.$q = t,
            this.$uibModal = n
        }
        return n.$inject = ["$rootScope", "$q", "$uibModal"],
        n.prototype.editGroup = function(n) {
            var r = this,
            i = r.$rootScope,
            o = r.$q,
            a = r.$uibModal,
            s = o.defer(),
            c = e.extend(i.$new(), {
                group: {
                    groupId: n.groupId,
                    name: n.name,
                    description: n.description
                }
            }),
            u = a.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/edit-group/edit-group.modal.html"),
                scope: c,
                controller: t,
                controllerAs: "$ctrl",
                bindToController: !0
            });
            return c.$on("axGroupUpdated",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                u.close(t)
            }),
            u.result.then(function(e) {
                s.resolve(e)
            }).
            finally(function() {
                c.$destroy()
            }),
            s.promise
        },
        n
    } ();
    e.module("WVS").service("axEditGroupModal", n)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function t(e, t, n, r, i) {
            var o = this;
            this.$scope = e,
            this.$q = t,
            this.promiseTracker = n,
            this.axConstant = r,
            this.WorkersApi = i,
            this.error = "",
            this.loadingTracker = n({
                activationDelay: r.PROMISE_TRACKER_ACTIVATION_DELAY
            }),
            this.engine = e.engine,
            e.$on("$destroy",
            function() {
                o.loadingTracker.cancel()
            })
        }
        return t.prototype.onUpdate = function() {
            var t = this,
            n = this,
            r = n.$scope,
            i = n.WorkersApi,
            o = this.loadingTracker.createPromise();
            i.rename(this.engine.workerId, this.engine.description, {
                noPublishError: !0
            }).then(function() {
                t.error = "",
                r.$emit("axEngineUpdated", e.copy(t.engine))
            }).
            catch(function(e) {
                t.error = e.errorMessage
            }).
            finally(o.resolve)
        },
        t.$inject = ["$scope", "$q", "promiseTracker", "axConstant", "WorkersApi"],
        t
    } (),
    n = function() {
        function n(e, t, n) {
            this.$rootScope = e,
            this.$q = t,
            this.$uibModal = n
        }
        return n.$inject = ["$rootScope", "$q", "$uibModal"],
        n.prototype.show = function(n) {
            var r = this,
            i = r.$rootScope,
            o = r.$q,
            a = r.$uibModal,
            s = o.defer(),
            c = e.extend(i.$new(), {
                engine: e.copy(n)
            }),
            u = a.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/edit-engine/edit-engine.modal.html"),
                scope: c,
                controller: t,
                controllerAs: "$ctrl",
                bindToController: !0
            });
            return c.$on("axEngineUpdated",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                u.close(t)
            }),
            u.result.then(function(e) {
                s.resolve(e)
            }).
            finally(function() {
                c.$destroy()
            }),
            s.promise
        },
        n
    } ();
    e.module("WVS").service("axEditEngineModal", n)
} (angular),
function(e, t) {
    "use strict";
    var n = function() {
        function t(e, t, n, r, i, o, a, s, c) {
            var u = this;
            this.$scope = e,
            this.$q = t,
            this.axConstant = n,
            this.CurrentUser = r,
            this.gettextCatalog = i,
            this.promiseTracker = o,
            this.TargetGroupsApi = a,
            this.toastr = s,
            this.uiGridConstants = c,
            this._gridApiReady = t.defer(),
            this.loadingTracker = o({
                activationDelay: n.PROMISE_TRACKER_ACTIVATION_DELAY
            }),
            this.error = "",
            this.groupList = {
                items: [],
                nextCursor: void 0
            },
            this.groupList.gridOptions = {
                data: this.groupList.items,
                appScopeProvider: this,
                enableColumnMenus: !1,
                enableColumnResizing: !0,
                enableGridMenu: !1,
                enableSelectAll: !1,
                enableSelectionBatchEvent: !1,
                enableHorizontalScrollbar: c.scrollbars.NEVER,
                enableVerticalScrollbar: c.scrollbars.ALWAYS,
                enableSorting: !1,
                useExternalSorting: !0,
                enableFiltering: !1,
                useExternalFiltering: !0,
                columnDefs: [{
                    field: "name",
                    displayName: i.getString("名称"),
                    width: "*"
                },
                {
                    field: "description",
                    displayName: i.getString("描述"),
                    width: "*"
                }],
                getRowIdentity: function() {
                    function e(e) {
                        return e.groupId
                    }
                    return e
                } (),
                rowIdentity: function() {
                    function e(e) {
                        return e.groupId
                    }
                    return e
                } (),
                infiniteScrollRowsFromEnd: 20,
                infiniteScrollUp: !1,
                infiniteScrollDown: !0,
                onRegisterApi: function() {
                    function t(t) {
                        u.groupList.gridApi = t,
                        t.infiniteScroll.on.needLoadMoreData(e,
                        function() {
                            return u._nextItems()
                        }),
                        u._gridApiReady.resolve()
                    }
                    return t
                } ()
            },
            this.currentUser = r.get(),
            e.$on("$destroy",
            function() {
                u.loadingTracker.cancel()
            }),
            e.$watch(function() {
                return r.get()
            },
            function(e) {
                u.currentUser = e
            }),
            e.$applyAsync(function() {
                return u._init()
            })
        }
        return t.$inject = ["$scope", "$q", "axConstant", "CurrentUser", "gettextCatalog", "promiseTracker", "TargetGroupsApi", "toastr", "uiGridConstants"],
        t.prototype.updateGroupMembership = function() {
            var e = this,
            t = this,
            n = t.$scope,
            r = t.$q,
            i = t.gettextCatalog,
            o = t.toastr,
            a = t.TargetGroupsApi,
            s = this.loadingTracker.createPromise();
            return this.selectedItems().reduce(function(e, t) {
                var r = t.groupId;
                return e.then(function() {
                    return a.changeTargets(r, {
                        add: n.targetIdList
                    },
                    {
                        noPublishError: !0
                    })
                })
            },
            r.when()).
            catch(function(t) {
                return e.error = t.errorMessage,
                r.reject(t)
            }).then(function() {
                e.error = "",
                o.success(i.getString("已更新组成员身份")),
                n.$emit("axGroupMembershipChanged")
            }).
            finally(s.resolve)
        },
        t.prototype.selectedItems = function() {
            var e = this.groupList.gridApi && this.groupList.gridApi.selection;
            return e ? e.getSelectedRows() : []
        },
        t.prototype.selectedItemsCount = function() {
            var e = this.groupList.gridApi && this.groupList.gridApi.selection;
            return e ? e.getSelectedCount() : 0
        },
        t.prototype.createGroup = function() {
            this.$scope.$emit("axCreateGroupModal")
        },
        t.prototype._init = function() {
            var e = this;
            this._gridApiReady.promise.then(function() {
                return e._nextItems()
            })
        },
        t.prototype._nextItems = function() {
            var t = this;
            this.groupList.gridApi.infiniteScroll.saveScrollPercentage();
            var n = this,
            r = n.$q,
            i = n.TargetGroupsApi,
            o = n.axConstant,
            a = this.loadingTracker.createPromise();
            return i.getGroups(void 0, this.groupList.nextCursor, o.LIST_PAGE_SIZE, {
                noPublishError: !0,
                onRetry: function() {
                    function e() {
                        return t._nextItems()
                    }
                    return e
                } ()
            }).then(function(n) {
                var r = n.groups,
                i = n.pagination;
                r.forEach(function(e) {
                    t.groupList.items.find(function(t) {
                        return t.groupId === e.groupId
                    }) || t.groupList.items.push(e)
                }),
                t.groupList.nextCursor = i.nextCursor,
                t.groupList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(i.nextCursor)),
                t.error = ""
            }).
            catch(function(e) {
                return t.groupList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                t.error = e.errorMessage,
                r.reject(e)
            }).
            finally(a.resolve)
        },
        t
    } (),
    r = function() {
        function r(e, t, n) {
            this.$rootScope = e,
            this.$q = t,
            this.$uibModal = n
        }
        return r.$inject = ["$rootScope", "$q", "$uibModal"],
        r.prototype.configureGroups = function(r) {
            var i = this,
            o = i.$q,
            a = i.$rootScope,
            s = i.$uibModal,
            c = o.defer(),
            u = e.extend(a.$new(), {
                targetIdList: r.map(function(e) {
                    return t.get(e, "targetId", e)
                })
            }),
            l = s.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/configure-groups/configure-groups.modal.html"),
                scope: u,
                controller: n,
                controllerAs: "$ctrl",
                bindToController: !0
            });
            return u.$on("axGroupMembershipChanged",
            function(e) {
                e.stopPropagation && e.stopPropagation(),
                l.close()
            }),
            u.$on("axCreateGroupModal",
            function(e) {
                e.stopPropagation && e.stopPropagation(),
                l.dismiss(),
                a.$emit("axCreateGroupModal")
            }),
            l.result.then(function() {
                c.resolve()
            }).
            finally(function() {
                u.$destroy()
            }),
            c.promise
        },
        r
    } ();
    e.module("WVS").service("axConfigureGroupsModal", r)
} (angular, _),
function(e) {
    "use strict";
    var t = e.identity,
    n = function() {
        function n(e, t, n, r, i, o, a) {
            var s = this;
            this.$scope = e,
            this.$q = t,
            this.axConstant = n,
            this.axEscapeHtmlFilter = r,
            this.ChildUsersApi = i,
            this.CurrentUser = o,
            this.promiseTracker = a,
            this.error = "",
            this.loadingTracker = a({
                activationDelay: n.PROMISE_TRACKER_ACTIVATION_DELAY
            }),
            this.roleList = this.axConstant.USER_ROLE,
            this.user = {
                email: "",
                firstName: "",
                lastName: "",
                role: "",
                accessAllGroups: !1,
                password: "",
                retypePassword: ""
            },
            e.$on("$destroy",
            function() {
                s.loadingTracker.cancel()
            }),
            this.maxUsersLimitReached = e.maxUsersLimitReached,
            this.featureNA = "OVSTRIAL" === _.get(o.get(), "license.productCode")
        }
        return n.prototype.onAddUser = function() {
            var n = this,
            r = this.loadingTracker.createPromise(),
            i = this,
            o = i.$scope,
            a = i.ChildUsersApi,
            s = i.axEscapeHtmlFilter;
            a.addUser(this.user, {
                noPublishError: !0
            }).then(function(e) {
                o.error = "",
                o.$emit("axUserAdded", e)
            }).
            catch(function(r) {
                r.data && e.isString(r.data.message) && "too many child users" === r.data.message.toLowerCase() && (r.errorMessage = t("您的许可证不包括所有用户。请删除其中的一些。")),
                n.error = r.errorMessage || s(r.message)
            }).
            finally(r.resolve)
        },
        n.$inject = ["$scope", "$q", "axConstant", "axEscapeHtmlFilter", "ChildUsersApi", "CurrentUser", "promiseTracker"],
        n
    } (),
    r = function() {
        function t(e, t, n) {
            this.$rootScope = e,
            this.$q = t,
            this.$uibModal = n
        }
        return t.$inject = ["$rootScope", "$q", "$uibModal"],
        t.prototype.addUser = function(t) {
            void 0 === t && (t = !1);
            var r = this,
            i = r.$q,
            o = r.$rootScope,
            a = r.$uibModal,
            s = i.defer(),
            c = e.extend(o.$new(), {
                maxUsersLimitReached: t
            }),
            u = a.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/add-user/add-user.modal.html"),
                scope: c,
                controller: n,
                controllerAs: "$ctrl",
                bindToController: !0
            });
            return c.$on("axUserAdded",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                u.close(t)
            }),
            u.result.then(function(e) {
                s.resolve(e)
            }).
            finally(function() {
                c.$destroy()
            }),
            s.promise
        },
        t
    } ();
    e.module("WVS").service("axAddUserModal", r)
} (angular),
function(e, t) {
    "use strict";
    var n = function() {
        function e(e, t, n, r, i, o, a, s) {
            var c = this;
            this.$scope = e,
            this.$rootScope = t,
            this.axConstant = n,
            this.axEscapeHtmlFilter = r,
            this.gettext = i,
            this.promiseTracker = o,
            this.CurrentUser = a,
            this.TargetsApi = s,
            this.loadingTracker = o({
                activationDelay: n.PROMISE_TRACKER_ACTIVATION_DELAY
            }),
            this.target = {
                address: null != e.address ? e.address: "",
                description: null != e.description ? e.description: "",
                criticality: null != e.criticality ? e.criticality: "10",
                networkOnly: !1
            },
            this.criticalityList = n.BUSINESS_CRITICALITY,
            this.error = "";
            e.$on("$destroy",
            function() {
                c.loadingTracker.cancel()
            })
        }
        return e.prototype.onAddTarget = function() {
            var e = this,
            n = this,
            r = n.TargetsApi,
            i = n.axEscapeHtmlFilter,
            o = n.$scope,
            a = (n.$rootScope, n.gettext),
            s = this.loadingTracker.createPromise();
            r.addTarget(this.target, {
                noPublishError: !0
            }).then(function(t) {
                e.error = "",
                o.$emit("axTargetAdded", t)
            }).
            catch(function(n) {
                var r = t.get(n, "data.details[0].body.problems[0]", null);
                r && "format" === r.code && "body.address" === r.param_path ? e.error = a("Address is not valid [invalid-address-format]") : e.error = i(n.errorMessage)
            }).
            finally(s.resolve)
        },
        e.$inject = ["$scope", "$rootScope", "axConstant", "axEscapeHtmlFilter", "gettext", "promiseTracker", "CurrentUser", "TargetsApi"],
        e
    } (),
    r = function() {
        function t(e, t, n) {
            this.$rootScope = e,
            this.$q = t,
            this.$uibModal = n
        }
        return t.prototype.addTarget = function(t) {
            void 0 === t && (t = "");
            var r = this,
            i = r.$rootScope,
            o = r.$q,
            a = r.$uibModal,
            s = o.defer(),
            c = e.extend(i.$new(), {
                address: t
            }),
            u = a.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/add-target/add-target.modal.html"),
                scope: c,
                controller: n,
                controllerAs: "$ctrl",
                bindToController: !0
            });
            return c.$on("axTargetAdded",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                u.close(t)
            }),
            u.result.then(function(e) {
                s.resolve(e)
            }).
            finally(function() {
                c.$destroy()
            }),
            s.promise
        },
        t.$inject = ["$rootScope", "$q", "$uibModal"],
        t
    } ();
    e.module("WVS").service("axAddTargetModal", r)
} (angular, _),
function(e) {
    "use strict";
    var t = function() {
        function e(e, t, n, r, i) {
            var o = this;
            this.$scope = e,
            this.$q = t,
            this.promiseTracker = n,
            this.axConstant = r,
            this.TargetGroupsApi = i,
            this.loadingTracker = n({
                activationDelay: r.PROMISE_TRACKER_ACTIVATION_DELAY
            }),
            this.group = {
                name: "",
                description: ""
            },
            this.error = "",
            e.$on("$destroy",
            function() {
                o.loadingTracker.cancel()
            })
        }
        return e.$inject = ["$scope", "$q", "promiseTracker", "axConstant", "TargetGroupsApi"],
        e.prototype.onAddGroup = function() {
            var e = this,
            t = this,
            n = t.$scope,
            r = t.TargetGroupsApi,
            i = this.loadingTracker.createPromise();
            this.error = "",
            r.addGroup(this.group.name, this.group.description, {
                noPublishError: !0
            }).then(function(e) {
                n.$emit("axGroupAdded", e)
            }).
            catch(function(t) {
                e.error = t.errorMessage
            }).
            finally(i.resolve)
        },
        e
    } (),
    n = function() {
        function e(e, t, n) {
            this.$rootScope = e,
            this.$q = t,
            this.$uibModal = n
        }
        return e.$inject = ["$rootScope", "$q", "$uibModal"],
        e.prototype.addGroup = function() {
            var e = this,
            n = e.$rootScope,
            r = e.$q,
            i = e.$uibModal,
            o = r.defer(),
            a = n.$new(),
            s = i.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/add-group/add-group.modal.html"),
                scope: a,
                controller: t,
                controllerAs: "$ctrl",
                bindToController: !0
            });
            return a.$on("axGroupAdded",
            function(e, t) {
                e.stopPropagation && e.stopPropagation(),
                s.close(t)
            }),
            s.result.then(function(e) {
                o.resolve(e)
            }).
            finally(function() {
                a.$destroy()
            }),
            o.promise
        },
        e
    } ();
    e.module("WVS").service("axAddGroupModal", n)
} (angular),
function(e) {
    "use strict";
    // Check license every 3 seconds
    var t = 5e3,
    n = function() {
        function n(e, n, r, i, o, a, s, c, u) {
            var l = this;
            this.$rootScope = e,
            this.$scope = n,
            this.$q = r,
            this.$timeout = i,
            this.$uibModal = o,
            this.gettext = a,
            this.axGeneralModal = s,
            this.AccountApi = c,
            this.SystemConfigApi = u,
            this._checkLicenseTimer = i(function() {
                return void l._checkLicense()
            },
            t)
        }
        return n.prototype._checkLicense = function() {
            var n = this,
            r = this,
            i = r.AccountApi,
            o = r.SystemConfigApi,
            a = r.$rootScope,
            s = r.$scope,
            c = r.$timeout,
            u = r.gettext,
            l = r.axGeneralModal;
            if (!s.$$destroyed) return o.getSystemInfo({
                noPublishError: !0
            }).then(function(t) {
                var n = t.license;
                return ! s.$$destroyed && (!n.activated || (s.$dismiss("close"), i.getProfile().then(function() {
                    var t = e.extend(a.$new(), {
                        message: u("感谢您激活产品.")
                    });
                    return l.alert({
                        scope: t
                    }).then(function() {
                        return ! 1
                    }).
                    finally(function() {
                        return t.$destroy()
                    })
                })))
            }).
            catch(function(e) {
                return ! 0
            }).then(function(e) {
                s.$destroyed || e && (n._checkLicenseTimer = c(function() {
                    return void n._checkLicense()
                },
                t))
            })
        },
        n.$inject = ["$rootScope", "$scope", "$q", "$timeout", "$uibModal", "gettext", "axGeneralModal", "AccountApi", "SystemConfigApi"],
        n
    } (),
    r = function() {
        function e(e, t, n) {
            this.$rootScope = e,
            this.$q = t,
            this.$uibModal = n
        }
        return e.prototype.show = function() {
            var e = this,
            t = e.$q,
            r = e.$rootScope,
            i = e.$uibModal,
            o = t.defer(),
            a = r.$new();
            return i.open({
                keyboard: !1,
                backdrop: "static",
                templateUrl: __axtr("/templates/modals/activation/activation.modal.html"),
                scope: a,
                controller: n,
                controllerAs: "$ctrl",
                bindToController: !0
            }).result.then(o.resolve, o.reject).
            finally(function() {
                return a.$destroy()
            }),
            o.promise
        },
        e.$inject = ["$rootScope", "$q", "$uibModal"],
        e
    } ();
    e.module("WVS").service("axActivationModal", r)
} (angular),
function(e) {
    "use strict";

    function t() {
        return {
            restrict: "A",
            controller: n
        }
    }

    function n(e, t, n, r, i, o, a, s, c, u) {
        function l() {
            return n.get("/build.json", {
                cache: !1,
                timeout: 5e3
            }).then(function(e) {
                return 200 === e.status ? e.data.build: o.reject()
            })
        }

        function d() {
            return c.positionClass = "toast-bottom-left",
            a.info(y, {
                allowHtml: !0,
                preventOpenDuplicates: !0,
                timeOut: 0,
                extendedTimeOut: 0,
                closeButton: !0,
                tapToDismiss: !1,
                autoDismiss: !1,
                onHidden: function() {
                    function t() {
                        e.enabled = !0
                    }
                    return t
                } ()
            }).open.promise.
            finally(function() {
                c.positionClass = "toast-top-right"
            })
        }

        function p() {
            return o.when().then(function() {
                return v ? o.reject() : v = !0
            }).then(l).then(function(t) {
                if (null === m) m = t,
                i.info("Using build " + m);
                else if (t !== m) return i.info("A new version of Acunetix is available. Build " + t),
                e.enabled = !1,
                d()
            }).
            finally(function() {
                v = !1
            })
        }

        function f(e) {
            h && (r.cancel(h), h = null),
            e && (h = r(p, u.VERSION_CHECK_INTERVAL))
        }

        function g(t, n) {
            t !== n && f(e.enabled)
        }
        var h = null,
        m = null,
        v = !1,
        y = s.getString('Acunetix has just been updated. <a class="btn btn-sm btn-default" href="/" target="_self" onclick="window.location.reload(true);return false;">REFRESH</a>');
        e.$watch("enabled", g),
        e.$watch(function() {
            return u.VERSION_CHECK_INTERVAL
        },
        g),
        e.$on("$destroy", t.$on(u.API_EVENTS.USER_LOGGED_IN, p)),
        function() {
            e.enabled = !0,
            f(!0),
            p()
        } ()
    }
    n.$inject = ["$scope", "$rootScope", "$http", "$interval", "$log", "$q", "toastr", "gettextCatalog", "toastrConfig", "axConstant"],
    e.module("WVS").directive("axVersionCheck", t)
} (angular),
function(e) {
    "use strict";

    function t() {
        return {
            restrict: "E",
            link: function() {
                function e(e, t, n) {
                    function r() {
                        var e = "";
                        switch (parseInt(n.severity)) {
                        case 0:
                            e = "info";
                            break;
                        case 1:
                            e = "low";
                            break;
                        case 2:
                            e = "medium";
                            break;
                        case 3:
                            e = "high"
                        }
                        t.removeClass(["ax-severity-indicator--", "ax-severity-indicator--high", "ax-severity-indicator--medium", "ax-severity-indicator--low", "ax-severity-indicator--info"].join(" ")).addClass("ax-severity-indicator ax-severity-indicator--" + e).css("marginTop", "-2px")
                    }
                    n.$observe("severity", r),
                    r()
                }
                return e
            } ()
        }
    }
    e.module("WVS").directive("axSeverityIndicator", t)
} (angular),
function(e) {
    "use strict";

    function t(e) {
        return {
            link: function() {
                function t(t, n) {
                    e.enabled(n, !1)
                }
                return t
            } ()
        }
    }
    t.$inject = ["$animate"],
    e.module("WVS").directive("axNoAnimate", t)
} (angular),
function(e) {
    "use strict";

    function t(t, n) {
        return {
            restrict: "E",
            scope: {
                toggleVisibility: "&"
            },
            link: function() {
                function r(r, i) {
                    function o(o) {
                        t.$applyAsync(function() {
                            var t = e.element(o.target);
                            if (! (t.hasClass("ui-select-match-close") || t.closest(".uib-datepicker").length > 0 || t.closest(".ui-select-choices-row-inner").length > 0)) {
                                e.element(n[0].elementFromPoint(o.clientX, o.clientY)).closest("ax-filter-aside").length > 0 || 0 === t.closest("ax-filter-aside,.ax-filter-button").length && i.hasClass("ax-filter-aside--visible") && r.toggleVisibility()
                            }
                        })
                    }
                    n.on("click", o),
                    r.$on("$destroy",
                    function() {
                        return n.off("click", o)
                    })
                }
                return r
            } ()
        }
    }
    t.$inject = ["$rootScope", "$document"],
    e.module("WVS").directive("axFilterAside", t)
} (angular),
function(e) {
    "use strict";

    function t(e, t) {
        return {
            restrict: "E",
            link: function() {
                function n(n, r, i) {
                    function o() {
                        var n = "",
                        o = parseInt(i.criticality),
                        a = t(e(o));
                        switch (o) {
                        case 0:
                            n = "low";
                            break;
                        case 10:
                            n = "normal";
                            break;
                        case 20:
                            n = "high";
                            break;
                        case 30:
                            n = "critical"
                        }
                        r.removeClass(["ax-criticality-indicator--", "ax-criticality-indicator--critical", "ax-criticality-indicator--high", "ax-criticality-indicator--normal", "ax-criticality-indicator--low"].join(" ")).addClass("ax-criticality-indicator ax-criticality-indicator--" + n).text(a)
                    }
                    i.$observe("criticality", o),
                    o()
                }
                return n
            } ()
        }
    }
    t.$inject = ["axBusinessCriticalityFilter", "translateFilter"],
    e.module("WVS").directive("axCriticalityIndicator", t)
} (angular),
function(e) {
    "use strict";

    function t(t, n) {
        return {
            restrict: "A",
            transclude: !0,
            scope: !1,
            template: '<i class="fa fa-fw fa-chevron-left"></i><span class="m-l-xs" ng-transclude>{{::\'返回\'|translate}}</span>',
            link: function() {
                function r(r, i) {
                    function o() {
                        try {
                            var t = decodeURIComponent(r.returnUrl);
                            n.url(e.isString(t) ? t: "/")
                        } catch(e) {}
                    }

                    function a() {
                        i.css("display", r.returnUrl ? "": "none")
                    }

                    function s(e) {
                        r.returnUrl = e,
                        a()
                    }
                    r.returnUrl = t.returnUrl,
                    r.navigateBack = o,
                    r.canNavigateBack = function() {
                        return e.isString(r.returnUrl) && r.returnUrl.length > 0
                    },
                    i.on("click",
                    function() {
                        r.$applyAsync(o)
                    }),
                    r.$watch(function() {
                        return t.returnUrl
                    },
                    s),
                    a()
                }
                return r
            } ()
        }
    }
    t.$inject = ["$stateParams", "$location"],
    e.module("WVS").directive("axBackButton", t)
} (angular),
function(e) {
    "use strict";

    function t(t) {
        return {
            restrict: "A",
            link: function() {
                function n(n, r) {
                    var i = e.element('<div class="app app-header-fixed app-aside-fixed" id="app" ng-class="{\'app-aside-folded\':app.asideFolded}" ui-view></div>'),
                    o = t(i);
                    r.prepend(o(n))
                }
                return n
            } ()
        }
    }
    t.$inject = ["$compile"],
    e.module("WVS").directive("axApplicationHost", t)
} (angular),
function(e, t) {
    "use strict";

    function n() {
        return {
            restrict: "AC",
            link: function() {
                function n(n, r, i) {
                    function o(n) {
                        n.preventDefault();
                        var o = i.uiToggleClass.split(","),
                        s = i.target && i.target.split(",") || [r],
                        c = 0;
                        e.forEach(o,
                        function(e) {
                            var n = s[s.length && c]; - 1 !== e.indexOf("*") && a(e, n),
                            t(n).toggleClass(e),
                            c++
                        }),
                        r.toggleClass("active")
                    }

                    function a(e, n) {
                        for (var r = new RegExp("\\s" + e.replace(/\*/g, "[A-Za-z0-9-_]+").split(" ").join("\\s|\\s") + "\\s", "g"), i = " " + t(n)[0].className + " "; r.test(i);) i = i.replace(r, " ");
                        t(n)[0].className = t.trim(i)
                    }
                    r.on("click",
                    function(e) {
                        n.$applyAsync(function() {
                            return o(e)
                        })
                    })
                }
                return n
            } ()
        }
    }
    e.module("WVS").directive("uiToggleClass", n)
} (angular, jQuery),
function(e, t) {
    "use strict";

    function n(e, n) {
        return {
            restrict: "A",
            link: function() {
                function r(r, i, o) {
                    function a() {
                        e(function() {
                            var e = o.uiShift,
                            t = o.target;
                            u.hasClass("in") || u[e](t).addClass("in")
                        })
                    }

                    function s() {
                        c && c.prepend(i),
                        !c && u.insertAfter(d),
                        u.removeClass("in")
                    }
                    var c, u = t(i),
                    l = t(n),
                    d = u.prev(),
                    p = l.width(); ! d.length && (c = u.parent()),
                    p < 768 && a() || s(),
                    l.resize(function() {
                        p !== l.width() && e(function() {
                            l.width() < 768 && a() || s(),
                            p = l.width()
                        })
                    })
                }
                return r
            } ()
        }
    }
    n.$inject = ["$timeout", "$window"],
    e.module("WVS").directive("uiShift", n)
} (angular, jQuery),
function(e) {
    "use strict";

    function t(t, n) {
        return {
            restrict: "AC",
            link: function() {
                function r(r, i, o) {
                    "_top" === o.uiScrollTo && o.uiScrollToTarget ? i.on("click",
                    function() {
                        return r.$apply(function() {
                            e.element(o.uiScrollToTarget).scrollTop(0)
                        }),
                        !1
                    }) : i.on("click",
                    function() {
                        r.$apply(function() {
                            t.hash(o.uiScrollTo),
                            n()
                        })
                    })
                }
                return r
            } ()
        }
    }
    t.$inject = ["$location", "$anchorScroll"],
    e.module("WVS").directive("uiScrollTo", t)
} (angular),
function(e, t) {
    "use strict";

    function n(e) {
        return {
            restrict: "AC",
            link: function() {
                function n(n, r) {
                    var i, o = t(e),
                    a = t(".app-aside");
                    r.on("click", "a",
                    function(e) {
                        i && i.trigger("mouseleave.nav");
                        var n = t(this);
                        n.parent().siblings(".active").toggleClass("active"),
                        n.next().is("ul") && n.parent().toggleClass("active") && e.preventDefault(),
                        n.next().is("ul") || o.width() < 768 && t(".off-screen").removeClass("show off-screen")
                    }),
                    r.on("mouseenter", "a",
                    function(e) {
                        if (i && i.trigger("mouseleave.nav"), t("> .nav", a).remove(), !(!t(".app-aside-fixed.app-aside-folded").length || o.width() < 768 || t(".app-aside-dock").length)) {
                            var n, r = t(e.target),
                            s = o.height(); ! r.is("a") && (r = r.closest("a")),
                            r.next().is("ul") && (i = r.next(), r.parent().addClass("active"), n = r.parent().position().top + 50, i.css("top", n), n + i.height() > s && i.css("bottom", 0), n + 150 > s && i.css("bottom", s - n - 50).css("top", "auto"), i.appendTo(a), i.on("mouseleave.nav",
                            function() {
                                t(".dropdown-backdrop").remove(),
                                i.appendTo(r.parent()),
                                i.off("mouseleave.nav").css("top", "auto").css("bottom", "auto"),
                                r.parent().removeClass("active")
                            }), t(".smart").length && t('<div class="dropdown-backdrop"/>').insertAfter(".app-aside").on("click",
                            function(e) {
                                e && e.trigger("mouseleave.nav")
                            }))
                        }
                    }),
                    a.on("mouseleave",
                    function() {
                        i && i.trigger("mouseleave.nav"),
                        t("> .nav", a).remove()
                    })
                }
                return n
            } ()
        }
    }
    n.$inject = ["$window"],
    e.module("WVS").directive("uiNav", n)
} (angular, jQuery),
function(e) {
    "use strict";

    function t(t, n) {
        return {
            restrict: "A",
            compile: function() {
                function r(r, i) {
                    if (!e.isFunction(r[i.uiJq])) throw new Error('ui-jq: The "' + i.uiJq + '" function does not exist');
                    var o = t && t[i.uiJq];
                    return function() {
                        function t(t, r, i) {
                            function a() {
                                var n = [];
                                return i.uiOptions ? (n = t.$eval("[" + i.uiOptions + "]"), e.isObject(o) && e.isObject(n[0]) && (n[0] = e.extend({},
                                o, n[0]))) : o && (n = [o]),
                                n
                            }

                            function s() {
                                n(function() {
                                    r[i.uiJq].apply(r, a())
                                },
                                0, !1)
                            }
                            i.ngModel && r.is("select,input,textarea") && r.bind("change",
                            function() {
                                r.trigger("input")
                            }),
                            s(),
                            function() {
                                i.uiRefresh && t.$watch(i.uiRefresh,
                                function(e, t) {
                                    e != t && s()
                                })
                            } ()
                        }
                        return t
                    } ()
                }
                return r
            } ()
        }
    }
    t.$inject = ["uiJqConfig", "$timeout"],
    e.module("WVS").value("uiJqConfig", {}).directive("uiJq", t)
} (angular),
function(e) {
    "use strict";

    function t(e, t) {
        return {
            link: function() {
                function n(n, r, i) {
                    var o = t(i.uiFocus);
                    n.$watch(o,
                    function(t) { ! 0 === t && e(function() {
                            r[0].focus()
                        })
                    }),
                    o.assign && r.bind("blur",
                    function() {
                        n.$applyAsync(function() {
                            return o.assign(n, !1)
                        })
                    })
                }
                return n
            } ()
        }
    }
    t.$inject = ["$timeout", "$parse"],
    e.module("WVS").directive("uiFocus", t)
} (angular),
function(e) {
    "use strict";

    function t(e, t) {
        return {
            restrict: "AC",
            template: '<span class="bar"></span>',
            link: function() {
                function e(e, n) {
                    n.addClass("butterbar hide"),
                    e.$on("$stateChangeStart",
                    function() {
                        t(),
                        n.removeClass("hide").addClass("active")
                    }),
                    e.$on("$stateChangeSuccess",
                    function(e) {
                        e.targetScope.$watch("$viewContentLoaded",
                        function() {
                            n.addClass("hide").removeClass("active")
                        })
                    })
                }
                return e
            } ()
        }
    }
    t.$inject = ["$rootScope", "$anchorScroll"],
    e.module("WVS").directive("uiButterbar", t)
} (angular),
function(e) {
    "use strict";

    function t(e) {
        return {
            link: function() {
                function t(t, n, r) {
                    t.$watch(function() {
                        return t.$eval(r.setNgAnimate, t)
                    },
                    function(t) {
                        e.enabled( !! t, n)
                    })
                }
                return t
            } ()
        }
    }
    t.$inject = ["$animate"],
    e.module("WVS").directive("setNgAnimate", t)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function e(e) {
            this.$state = e
        }
        return e.$inject = ["$state"],
        e.prototype.navigateToVulnerabilitiesPage = function(e) {
            var t = this.$state;
            this.scanId ? t.go("app.scan_details", {
                scanId: this.scanId,
                view: "vulns",
                status: "open",
                severity: e,
                returnUrl: this.returnUrl
            }) : this.targetId && t.go("app.list_vulns", {
                target: this.targetId,
                status: "open",
                severity: e,
                returnUrl: this.returnUrl
            })
        },
        e.prototype.$onInit = function() {
            this.hasLinks = !(!this.scanId && !this.targetId)
        },
        e.prototype.$onChanges = function() {
            this.hasLinks = !(!this.scanId && !this.targetId)
        },
        e
    } ();
    e.module("WVS").component("axVulnCounters", {
        controller: t,
        templateUrl: __axtr("/templates/components/vuln-counters/vuln-counters.component.html"),
        bindings: {
            vulns: "<",
            targetId: "<?",
            scanId: "<?",
            returnUrl: "<?",
            highSeverityOnly: "<?"
        }
    })
} (angular),
function(e) {
    "use strict";
    var t = {
        3 : "high",
        2 : "medium",
        1 : "low",
        0 : "safe",
        "-1": "none"
    },
    n = function() {
        function n(e, t) {
            this.$scope = e,
            this.$element = t,
            e.$applyAsync(function() {
                t.addClass("ax-threat-level__indicator")
            })
        }
        return n.$inject = ["$scope", "$element"],
        n.prototype.$onChanges = function(n) {
            var r = this,
            i = r.$scope,
            o = r.$element,
            a = null;
            n && n.threat && t.hasOwnProperty(n.threat.currentValue) && (a = t[n.threat.currentValue]),
            i.$applyAsync(function() {
                e.forEach(t,
                function(e) {
                    o.removeClass("ax-threat-level__indicator--" + e)
                }),
                null !== a && o.addClass("ax-threat-level__indicator--" + a)
            })
        },
        n
    } ();
    e.module("WVS").component("axThreatLevel", {
        controller: n,
        template: "",
        bindings: {
            threat: "<"
        }
    })
} (angular),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c) {
        function u(e, n) {
            n && (Array.isArray(e.children) && t.get(e, "children[0].dummy", !1) && e.children.splice(0), 0 === t.get(e, "children.length", 0) && p(e))
        }

        function l(e) {
            if (e.isPlaceholder) {
                d(e.parentLoc).then(function() {
                    t.remove(e.parentLoc.children, e),
                    e.parentLoc = null
                })
            } else m.onLocationSelected && m.onLocationSelected({
                location: e
            })
        }

        function d(e) {
            return m.scanId && m.resultId ? p(e) : r.when()
        }

        function p(n) {
            if (t.get(n, "isFile")) return r.when();
            var o = m.loadingTracker.createPromise();
            return c.getLocationChildren(m.resultId, m.scanId, t.get(n, "locId", 0), t.get(n, "nextCursor"), a.LIST_PAGE_SIZE, {
                cache: s,
                onRetry: function() {
                    function e() {
                        return d(n)
                    }
                    return e
                } ()
            }).then(function(t) {
                var r = t.locations,
                o = t.pagination,
                a = !1;
                if (0 === m.siteStructure.length && r.length > 0 && (a = !0), r.forEach(function(e) {
                    e.parentLoc = n,
                    (e.isFolder || e.isIP) && (e.children = [{
                        locId: (new Date).getDate(),
                        dummy: !0,
                        name: ""
                    }])
                }), n ? Array.isArray(n.children) ? (s = n.children).push.apply(s, r) : n.children = r: (c = m.siteStructure).push.apply(c, r), n && e.isDefined(o.nextCursor) && (n.nextCursor = o.nextCursor, n.children.push({
                    isPlaceholder: !0,
                    name: i.getString("加载更多..."),
                    parentLoc: n,
                    locId: (new Date).getDate()
                })), !n && m.siteStructure.length > 0 && (m.selectedLocation = m.siteStructure[0], m.onLocationSelected && m.onLocationSelected({
                    location: m.selectedLocation
                })), a && m.siteStructure.length > 0) return p(r[0]).then(function() {
                    r[0].children.splice(0, 1),
                    m.expandedNodes.push(r[0])
                });
                var s, c
            }).
            catch(function(e) {
                return r.reject(e)
            }).
            finally(o.resolve)
        }

        function f() {
            d()
        }

        function g(e) {
            e.locId && !e.locId.isFirstChange() && (m.selectedLocation = h(m.siteStructure, e.locId.currentValue) || (m.siteStructure.length > 0 ? m.siteStructure[0] : null), m.selectedLocation && m.onLocationSelected && m.onLocationSelected({
                location: m.selectedLocation
            }))
        }

        function h(e, t) {
            for (var n = 0; n < e.length; n++) {
                if (e[n].locId === t) return e[n];
                if (Array.isArray(e[n].children)) {
                    var r = h(e[n].children, t);
                    if (r) return r
                }
            }
            return null
        }
        var m = this;
        m.loadingTracker = o({
            activationDelay: a.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        m.siteStructure = [],
        m.treeOptions = {
            allowDeselect: !1,
            equality: function() {
                function e(e, t) {
                    return e == t || !(!e || !t) && e.locId === t.locId
                }
                return e
            } (),
            isLeaf: function() {
                function e(e) {
                    return ! e.isFolder && !e.isIP
                }
                return e
            } (),
            injectClasses: {
                iLeaf: "fa fa-file-text",
                iExpanded: "fa fa-folder-open",
                iCollapsed: "fa fa-folder"
            }
        },
        m.selectedLocation = null,
        m.expandedNodes = [],
        m.onNodeToggle = u,
        m.onNodeSelected = l,
        m.$onInit = f,
        m.$onChanges = g
    }
    n.$inject = ["$scope", "$q", "gettextCatalog", "promiseTracker", "axConstant", "axLocationsCache", "ResultsApi"],
    e.module("WVS").component("axSiteStructure", {
        controller: n,
        templateUrl: __axtr("/templates/components/site-structure/site-structure.component.html"),
        bindings: {
            scanId: "<",
            resultId: "<",
            locId: "<?",
            onLocationSelected: "&?",
            onLocationLoaded: "&?"
        }
    })
} (angular, _),
function(e, t) {
    "use strict";

    function n(e, n, r) {
        function i() {
            var e = {
                scheduleType: d.scheduleType,
                scheduleDate: d.scheduleDateOptions.selectedDate,
                timeSensitive: !1
            };
            if (d.timeSensitiveOptions.enabled) {
                var n = d.timeSensitiveOptions.selectedTime;
                n && (e.scheduleDate.setHours(n.getHours()), e.scheduleDate.setMinutes(n.getMinutes()), e.scheduleDate.setSeconds(0), e.scheduleDate.setMilliseconds(0), e.timeSensitive = !0)
            }
            if ("recurrent" === e.scheduleType) switch (d.recurrenceOption) {
            case "DAILY":
            case "WEEKLY":
            case "MONTHLY":
                var r = new t({
                    freq: t[d.recurrenceOption],
                    interval: 1,
                    dtstart: e.scheduleDate
                });
                e.recurrence = t.axConversions.rfc3339ToPy(r.toString());
                break;
            case "CUSTOM":
                if (d.rrule) {
                    var i = t.parseString(d.rrule);
                    i.dtstart = e.scheduleDate,
                    e.recurrence = t.axConversions.rfc3339ToPy(new t(i).toString())
                }
            }
            d.onScheduleChanged && d.onScheduleChanged({
                schedule: e
            })
        }

        function o() {
            if (d.scheduleDateOptions.selectedDate) {
                var e = d.timeSensitiveOptions.enabled ? d.timeSensitiveOptions.selectedTime: null,
                t = [0, 0],
                n = t[0],
                r = t[1];
                e && (i = [e.getHours(), e.getMinutes()], n = i[0], r = i[1]),
                d.scheduleDateOptions.selectedDate.setHours(n),
                d.scheduleDateOptions.selectedDate.setMinutes(r),
                d.scheduleDateOptions.selectedDate.setSeconds(0),
                d.scheduleDateOptions.selectedDate.setMilliseconds(0)
            }
            var i
        }

        function a(e) {
            return e.setHours(0),
            e.setMinutes(0),
            e.setSeconds(0),
            e
        }

        function s(e) {
            e ? (e.scheduleType ? d.scheduleType = e.scheduleType: d.scheduleType = "instant", e.scheduleDate && (d.scheduleDateOptions.selectedDate = e.scheduleDate, d.scheduleType = "future"), e.timeSensitive && (d.timeSensitiveOptions.enabled = !0, d.timeSensitiveOptions.selectedTime = new Date(e.scheduleDate.getTime())), e.recurrence && (d.scheduleType = "recurrent", d.recurrenceOption = "CUSTOM", d.rrule = t.axConversions.pyToRRULE(e.recurrence).toString())) : (d.scheduleType = "instant", d.scheduleDateOptions.selectedDate = a(new Date), d.recurrenceOption = "DAILY", d.timeSensitiveOptions.enabled = !1, d.timeSensitiveOptions.selectedTime = null, d.rrule = "")
        }

        function c() {
            s(d.schedule),
            d.scheduleTypeEditable = !d.schedule,
            e.$watch(function() {
                return d.scheduleType
            },
            i),
            e.$watch(function() {
                return d.recurrenceOption
            },
            i),
            e.$watch(function() {
                return d.scheduleDateOptions.selectedDate
            },
            i),
            e.$watch(function() {
                return d.scheduleDateOptions.selectedDate
            },
            o),
            e.$watch(function() {
                return d.timeSensitiveOptions.enabled
            },
            i),
            e.$watch(function() {
                return d.timeSensitiveOptions.enabled
            },
            o),
            e.$watch(function() {
                return d.timeSensitiveOptions.selectedTime
            },
            i),
            e.$watch(function() {
                return d.timeSensitiveOptions.selectedTime
            },
            o),
            e.$watch(function() {
                return d.rrule
            },
            i)
        }

        function u(e) {
            if (e.schedule && !e.schedule.isFirstChange()) {
                s(e.schedule.currentValue)
            }
        }

        function l() {}
        var d = this;
        d.scheduleType = "instant",
        d.scheduleTypeEditable = !1,
        d.scheduleTypeList = r.SCHEDULE_TYPE.filter(function(e) {
            return "continuous" !== e.value
        }),
        d.scheduleDateOptions = {
            calendarVisible: !1,
            datePickerOptions: {
                showWeeks: !1,
                maxMode: "day"
            },
            selectedDate: a(new Date)
        },
        d.recurrenceOption = "DAILY",
        d.recurrenceOptionList = [{
            value: "DAILY",
            text: n("Daily")
        },
        {
            value: "WEEKLY",
            text: n("Weekly")
        },
        {
            value: "MONTHLY",
            text: n("Monthly")
        },
        {
            value: "YEARLY",
            text: n("Yearly")
        },
        {
            value: "CUSTOM",
            text: n("Custom")
        }],
        d.timeSensitiveOptions = {
            enabled: !1,
            pickerOptions: {
                showMeridian: !1,
                minuteStep: 5,
                showSpinners: !1
            },
            selectedTime: null
        },
        d.rrule = "",
        d.$onInit = c,
        d.$onChanges = u,
        d.$onDestroy = l
    }
    n.$inject = ["$scope", "gettext", "axConstant"],
    e.module("WVS").component("axScheduleEditor", {
        bindings: {
            schedule: "<?",
            onScheduleChanged: "&?"
        },
        templateUrl: __axtr("/templates/components/schedule-editor/schedule-editor.component.html"),
        controller: n
    })
} (angular, RRule),
function(e) {
    "use strict";
    var t = function() {
        function e(e, t, n, r, i, o) {
            this.$scope = e,
            this.$state = t,
            this.$stateParams = n,
            this.axAddTargetModal = r,
            this.axPage = i,
            this.CurrentUser = o,
            this.currentUser = o.get()
        }
        return e.prototype.$onInit = function() {
            var e = this,
            t = this,
            n = t.$scope,
            r = t.CurrentUser;
            n.$watch(function() {
                return e.scanStatus ? e.scanStatus.status: null
            },
            function(t) {
                e.scanHealth = "failed" === t || "aborted" === t || "aborting" === t ? -1 : "scheduled" !== t ? 1 : 0
            }),
            n.$watch(function() {
                return r.get()
            },
            function(t) {
                return e.currentUser = t
            })
        },
        e.prototype.currentUrl = function() {
            return this.axPage.currentUrlEncoded()
        },
        e.prototype.onCreateScanTarget = function(e) {
            var t = this,
            n = t.$state,
            r = t.axAddTargetModal,
            i = this.currentUrl();
            r.addTarget(e).then(function(e) {
                n.go("app.target_config", {
                    targetId: e.targetId,
                    returnUrl: i
                },
                {
                    inherit: !1
                })
            })
        },
        e.$inject = ["$scope", "$state", "$stateParams", "axAddTargetModal", "axPage", "CurrentUser"],
        e
    } ();
    e.module("WVS").component("axScanStatus", {
        templateUrl: __axtr("/templates/components/scan-status/scan-status.component.html"),
        controller: t,
        bindings: {
            scanId: "<?",
            resultId: "<?",
            scanStatus: "<?",
            targetInfo: "<?"
        }
    })
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function e(e, t, n, r, i) {
            this.$element = e,
            this.$q = t,
            this.$rootScope = n,
            this.axConstant = r,
            this.axActivationModal = i,
            this._activationModalIsOpen = !1
        }
        return e.prototype._onProductNotActivated = function() {
            var e = this,
            t = this,
            n = t.$q,
            r = t.axActivationModal;
            this._activationModalIsOpen || n.when().then(function() {
                return e._activationModalIsOpen = !0,
                r.show()
            }).
            finally(function() {
                e._activationModalIsOpen = !1
            })
        },
        e.prototype.$onInit = function() {
            var e = this,
            t = this,
            n = t.$rootScope,
            r = t.axConstant;
            this.$element.css("display", "none"),
            this._axProductNotActivatedDeregister = n.$on(r.PRODUCT_ACTIVATION_REQUIRED,
            function() {
                return e._onProductNotActivated()
            })
        },
        e.prototype.$onDestroy = function() {
            this._axProductNotActivatedDeregister()
        },
        e.$inject = ["$element", "$q", "$rootScope", "axConstant", "axActivationModal"],
        e
    } ();
    e.module("WVS").component("axProductActivation", {
        controller: t
    })
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function e(e, t, n) {
            this.$scope = e,
            this.CurrentUser = t,
            this.axConstant = n,
            this.testWebsites = n.TEST_WEBSITES,
            this.currentUser = t.get()
        }
        return e.$inject = ["$scope", "CurrentUser", "axConstant"],
        e.prototype.$onInit = function() {
            var e = this,
            t = this,
            n = t.$scope,
            r = t.CurrentUser;
            n.$watch(function() {
                return r.get()
            },
            function(t) {
                e.currentUser = t || void 0
            })
        },
        e
    } ();
    e.module("WVS").component("axLicenseInfo", {
        templateUrl: __axtr("/templates/components/license-info/license-info.component.html"),
        controller: t,
        bindings: {
            licenseInfo: "<",
            onUpdateLicense: "&?"
        }
    })
} (angular),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a) {
        function s() {
            try {
                var r = t.fromString(p.rrule);
                switch (r.options.freq) {
                case t.DAILY:
                    p.frequency = "day";
                    break;
                case t.WEEKLY:
                    p.frequency = "week";
                    break;
                case t.MONTHLY:
                    p.frequency = "month";
                    break;
                case t.YEARLY:
                    p.frequency = "year"
                }
                r.options.interval && (p.frequencyValue = r.options.interval),
                r.options.until && (p.endsOption = "date", p.endDate = r.options.until),
                e.forEach(r.options.byweekday,
                function(e) {
                    p.selectedWeekDays[p.weekDayList[e].value] = !0
                })
            } catch(e) {}
            n.$watch(function() {
                return p.frequency
            },
            l),
            n.$watch(function() {
                return p.frequencyValue
            },
            l),
            n.$watch(function() {
                return p.endDate
            },
            l),
            n.$watch(function() {
                return p.endsOption
            },
            l),
            n.$watch(function() {
                return p.startDate
            },
            l),
            n.$watchCollection(function() {
                return p.selectedWeekDays
            },
            l)
        }

        function c() {
            p.endDateCalendarVisible = !p.endDateCalendarVisible,
            p.endDateCalendarVisible && (p.endsOption = "date")
        }

        function u() {
            var e = function() {
                switch (p.frequency) {
                case "day":
                    return p.frequencyValue > 1 ? a.getString("每{{days}}天重复", {
                        days: p.frequencyValue
                    }) : a.getString("每天重复");
                case "week":
                    var e = Object.keys(p.selectedWeekDays).filter(function(e) {
                        return p.selectedWeekDays[e]
                    }).map(function(e) {
                        return p.weekDayList.find(function(t) {
                            return t.value === e
                        })
                    }),
                    t = g(e.map(function(e) {
                        return e.dayName
                    }), "order", !1, "+");
                    if (7 === t.length) return p.frequencyValue > 1 ? a.getString("每两周重复一次，每天一次") : a.getString("每周重复一次，每天一次");
                    if (t.length > 0) {
                        var n, r = [t.slice(0, -1).join(", "), t.slice( - 1).join("")],
                        i = r[0],
                        o = r[1];
                        if (n = 0 === i.length ? a.getString("{{dayName}}", {
                            dayName: o
                        }) : a.getString("{{prevDays}} 和 {{lastDay}}", {
                            prevDays: i,
                            lastDay: o
                        }), p.frequencyValue > 1) return a.getString("每{{frequency}}周的{{days}}重复", {
                            frequency: p.frequencyValue,
                            days: n
                        });
                        if (1 === p.frequencyValue) return a.getString("每周{{days}}重复一次", {
                            days: n
                        })
                    }
                    return a.getString("每周重复一次");
                case "month":
                    return p.frequencyValue > 1 ? a.getString("每{{frequency}}个月同一天重复", {
                        frequency: p.frequencyValue
                    }) : a.getString("每月在同一天重复");
                case "year":
                    return p.frequencyValue > 1 ? a.getString("每{{frequency}}年重复", {
                        frequency: p.frequencyValue
                    }) : a.getString("每年重复一次")
                }
            } ();
            return "date" === p.endsOption && p.endDate ? e + a.getString(" 直到{{date}}", {
                date: f(p.endDate, "mediumDate")
            }) : e
        }

        function l() {
            try {
                var n = {
                    freq: t.DAILY,
                    interval: 1,
                    dtstart: e.isDate(p.startDate) ? p.startDate: new Date
                };
                switch (p.frequency) {
                case "day":
                    n.freq = t.DAILY;
                    break;
                case "week":
                    n.freq = t.WEEKLY,
                    n.byweekday = Object.keys(p.selectedWeekDays).filter(function(e) {
                        return !! p.selectedWeekDays[e]
                    }).map(function(e) {
                        return t[e]
                    });
                    break;
                case "month":
                    n.freq = t.MONTHLY,
                    n.bymonthday = n.dtstart.getDate();
                    break;
                case "year":
                    n.freq = t.YEARLY
                }
                e.isNumber(p.frequencyValue) && p.frequencyValue > 0 && p.frequencyValue < 100 && (n.interval = p.frequencyValue),
                "date" === p.endsOption && e.isDate(p.endDate) && (n.until = p.endDate);
                var r = new t(n);
                p.rrule = r.toString()
            } catch(e) {
                i.warning(e)
            }
        }

        function d(e) {
            return e.setHours(0),
            e.setMinutes(0),
            e.setSeconds(0),
            e
        }
        var p = this,
        f = r("date"),
        g = r("orderBy");
        p.frequencyList = [{
            value: "day",
            text: o("Day")
        },
        {
            value: "week",
            text: o("Week")
        },
        {
            value: "month",
            text: o("Month")
        },
        {
            value: "year",
            text: o("Year")
        }],
        p.frequency = p.frequencyList[0].value,
        p.frequencyValue = 1,
        p.weekDayList = [{
            order: 1,
            value: "MO",
            dayName: "Monday",
            text: o("Mon")
        },
        {
            order: 2,
            value: "TU",
            dayName: "Tuesday",
            text: o("Tue")
        },
        {
            order: 3,
            value: "WE",
            dayName: "Wednesday",
            text: o("Wed")
        },
        {
            order: 4,
            value: "TH",
            dayName: "Thursday",
            text: o("Thu")
        },
        {
            order: 5,
            value: "FR",
            dayName: "Friday",
            text: o("Fri")
        },
        {
            order: 6,
            value: "SA",
            dayName: "Saturday",
            text: o("Sat")
        },
        {
            order: 7,
            value: "SU",
            dayName: "Sunday",
            text: o("Sun")
        }],
        p.selectedWeekDays = {},
        p.endDateDatePickerOptions = {
            minDate: d(new Date),
            showWeeks: !1,
            maxMode: "day"
        },
        p.endDateCalendarVisible = !1,
        p.endDate = d(new Date),
        p.endsOption = "never",
        p.toggleEndDateCalendarVisibility = c,
        p.getRepeatMessage = u,
        p.$onInit = s
    }
    n.$inject = ["$scope", "$filter", "$log", "gettext", "gettextCatalog"],
    e.module("WVS").component("axRecurrencePicker", {
        templateUrl: __axtr("/templates/components/ical/ical.component.html"),
        controller: n,
        bindings: {
            startDate: "<",
            rrule: "="
        }
    })
} (angular, RRule),
function(e) {
    "use strict";

    function t() {
        var e = this;
        this.toggle = function(t) {
            return t.stopPropagation(),
            t.preventDefault(),
            e.toggleAside && e.toggleAside(),
            !1
        }
    }
    e.module("WVS").component("axFilterTags", {
        templateUrl: __axtr("/templates/components/filter-tags/filter-tags.component.html"),
        controller: t,
        bindings: {
            tags: "<",
            removeTag: "&?",
            toggleAside: "&?"
        }
    })
} (angular),
function(e) {
    "use strict";

    function t(t, r, i) {
        function o(e) {
            e && (u.currentFile = e, c()),
            u.onFileSelected && u.onFileSelected({
                file: u.currentFile
            })
        }

        function a(t) {
            return ! 1 === t.status && e.isNumber(t.totalBytes) && e.isNumber(t.uploadedBytes) && t.uploadedBytes < t.totalBytes
        }

        function s(e) {
            return e.totalBytes > 0 ? Math.round(e.uploadedBytes / e.totalBytes * 100) : 0
        }

        function c() {
            u.state = n.hasFile,
            u.currentFile ? u.uploading ? (u.state = n.uploading, u.uploadProgress = s(u.currentFile)) : !0 === u.currentFile.status ? u.state = n.complete: !1 === u.currentFile.status && a(u.currentFile) && (u.state = n.incomplete, u.uploadProgress = s(u.currentFile)) : u.state = n.noFile
        }
        var u = this;
        u.state = n.noFile,
        u.currentFile = null,
        u.$onInit = function() {
            e.isUndefined(u.disallowChange) && (u.disallowChange = !1),
            e.isUndefined(u.disallowRemove) && (u.disallowRemove = !1),
            e.isUndefined(u.downloadButton) && (u.downloadButton = !1),
            t.$watch(function() {
                return u.currentFile ? u.currentFile.uploadedBytes: 0
            },
            c),
            r.find('input[type="file"]').on("change",
            function(e) {
                t.$applyAsync(function() {
                    if (e.target.files.length > 0) {
                        var t = e.target.files[0];
                        o({
                            name: t.name,
                            totalBytes: t.size,
                            nativeFileUpload: t
                        })
                    }
                })
            })
        },
        u.$onChanges = function(e) {
            e.file && (u.uploading && !e.file.isFirstChange() && i.warn("控件处于上传状态时更改当前文件"), u.currentFile = e.file.currentValue, c()),
            e.uploading && c()
        },
        u.$onDestroy = function() {
            r.find('input[type="file"]').off("change"),
            u.currentFile = null,
            u.state = n.noFile
        },
        u.chooseFile = function() {
            t.$applyAsync(function() {
                r.find('input[type="file"]').click()
            })
        },
        u.removeFile = function() {
            t.$applyAsync(function() {
                r.find('input[type="file"]').val("");
                try {
                    u.currentFile && u.onFileRemoved && u.onFileRemoved({
                        file: u.currentFile
                    })
                } finally {
                    u.currentFile = null
                }
            })
        }
    }
    t.$inject = ["$scope", "$element", "$log"];
    var n = {
        noFile: "no-file",
        hasFile: "has-file",
        uploading: "uploading",
        incomplete: "incomplete",
        complete: "complete"
    };
    e.module("WVS").component("axFileUpload", {
        controller: t,
        templateUrl: __axtr("/templates/components/file-upload/file-upload.component.html"),
        bindings: {
            accept: "@?",
            uploading: "<?",
            file: "<?",
            onFileSelected: "&?",
            onFileRemoved: "&?",
            readOnly: "<?",
            disallowChange: "<?",
            disallowRemove: "<?",
            downloadButton: "<?"
        }
    })
} (angular),
function(e, t) {
    "use strict";

    function n() {
        function e(e) {
            if (e.profile) {
                if (e.profile.currentValue) {
                    e.profile.currentValue.exclusions.forEach(function(e, t) {
                        s.hours[Math.floor(t / 24)].hours[t % 24].selected = e
                    })
                } else s.hours.forEach(function(e) {
                    e.hours.forEach(function(e) {
                        e.selected = !1
                    })
                });
                s.readOnly || a()
            }
        }

        function n(e) {
            s.readOnly || (e.selected = !e.selected, a())
        }

        function r(e) {
            if (!s.readOnly) {
                var t = !!e.hours.find(function(e) {
                    return ! e.selected
                });
                e.hours.forEach(function(e) {
                    e.selected = t
                }),
                a()
            }
        }

        function o(e) {
            if (!s.readOnly) {
                for (var t = !1,
                n = 0; n < s.hours.length; n++) if (!s.hours[n].hours[e].selected) {
                    t = !0;
                    break
                }
                for (var n = 0; n < s.hours.length; n++) s.hours[n].hours[e].selected = t;
                a()
            }
        }

        function a() {
            if (s.onExclusionsChanged) {
                var e = s.hours.reduce(function(e, t) {
                    return e.push.apply(e, t.hours.map(function(e) {
                        return e.selected
                    })),
                    e
                },
                []);
                s.onExclusionsChanged({
                    exclusions: e
                })
            }
        }
        var s = this;
        s.hourLabels = t.range(24).map(function(e) {
            return e < 10 ? t.padStart(String(e), 2, "0") : e.toString()
        }),
        s.hours = i.map(function(e) {
            return {
                dayName: e,
                hours: t.range(24).map(function(e) {
                    return {
                        label: e < 10 ? t.padStart(String(e), 2, "0") : e.toString(),
                        selected: !1
                    }
                })
            }
        }),
        s.$onChanges = e,
        s.onRowCellClicked = n,
        s.onRowHeaderClicked = r,
        s.onColumnHeaderClicked = o
    }
    var r = e.identity,
    i = [r("Sunday"), r("Monday"), r("Tuesday"), r("Wednesday"), r("Thursday"), r("Friday"), r("Saturday")];
    e.module("WVS").component("axExclusionHours", {
        controller: n,
        templateUrl: __axtr("/templates/components/exclusion-hours/exclusion-hours.component.html"),
        bindings: {
            profile: "<?",
            readOnly: "<?",
            onExclusionsChanged: "&?"
        }
    })
} (angular, _),
function(e) {
    "use strict";

    function t(t, i, o, a, s, c, u, l, d, p) {
        function f() {
            var e = I.loadingTracker.createPromise();
            return i.when().then(function() {
                I.eventList.gridApi.infiniteScroll.saveScrollPercentage()
            }).then(function() {
                return d.getEvents(I.searchQuery, I.eventList.nextCursor, u.LIST_PAGE_SIZE, {
                    onRetry: function() {
                        function e() {
                            return f()
                        }
                        return e
                    } ()
                })
            }).then(function(e) {
                var t = e.notifications,
                r = e.pagination;
                t.forEach(function(e) {
                    I.eventList.items.find(function(t) {
                        return t.eventId === e.eventId
                    }) || I.eventList.items.push(e)
                }),
                I.eventList.nextCursor = r.nextCursor,
                I.eventList.gridApi.infiniteScroll.dataLoaded(!1, n(r.nextCursor))
            }).
            catch(function(e) {
                return I.eventList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                i.reject(e)
            }).
            finally(e.resolve)
        }

        function g() {
            var e = I.eventList.gridApi && I.eventList.gridApi.selection;
            return e ? e.getSelectedRows() : []
        }

        function h() {
            var e = I.eventList.gridApi && I.eventList.gridApi.selection;
            return e ? e.getSelectedCount() : 0
        }

        function m() {
            w = t.$watchCollection(function() {
                return a
            },
            function() {
                I.returnUrl = l.currentUrlEncoded()
            })
        }

        function v() {
            I.eventList.gridApi && I.eventList.gridApi.infiniteScroll.resetScroll(!1, void 0 !== I.eventList.nextCursor)
        }

        function y() {
            return I.eventList.items.splice(0),
            I.eventList.nextCursor = void 0,
            k.promise.then(f)
        }

        function S() {
            I.layoutSaveKey && p.set(I.layoutSaveKey, I.eventList.gridApi.saveState.save())
        }

        function T() {
            if (I.layoutSaveKey) {
                var e = p.get(I.layoutSaveKey);
                e && I.eventList.gridApi.saveState.restore(t, e)
            }
        }

        function x() {
            I.layoutSaveKey && (p.remove(I.layoutSaveKey), o.reload(o.current))
        }

        function b() {
            r(I.returnUrl) && m(),
            k.promise.then(y).then(T)
        }

        function _(t) {
            n(t.returnUrl) && !t.returnUrl.isFirstChange() && (e.isString(t.returnUrl.currentValue) && !w ? m() : r(t.returnUrl) && w && (w(), w = void 0)),
            n(t.layoutSaveKey) && !t.layoutSaveKey.isFirstChange() && t.layoutSaveKey.previousValue && (p.remove(t.layoutSaveKey.previousValue), S()),
            t.searchQuery && !t.searchQuery.isFirstChange() && y()
        }

        function C() {
            I.loadingTracker.cancel()
        }
        var w, I = this,
        k = i.defer();
        I.loadingTracker = c({
            activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        I.eventList = {
            items: [],
            nextCursor: void 0
        },
        I.eventList.gridOptions = {
            data: I.eventList.items,
            appScopeProvider: I,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableRowHeaderSelection: !1,
            enableRowSelection: !1,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                field: "eventTypeId",
                displayName: s.getString("事件"),
                cellFilter: "axEventName",
                width: 300
            },
            {
                field: "eventData",
                displayName: s.getString("附加信息"),
                width: "*"
            },
            {
                field: "created",
                displayName: s.getString("已创建"),
                cellFilter: "date:'medium'",
                width: 160
            }],
            gridMenuCustomItems: [{
                title: s.getString("重置"),
                action: x
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.eventId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.eventId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    I.eventList.gridApi = e,
                    e.infiniteScroll.on.needLoadMoreData(t, f),
                    e.colResizable.on.columnSizeChanged(t, S),
                    e.core.on.columnVisibilityChanged(t, S),
                    e.core.on.sortChanged(t, S),
                    k.resolve()
                }
                return e
            } ()
        },
        I.selectedItems = g,
        I.selectedItemsCount = h,
        I.$onInit = b,
        I.$onChanges = _,
        I.$onDestroy = C,
        t.$on("axScrollTop", v)
    }
    t.$inject = ["$scope", "$q", "$state", "$stateParams", "gettextCatalog", "promiseTracker", "axConstant", "axPage", "NotificationsApi", "axUserPreferences"];
    var n = e.isDefined,
    r = e.isUndefined;
    e.module("WVS").component("axEvents", {
        templateUrl: __axtr("/templates/components/events/events.component.html"),
        controller: t,
        bindings: {
            returnUrl: "<?",
            searchQuery: "<",
            layoutSaveKey: "@?"
        }
    })
} (angular),
function(e) {
    "use strict";

    function t(t, n) {
        function r() {
            l.errors.splice(0)
        }

        function i(t, n) {
            var r = n.errorMessage || n.message,
            i = ~~l.maxDisplayErrors,
            a = {};
            0 !== l.errors.length && l.errors[0].message === r || (a = {
                message: r
            },
            l.errors.unshift(a)),
            i > 0 && l.errors.length > i && l.errors.splice(i),
            n.config && e.isFunction(n.config.onRetry) ? a.onRetry = o(n.config.onRetry, n) : e.isFunction(n.onRetry) && (a.onRetry = o(n.onRetry, n))
        }

        function o(e, t) {
            return function() {
                function i() {
                    try {
                        r(),
                        e.call(void 0, t)
                    } catch(e) {
                        n.error(e)
                    }
                }
                return i
            } ()
        }

        function a() {
            l.errors = [],
            c = t.$on("axApiError", i),
            u = t.$on("axError", i)
        }

        function s() {
            l.errors.splice(0),
            c(),
            u()
        }
        var c, u, l = this;
        this.dismiss = r,
        this.$onInit = a,
        this.$onDestroy = s
    }
    t.$inject = ["$rootScope", "$log"],
    e.module("WVS").component("axErrorPresenter", {
        controller: t,
        templateUrl: __axtr("/templates/components/error-presenter/error-presenter.component.html"),
        bindings: {
            maxDisplayErrors: "<?"
        }
    })
} (angular),
function(e) {
    "use strict";

    function t() {}
    e.module("WVS").component("axCrawlBreadcrumb", {
        controller: t,
        templateUrl: __axtr("/templates/components/crawl-breadcrumb/crawl-breadcrumb.component.html"),
        bindings: {
            locations: "<",
            onLocationClick: "&?"
        }
    })
} (angular),
function(e) {
    "use strict";

    function t(e, t, n, a, s, c, u, l, d, p, f, g, h, m, v, y) {
        function S() {
            return s.updateProfile(e.userProfile, {
                onRetry: function() {
                    function e() {
                        return S()
                    }
                    return e
                } ()
            }).then(function(t) {
                r(e.userProfile, t),
                y.success(h.getString("配置文件已更新")),
                N = P(t)
            })
        }

        function T() {
            return ! o(N, P(e.userProfile))
        }

        function x() {
            return e.profileForm && e.profileForm.$invalid ? g("表单无效") : T() ? "": g("无更改可保存")
        }

        function b() {
            var t = i(e.$new(), {
                message: g("你确定要删除你的 API Key?")
            });
            return u.confirm({
                scope: t
            }).then(function() {
                return s.deleteApiKey()
            }).then(function() {
                e.apiKeyInfo.apiKey = null
            }).
            finally(function() {
                return t.$destroy()
            })
        }

        function _() {
            var t = i(e.$new(), {
                message: g(e.apiKeyInfo.apiKey ? "你确定你想重置你的API Key? 您的旧密钥将失效.": "你确定你想要生成一个新的API Key?")
            });
            u.confirm({
                scope: t
            }).then(function() {
                return s.resetApiKey()
            }).then(function(t) {
                e.apiKeyInfo.apiKey = t,
                e.apiKeyInfo.visible = !1
            }).
            finally(function() {
                return t.$destroy()
            })
        }

        function C() {
            e.apiKeyInfo.visible = !e.apiKeyInfo.visible
        }

        function w(t) {
            t.clearSelection(),
            e.apiKeyInfo.clipboardTooltipEnabled = !0,
            e.apiKeyInfo.clipboardTooltipText = g("Copied!")
        }

        function I() {
            e.apiKeyInfo.clipboardTooltipEnabled = !0,
            e.apiKeyInfo.clipboardTooltipText = g("Press Ctrl+C to copy!")
        }

        function k() {
            e.apiKeyInfo.clipboardTooltipEnabled = !1
        }

        function A() {
            t.get("axUpdateLicenseModal").show().then(function() {
                L()
            })
        }

        function L() {
            p.setDocumentTitle("配置"),
            p.setCurrentSection(""),
            $(),
            f.get("isChildAccount") || (E(), R())
        }

        function $() {
            s.getProfile({
                tracker: e.loadingTracker
            }).then(function(t) {
                r(e.userProfile, t),
                N = P(t)
            })
        }

        function E() {
            v.getSystemInfo({
                tracker: e.loadingTracker
            }).then(function(t) {
                var n = t.license;
                t.verificationStatus;
                e.licenseInfo = n
            }).
            finally(function() {
                e.accountVerification._y = !0
            })
        }

        function R() {
            f.hasFeature("apikey") && s.getApiKey({
                tracker: e.loadingTracker,
                noPublishError: !0
            }).
            catch(function(t) {
                return t.data && t.data.code === c.SYI_ERROR_CODES.FEATURE_REQUIRES_ACTIVATION ? e.apiKeyInfo.disabled = !0 : t.publishResponseError ? t.publishResponseError(t) : e.$emit("axError", t),
                n.reject(t)
            }).then(function(t) {
                e.apiKeyInfo.apiKey = t,
                e.apiKeyInfo.disabled = !1
            }).
            finally(function() {
                e.apiKeyInfo._y = !0
            })
        }

        function P(e) {
            return {
                firstName: e.firstName,
                lastName: e.lastName,
                companyName: e.companyName,
                companyWebsite: e.companyWebsite,
                contactPhone: e.contactPhone,
                countryCode: e.countryCode,
                notifications: e.notifications
            }
        }
        var N;
        e.loadingTracker = m({
            activationDelay: c.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        e.userProfile = {
            userId: "",
            email: "",
            firstName: "",
            lastName: "",
            companyName: "",
            companyWebsite: "",
            contactPhone: "",
            countryCode: "",
            notifications: {
                monthlyStatus: !1,
                scans: !1,
                updates: !1
            },
            accessAllGroups: !1,
            role: "",
            isChildAccount: !1
        },
        e.countries = d.countries,
        e.licenseInfo = null,
        e.apiKeyInfo = {
            _y: !1,
            apiKey: null,
            visible: !1,
            clipboardTooltipEnabled: !1,
            clipboardTooltipText: "",
            disabled: !1
        };
        i(e, {
            disableClipboardToolTip: k,
            hasChanges: T,
            onClipboardError: I,
            onClipboardSuccess: w,
            onDeleteApiKey: b,
            onGenerateApiKey: _,
            onToggleApiKeyVisibility: C,
            onUpdateLicense: A,
            saveActionStatusMessage: x,
            updateProfile: S
        }),
        L()
    }

    function n(e) {
        var n = function(e) {
            e.scrollTopActionVisible = !1
        };
        n.$inject = ["$rootScope"];
        var r = function(e) {
            e.scrollTopActionVisible = !0
        };
        r.$inject = ["$rootScope"],
        e.state("app.me", {
            url: "me/",
            controller: t,
            templateUrl: __axtr("/templates/account/profile/profile.html"),
            data: {
                page: {
                    icon: "fa-user"
                }
            },
            onEnter: n,
            onExit: r
        })
    }
    t.$inject = ["$scope", "$injector", "$q", "$state", "AccountApi", "axConstant", "axGeneralModal", "axUserPreferences", "axGeo", "axPage", "CurrentUser", "gettext", "gettextCatalog", "promiseTracker", "SystemConfigApi", "toastr"];
    var r = e.merge,
    i = e.extend,
    o = e.equals;
    e.module("WVS").config(["$stateProvider", n])
} (angular),
function(e) {
    "use strict";

    function t(e, t, n, r, i, o, a, s) {
        function c() {
            var t = e.loadingTracker.createPromise(),
            n = e.credentials,
            r = n.email,
            i = n.password,
            o = n.rememberMe;
            s.signIn(r, i, o, {
                noAuthToken: !0,
                noLoginRedirect: !0,
                tracker: e.loadingTracker
            }).
            catch(function(t) {
                e.loginError = t.errorMessage
            }).
            finally(t.resolve)
        }

        function u() {
            t[0].body.classList.remove("bg-black-opacity"),
            e.loadingTracker.cancel()
        }

        function l(t, n) { ! n.data || "user disabled" !== n.data.message && "rejected" !== n.data.message ? n.data && "no password" === n.data.message ? n.errorMessage = r("Please reset your password to continue.") : n.errorCode === o.ERROR_CODES.AUTH_REQUIRED ? n.errorMessage = r("Email or password is invalid") : 403 === n.status && n.data && n.data.code === o.SYI_ERROR_CODES.FEATURE_NOT_ALLOWED && (n.errorMessage = r("User account not licensed")) : e.accountDisabled = !0
        }
        e.loadingTracker = i({
            activationDelay: o.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        e.loginError = "",
        e.credentials = {
            email: "",
            password: "",
            rememberMe: !1
        },
        e.accountDisabled = !1,
        e.signIn = c,
        e.$on("$destroy", u),
        e.$on("$destroy", n.$on("axApiError", l)),
        function() {
            a.setDocumentTitle(r("登录")),
            a.setCurrentSection(""),
            t[0].body.classList.add("bg-black-opacity")
        } ()
    }
    t.$inject = ["$scope", "$document", "$rootScope", "gettext", "promiseTracker", "axConstant", "axPage", "AccountApi"],
    e.module("WVS").config(["$stateProvider",
    function(e) {
        e.state("login", {
            url: "/login/?returnUrl=",
            templateUrl: __axtr("/templates/account/login/login.html"),
            controller: t,
            reloadOnSearch: !1
        })
    }])
} (angular),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l, d, p, f, g, h, m) {
        function v() {
            t.stats.showTrends = !t.stats.showTrends,
            t.stats.showTrends && !I && T("trends").
            catch(function(e) {
                return t.stats.showTrends = !1,
                n.reject(e)
            }).then(function() {
                I = !0
            })
        }

        function y() {
            return c.addTarget().then(function(e) {
                i.go("app.target_config", {
                    returnUrl: x(),
                    targetId: e.targetId
                },
                {
                    inherit: !1
                })
            })
        }

        function S() {
            t.loadingTracker.cancel(),
            k && (o.cancel(k), k = null)
        }

        function T(n, r) {
            return void 0 === n && (n = "simple"),
            void 0 === r && (r = {}),
            s.getStats(n, e.extend({
                tracker: t.loadingTracker,
                onRetry: function() {
                    function e() {
                        return T(n, r)
                    }
                    return e
                } ()
            },
            r)).then(function(e) {
                "simple" !== n && "full" !== n || (t.stats.general.forEach(function(t) {
                    t.value = e[t.key]
                }), t.stats.noTargets = 0 === e.totalTargets, t.stats.noOpenVulns = 0 === e.openVulns, t.stats.vulnsBySeverity.data = function(e) {
                    return [{
                        value: e.high,
                        label: g.getString("高危"),
                        color: "#f05050",
                        severity: "3"
                    },
                    {
                        value: e.medium,
                        label: g.getString("中危"),
                        color: "#faa732",
                        severity: "2"
                    },
                    {
                        value: e.low,
                        label: g.getString("低危"),
                        color: "#23b7e5",
                        severity: "1"
                    }]
                } (e.vulnCount), t.stats.mostVulnTargets.data = e.mostVulnerableTargets.map(function(e) {
                    return {
                        targetId: e.targetId,
                        address: e.address,
                        criticality: e.criticality,
                        vulns: {
                            high: e.highVulns,
                            medium: e.mediumVulns
                        }
                    }
                }), t.stats.topVulns.data = e.topVulns, t.stats.vulnsByCriticality.data = function(e) {
                    var t = {
                        high: {
                            critical: "#ec2121",
                            high: "#f26767",
                            normal: "#f69696",
                            low: "#fac5c5"
                        },
                        medium: {
                            critical: "#f39106",
                            high: "#fbb24b",
                            normal: "#fcc77d",
                            low: "#fddcae"
                        },
                        low: {
                            critical: "#1797be",
                            high: "#3abee8",
                            normal: "#67cded",
                            low: "#95dcf2"
                        }
                    },
                    n = {
                        high: {
                            value: "3",
                            label: g.getString("高危")
                        },
                        medium: {
                            value: "2",
                            label: g.getString("中危")
                        },
                        low: {
                            value: "1",
                            label: g.getString("低危")
                        }
                    },
                    r = {
                        critical: {
                            value: "30",
                            label: g.getString("严重")
                        },
                        high: {
                            value: "20",
                            label: g.getString("高危")
                        },
                        normal: {
                            value: "10",
                            label: g.getString("中危")
                        },
                        low: {
                            value: "0",
                            label: g.getString("低危")
                        }
                    };
                    return ! 0 !== d.hasFeature("target_business_criticality") && (["high", "medium", "low"].forEach(function(e) {
                        Object.keys(t[e]).forEach(function(n) {
                            "normal" !== n && delete t[e][n]
                        })
                    }), Object.keys(r).forEach(function(e) {
                        "normal" !== e && delete r[e]
                    }), t.high.normal = "#ec2121", t.medium.normal = "#f39106", t.low.normal = "#1797be"),
                    ["high", "medium", "low"].reduce(function(i, o) {
                        return i[o] = [],
                        Object.keys(e).forEach(function(a) {
                            r.hasOwnProperty(a) && i[o].push({
                                severity: n[o].value,
                                criticality: r[a].value,
                                color: t[o][a],
                                value: e[a][o],
                                label: r[a].label
                            })
                        }),
                        i
                    },
                    {})
                } (e.vulnCountByCriticality), t.stats.vulnsByCriticality.options.high.chart.title = t.stats.vulnsByCriticality.data.high.reduce(function(e, t) {
                    return e + t.value
                },
                0).toString(), t.stats.vulnsByCriticality.options.medium.chart.title = t.stats.vulnsByCriticality.data.medium.reduce(function(e, t) {
                    return e + t.value
                },
                0).toString(), t.stats.vulnsByCriticality.options.low.chart.title = t.stats.vulnsByCriticality.data.low.reduce(function(e, t) {
                    return e + t.value
                },
                0).toString()),
                "full" !== n && "trends" !== n || (t.stats.openVulnsTrend.data = e.trendOpenVulns.reduce(function(e, t) {
                    return e[0].values.push([t.startDate, t.highVulns]),
                    e[1].values.push([t.startDate, t.mediumVulns]),
                    e
                },
                [{
                    key: "High Vulnerabilities",
                    values: []
                },
                {
                    key: "Medium Vulnerabilities",
                    values: []
                }]), t.stats.avgRemediationTime.data = e.trendAverageRemediationTime.reduce(function(e, t) {
                    return e[0].values.push([t.startDate, t.averageDays]),
                    e[1].values.push([t.startDate, t.fixedHighVulns]),
                    e[2].values.push([t.startDate, t.fixedMediumVulns]),
                    e
                },
                [{
                    key: "Avg days to remediate",
                    values: []
                },
                {
                    key: "High Vulnerabilities Fixed",
                    values: []
                },
                {
                    key: "Medium Vulnerabilities Fixed",
                    values: []
                }]), t.stats.avgVulnAgeTrend.data = e.trendAverageVulnAge.reduce(function(e, t) {
                    var n = t.startDate,
                    r = t.averageDays;
                    return e[0].values.push([n, r]),
                    e
                },
                [{
                    key: g.getString("平均天数"),
                    values: []
                }]), t.stats.newVulnsTrending.data = e.trendNewVulns.reduce(function(e, t) {
                    return e[0].values.push([t.startDate, t.weightedVulns]),
                    e
                },
                [{
                    key: "Value",
                    values: []
                }])),
                L = Date.now()
            })
        }

        function x() {
            return l.currentUrlEncoded()
        }

        function b() {
            if (_(), L) {
                var e = Date.now();
                if (L + u.DASH_REFRESH_INTERVAL < e) return void(k = o(function() {
                    return C()
                },
                0))
            }
            k = o(function() {
                return C()
            },
            u.DASH_REFRESH_INTERVAL)
        }

        function _() {
            k && (o.cancel(k), k = null)
        }

        function C() {
            return n.when().then(function() {
                if (A) return n.reject();
                A = !0
            }).then(function() {
                return T(t.stats.showTrends ? "full": "simple", {
                    noLoadingTracker: !0,
                    noPublishError: !0
                })
            }).
            finally(function() {
                A = !1,
                t.$$destroyed || (k = o(function() {
                    return C()
                },
                u.DASH_REFRESH_INTERVAL))
            })
        }

        function w(e, t) {
            t.hidden ? _() : b()
        }
        t.loadingTracker = m({
            activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        t.stats = {
            showTrends: !1,
            general: [{
                key: "runningScans",
                name: g.getString("扫描中"),
                value: 0,
                state: "app.list_scans({status: 'processing,aborting'})"
            },
            {
                key: "waitingScans",
                name: g.getString("等待扫描"),
                value: 0,
                state: "app.list_scans({status: 'queued,starting'})"
            },
            {
                key: "totalScans",
                name: g.getString("扫描总数"),
                value: 0,
                state: "app.list_scans({status: 'completed,failed,aborted'})"
            },
            {
                key: "openVulns",
                name: g.getString("漏洞总数"),
                value: 0,
                state: "app.list_vulns({status: 'open'})"
            },
            {
                key: "totalTargets",
                name: g.getString("主机总数"),
                value: 0,
                state: "app.list_targets"
            }],
            noTargets: !1,
            noOpenVulns: !1,
            vulnsBySeverity: {
                data: null,
                options: {
                    chart: {
                        type: "pieChart",
                        height: 300,
                        showLabels: !0,
                        duration: 500,
                        x: function() {
                            function e(e) {
                                return e.label
                            }
                            return e
                        } (),
                        y: function() {
                            function e(e) {
                                return e.value
                            }
                            return e
                        } (),
                        labelSunbeamLayout: !1,
                        showLegend: !0,
                        labelType: "value",
                        margin: {
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0
                        },
                        tooltip: {
                            enabled: !1
                        },
                        pie: {
                            color: function() {
                                function e(e) {
                                    return e.color
                                }
                                return e
                            } (),
                            valueFormat: function() {
                                function e(e) {
                                    var n = t.stats.vulnsBySeverity.data.reduce(function(e, t) {
                                        return e + t.value
                                    },
                                    0);
                                    return h(e / n * 100, 2) + "%"
                                }
                                return e
                            } (),
                            dispatch: {
                                elementClick: function() {
                                    function e(e) {
                                        var t = e.data;
                                        i.go("app.list_vulns", {
                                            severity: t.severity
                                        })
                                    }
                                    return e
                                } (),
                                elementMouseover: function() {
                                    function t() {
                                        a.event && e.element(a.event.currentTarget).css({
                                            cursor: "pointer"
                                        })
                                    }
                                    return t
                                } (),
                                elementMouseout: function() {
                                    function t() {
                                        a.event && e.element(a.event.currentTarget).css({
                                            cursor: ""
                                        })
                                    }
                                    return t
                                } ()
                            }
                        }
                    }
                }
            },
            vulnsByCriticality: {
                data: null,
                options: {
                    high: {
                        chart: {
                            type: "pieChart",
                            height: 180,
                            showLabels: !1,
                            showLegend: !1,
                            margin: {
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0
                            },
                            tooltip: {
                                enabled: !0 === d.hasFeature("target_business_criticality"),
                                keyFormatter: function() {
                                    function e(e) {
                                        return "<span>Business Criticality&nbsp;</span><br><strong>" + e[0].toUpperCase() + e.substr(1) + "</strong>"
                                    }
                                    return e
                                } (),
                                valueFormatter: function() {
                                    function e(e) {
                                        return h(e, 0)
                                    }
                                    return e
                                } ()
                            },
                            donut: !0,
                            donutRatio: .72,
                            x: function() {
                                function e(e) {
                                    return e.label
                                }
                                return e
                            } (),
                            y: function() {
                                function e(e) {
                                    return e.value
                                }
                                return e
                            } (),
                            color: function() {
                                function e(e) {
                                    return e.color
                                }
                                return e
                            } (),
                            pie: {
                                color: function() {
                                    function e(e) {
                                        return e.color
                                    }
                                    return e
                                } (),
                                valueFormat: function() {
                                    function e(e) {
                                        return h(e, 0)
                                    }
                                    return e
                                } (),
                                dispatch: {
                                    elementClick: function() {
                                        function e(e) {
                                            var t = e.data,
                                            n = !0 === d.hasFeature("target_business_criticality") ? t.criticality: void 0;
                                            i.go("app.list_vulns", {
                                                severity: t.severity,
                                                criticality: n
                                            })
                                        }
                                        return e
                                    } (),
                                    elementMouseover: function() {
                                        function t() {
                                            a.event && e.element(a.event.currentTarget).css({
                                                cursor: "pointer"
                                            })
                                        }
                                        return t
                                    } (),
                                    elementMouseout: function() {
                                        function t() {
                                            a.event && e.element(a.event.currentTarget).css({
                                                cursor: ""
                                            })
                                        }
                                        return t
                                    } ()
                                }
                            },
                            growOnHover: !0 === d.hasFeature("target_business_criticality"),
                            title: ""
                        },
                        caption: {
                            enable: !0,
                            text: g.getString("高危"),
                            css: {
                                fontSize: "18px",
                                color: "#999999"
                            }
                        }
                    },
                    medium: {
                        chart: {
                            type: "pieChart",
                            height: 180,
                            showLabels: !1,
                            showLegend: !1,
                            margin: {
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0
                            },
                            tooltip: {
                                enabled: !0 === d.hasFeature("target_business_criticality"),
                                keyFormatter: function() {
                                    function e(e) {
                                        return "<span>Business Criticality&nbsp;</span><br><strong>" + e[0].toUpperCase() + e.substr(1) + "</strong>"
                                    }
                                    return e
                                } (),
                                valueFormatter: function() {
                                    function e(e) {
                                        return h(e, 0)
                                    }
                                    return e
                                } ()
                            },
                            donut: !0,
                            donutRatio: .72,
                            x: function() {
                                function e(e) {
                                    return e.label
                                }
                                return e
                            } (),
                            y: function() {
                                function e(e) {
                                    return e.value
                                }
                                return e
                            } (),
                            color: function() {
                                function e(e) {
                                    return e.color
                                }
                                return e
                            } (),
                            pie: {
                                color: function() {
                                    function e(e) {
                                        return e.color
                                    }
                                    return e
                                } (),
                                valueFormat: function() {
                                    function e(e) {
                                        return h(e, 0)
                                    }
                                    return e
                                } (),
                                dispatch: {
                                    elementClick: function() {
                                        function e(e) {
                                            var t = e.data,
                                            n = !0 === d.hasFeature("target_business_criticality") ? t.criticality: void 0;
                                            i.go("app.list_vulns", {
                                                severity: t.severity,
                                                criticality: n
                                            })
                                        }
                                        return e
                                    } (),
                                    elementMouseover: function() {
                                        function t() {
                                            a.event && e.element(a.event.currentTarget).css({
                                                cursor: "pointer"
                                            })
                                        }
                                        return t
                                    } (),
                                    elementMouseout: function() {
                                        function t() {
                                            a.event && e.element(a.event.currentTarget).css({
                                                cursor: ""
                                            })
                                        }
                                        return t
                                    } ()
                                }
                            },
                            growOnHover: !0 === d.hasFeature("target_business_criticality"),
                            title: ""
                        },
                        caption: {
                            enable: !0,
                            text: g.getString("中危"),
                            css: {
                                fontSize: "18px",
                                color: "#999999"
                            }
                        }
                    },
                    low: {
                        chart: {
                            type: "pieChart",
                            height: 180,
                            showLabels: !1,
                            showLegend: !1,
                            margin: {
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0
                            },
                            tooltip: {
                                enabled: !0 === d.hasFeature("target_business_criticality"),
                                keyFormatter: function() {
                                    function e(e) {
                                        return "<span>Business Criticality&nbsp;</span><br><strong>" + e[0].toUpperCase() + e.substr(1) + "</strong>"
                                    }
                                    return e
                                } (),
                                valueFormatter: function() {
                                    function e(e) {
                                        return h(e, 0)
                                    }
                                    return e
                                } ()
                            },
                            donut: !0,
                            donutRatio: .72,
                            x: function() {
                                function e(e) {
                                    return e.label
                                }
                                return e
                            } (),
                            y: function() {
                                function e(e) {
                                    return e.value
                                }
                                return e
                            } (),
                            color: function() {
                                function e(e) {
                                    return e.color
                                }
                                return e
                            } (),
                            pie: {
                                color: function() {
                                    function e(e) {
                                        return e.color
                                    }
                                    return e
                                } (),
                                valueFormat: function() {
                                    function e(e) {
                                        return h(e, 0)
                                    }
                                    return e
                                } (),
                                dispatch: {
                                    elementClick: function() {
                                        function e(e) {
                                            var t = e.data,
                                            n = !0 === d.hasFeature("target_business_criticality") ? t.criticality: void 0;
                                            i.go("app.list_vulns", {
                                                severity: t.severity,
                                                criticality: n
                                            })
                                        }
                                        return e
                                    } (),
                                    elementMouseover: function() {
                                        function t() {
                                            a.event && e.element(a.event.currentTarget).css({
                                                cursor: "pointer"
                                            })
                                        }
                                        return t
                                    } (),
                                    elementMouseout: function() {
                                        function t() {
                                            a.event && e.element(a.event.currentTarget).css({
                                                cursor: ""
                                            })
                                        }
                                        return t
                                    } ()
                                }
                            },
                            growOnHover: !0 === d.hasFeature("target_business_criticality"),
                            title: ""
                        },
                        caption: {
                            enable: !0,
                            text: g.getString("低危"),
                            css: {
                                fontSize: "18px",
                                color: "#999999"
                            }
                        }
                    }
                }
            },
            newVulnsTrending: {
                data: null,
                options: {
                    chart: {
                        type: "lineChart",
                        interpolate: "cardinal",
                        height: 300,
                        showLabels: !0,
                        showLegend: !1,
                        duration: 500,
                        x: function() {
                            function e(e) {
                                return e[0]
                            }
                            return e
                        } (),
                        y: function() {
                            function e(e) {
                                return e[1]
                            }
                            return e
                        } (),
                        useInteractiveGuideline: !0,
                        xAxis: {
                            showMaxMin: !1,
                            tickFormat: function() {
                                function e(e) {
                                    return p(e, "MMM-yyyy")
                                }
                                return e
                            } ()
                        },
                        yAxis: {
                            showMaxMin: !1,
                            tickFormat: function() {
                                function e(e) {
                                    return h(e, 0)
                                }
                                return e
                            } ()
                        },
                        zoom: {
                            enabled: !1,
                            scaleExtent: [1, 10],
                            useFixedDomain: !1,
                            useNiceScale: !1,
                            horizontalOff: !1,
                            verticalOff: !0,
                            unzoomEventType: "dblclick.zoom"
                        }
                    }
                }
            },
            mostVulnTargets: {
                data: null
            },
            topVulns: {
                data: null
            },
            openVulnsTrend: {
                data: null,
                options: {
                    chart: {
                        type: "stackedAreaChart",
                        height: 300,
                        showLabels: !0,
                        duration: 100,
                        showControls: !1,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 30,
                            left: 40
                        },
                        x: function() {
                            function e(e) {
                                return e[0]
                            }
                            return e
                        } (),
                        y: function() {
                            function e(e) {
                                return e[1]
                            }
                            return e
                        } (),
                        useVoronoi: !1,
                        clipEdge: !0,
                        useInteractiveGuideline: !0,
                        xAxis: {
                            showMaxMin: !1,
                            tickFormat: function() {
                                function e(e) {
                                    return p(e, "MMM-yyyy")
                                }
                                return e
                            } ()
                        },
                        yAxis: {
                            showMaxMin: !1,
                            tickFormat: function() {
                                function e(e) {
                                    return h(e, 0)
                                }
                                return e
                            } ()
                        },
                        zoom: {
                            enabled: !1,
                            scaleExtent: [1, 10],
                            useFixedDomain: !1,
                            useNiceScale: !1,
                            horizontalOff: !1,
                            verticalOff: !0,
                            unzoomEventType: "dblclick.zoom"
                        },
                        color: function() {
                            function e(e, t) {
                                return 0 === t ? "#f05050": "#faa732"
                            }
                            return e
                        } ()
                    }
                }
            },
            fixedVulnsTrend: {
                data: null
            },
            avgRemediationTime: {
                data: null,
                options: {
                    chart: {
                        type: "lineChart",
                        interpolate: "cardinal",
                        height: 300,
                        showLabels: !0,
                        duration: 500,
                        x: function() {
                            function e(e) {
                                return e[0]
                            }
                            return e
                        } (),
                        y: function() {
                            function e(e) {
                                return e[1]
                            }
                            return e
                        } (),
                        useInteractiveGuideline: !0,
                        xAxis: {
                            showMaxMin: !1,
                            tickFormat: function() {
                                function e(e) {
                                    return p(e, "MMM-yyyy")
                                }
                                return e
                            } ()
                        },
                        yAxis: {
                            showMaxMin: !1,
                            tickFormat: function() {
                                function e(e) {
                                    return h(e, 2)
                                }
                                return e
                            } ()
                        },
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 30,
                            left: 40
                        },
                        zoom: {
                            enabled: !1,
                            scaleExtent: [1, 10],
                            useFixedDomain: !1,
                            useNiceScale: !1,
                            horizontalOff: !1,
                            verticalOff: !0,
                            unzoomEventType: "dblclick.zoom"
                        },
                        color: function() {
                            function e(e, t) {
                                return 0 === t ? "#f05050": "#faa732"
                            }
                            return e
                        } ()
                    }
                }
            },
            avgVulnAgeTrend: {
                data: null,
                options: {
                    chart: {
                        type: "lineChart",
                        interpolate: "cardinal",
                        height: 300,
                        showLabels: !0,
                        showLegend: !1,
                        duration: 500,
                        x: function() {
                            function e(e) {
                                return e[0]
                            }
                            return e
                        } (),
                        y: function() {
                            function e(e) {
                                return e[1]
                            }
                            return e
                        } (),
                        useInteractiveGuideline: !0,
                        xAxis: {
                            tickFormat: function() {
                                function e(e) {
                                    return p(e, "MMM-yyyy")
                                }
                                return e
                            } ()
                        },
                        yAxis: {
                            tickFormat: function() {
                                function e(e) {
                                    return h(e, 2)
                                }
                                return e
                            } ()
                        },
                        zoom: {
                            enabled: !1,
                            scaleExtent: [1, 10],
                            useFixedDomain: !1,
                            useNiceScale: !1,
                            horizontalOff: !1,
                            verticalOff: !0,
                            unzoomEventType: "dblclick.zoom"
                        }
                    }
                }
            }
        };
        var I = !1,
        k = null,
        A = !1,
        L = null;
        t.currentUrl = x,
        t.toggleTrends = v,
        t.onCreateTarget = y,
        t.$on("$destroy", S),
        t.$on("$destroy", r.$on("axDocumentVisibilityChanged", w)),
        function() {
            l.setDocumentTitle(f("仪表盘")),
            l.setCurrentSection("dashboard"),
            C()
        } ()
    }

    function n(e) {
        e.state("app.dash", {
            url: "dashboard/",
            controller: t,
            templateUrl: __axtr("/templates/account/dash/dash.html"),
            data: {
                page: {
                    icon: "fa-dashboard",
                    section: "dashboard"
                }
            },
            onEnter: ["$rootScope",
            function(e) {
                e.scrollTopActionVisible = !1
            }],
            onExit: ["$rootScope",
            function(e) {
                e.scrollTopActionVisible = !0
            }]
        })
    }
    t.$inject = ["$scope", "$q", "$rootScope", "$state", "$timeout", "$window", "AccountApi", "axAddTargetModal", "axConstant", "axPage", "CurrentUser", "dateFilter", "gettext", "gettextCatalog", "numberFilter", "promiseTracker"],
    e.module("WVS").config(["$stateProvider", n])
} (angular),
function(e) {
    "use strict";

    function t(e, t, n, r, i, o, a, s, c) {
        function u() {
            e.filterAsideVisible = !e.filterAsideVisible
        }

        function l(t) {
            var n = e.searchFilters;
            switch (n.filterTags.splice(n.filterTags.indexOf(t), 1), t.key) {
            case "severity":
                n.severity = [];
                break;
            case "type":
                n.eventType = [];
                break;
            case "resType":
                n.resourceType = null;
                break;
            case "resId":
                n.resourceId = null
            }
            m()
        }

        function d() {
            e.loadingTracker.cancel()
        }

        function p(e, t) {
            e !== t && (g(), h(), m())
        }

        function f(e, n) {
            e === n || v || t.reload(t.current)
        }

        function g() {
            var t = e.searchFilters,
            n = [];
            t.severity.length > 0 && n.push("severity:" + t.severity.join(",")),
            t.eventType.length > 0 && n.push("type_id:" + t.eventType.join(",")),
            t.resourceType && n.push("resource_type:" + t.resourceType),
            t.resourceId && n.push("resource_id:" + t.resourceId),
            t.searchQuery = n.join(";")
        }

        function h() {
            var t = e.searchFilters,
            n = [];
            if (t.severity.length > 0 && n.push({
                key: "severity",
                label: r("Severity:"),
                value: t.severity.map(function(e) {
                    var n = t.severityList.find(function(t) {
                        return t.value === e
                    });
                    return i.getString(n.text)
                }).join(", ")
            }), t.eventType.length > 0 && n.push({
                key: "type",
                label: r("Event:"),
                value: t.eventType.map(function(e) {
                    var n = t.eventTypeList.find(function(t) {
                        return t.typeId === e
                    });
                    return i.getString(n.groupName + " " + n.typeName)
                }).join(", ")
            }), t.resourceType && n.push({
                key: "resType",
                label: r("Resource Type:"),
                value: i.getString(t.resourceTypeList.find(function(t) {
                    return t.value === e.searchFilters.resourceType
                }).text)
            }), t.resourceId) {
                var o = r("Resource Id");
                t.resourceType && (o = i.getString(t.resourceTypeList.find(function(t) {
                    return t.value === e.searchFilters.resourceType
                }).text)),
                n.push({
                    key: "resId",
                    label: o + ":",
                    value: t.resourceId
                })
            }
            e.searchFilters.filterTags = n
        }

        function m() {
            var n = e.searchFilters,
            r = {};
            n.severity.length > 0 && (r.severity = n.severity.join(",")),
            n.eventType.length > 0 && (r.type = n.eventType.join(",")),
            n.resourceType && (r.resType = n.resourceType),
            n.resourceId && (r.resId = n.resourceId),
            v = !0,
            t.go(t.current.name, r, {
                inherit: !1
            }).
            finally(function() {
                v = !1
            })
        }
        var v = !1;
        e.loadingTracker = o({
            activationDelay: a.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        e.searchFilters = {
            searchQuery: "",
            severity: c.getStateParam("severity", !0, a.EVENT_SEVERITY.map(function(e) {
                return e.value
            })),
            severityList: a.EVENT_SEVERITY,
            eventType: c.getStateParam("type", !0, a.EVENT_TYPES_MAP.map(function(e) {
                return e.typeId
            })),
            eventTypeList: a.EVENT_TYPES_MAP,
            resourceType: c.getStateParam("resType", !1, a.EVENT_RESOURCE_TYPE.map(function(e) {
                return e.value
            })),
            resourceTypeList: a.EVENT_RESOURCE_TYPE,
            resourceId: c.getStateParam("resId", !1),
            filterTags: []
        },
        e.filterAsideVisible = !1,
        e.toggleFilter = u,
        e.removeFilterTag = l,
        e.$on("$destroy", d),
        e.$watch("searchFilters.severity", p),
        e.$watch("searchFilters.eventType", p),
        e.$watch("searchFilters.resourceType", p),
        e.$watch("searchFilters.resourceId", p),
        e.$watchCollection(function() {
            return n
        },
        f),
        function() {
            s.setDocumentTitle(r("活动日志")),
            s.setCurrentSection("activity-log"),
            h(),
            g()
        } ()
    }

    function n(e) {
        e.state("app.activity_log", {
            url: "activity-log/?severity=&type=&resType=&resId=&returnUrl=",
            controller: t,
            templateUrl: __axtr("/templates/account/activity-log/activity-log.html"),
            reloadOnSearch: !1,
            data: {
                page: {
                    icon: "fa-fw fa-bar-chart",
                    section: "activity-log"
                }
            }
        })
    }
    t.$inject = ["$scope", "$state", "$stateParams", "gettext", "gettextCatalog", "promiseTracker", "axConstant", "axPage", "axStateHelpers"],
    e.module("WVS").config(["$stateProvider", n])
} (angular),
function(e) {
	/*待汉化*/
    "use strict";
    var t = e.identity,
    n = {
        AV: {
            name: t("访问向量"),
            values: {
                L: {
                    name: t("本地"),
                    description: t("只有本地访问才能利用的漏洞，需要攻击者对易受攻击的系统或本地（shell）帐户进行物理访问. 本地可利用漏洞的例子是外围攻击，如Firewire / USB DMA攻击和本地特权升级（例如sudo）.")
                },
                A: {
                    name: t("相邻的网络"),
                    description: t("利用相邻网络的漏洞，攻击者需要访问易受攻击软件的广播或冲突域.本地网络的例子包括本地IP子网、蓝牙、IEEE 802.11和本地以太网网段.")
                },
                N: {
                    name: t("网络"),
                    description: t('A vulnerability exploitable with network access means the vulnerable software is bound to the network stack and the attacker does not require local network access or local access.  Such a vulnerability is often termed "remotely exploitable".  An example of a network attack is an RPC buffer overflow.')
                }
            }
        },
        AC: {
            name: t("Access Complexity"),
            values: {
                H: {
                    name: t("High"),
                    description: t("Specialized access conditions exist. For example:<br><ul><li>In most configurations, the attacking party must already have elevated privileges or spoof additional systems in addition to the attacking system (e.g., DNS hijacking).</li><li>The attack depends on social engineering methods that would be easily detected by knowledgeable people. For example, the victim must perform several suspicious or atypical actions.</li><li>The vulnerable configuration is seen very rarely in practice.</li><li>If a race condition exists, the window is very narrow.</li></ul>")
                },
                M: {
                    name: t("Medium"),
                    description: t("The access conditions are somewhat specialized; the following are examples:<br><ul><li>The attacking party is limited to a group of systems or users at some level of authorization, possibly untrusted.</li><li>Some information must be gathered before a successful attack can be launched.</li><li>The affected configuration is non-default, and is not commonly configured (e.g., a vulnerability present when a server performs user account authentication via a specific scheme, but not present for another authentication scheme).</li><li>The attack requires a small amount of social engineering that might occasionally fool cautious users (e.g., phishing attacks that modify a web browsers status bar to show a false link, having to be on someones buddy list before sending an IM exploit).</li></ul>")
                },
                L: {
                    name: t("Low"),
                    description: t("Specialized access conditions or extenuating circumstances do not exist. The following are examples:<br><ul><li>The affected product typically requires access to a wide range of systems and users, possibly anonymous and untrusted (e.g., Internet-facing web or mail server).</li><li>The affected configuration is default or ubiquitous.</li><li>The attack can be performed manually and requires little skill or additional information gathering.</li><li>The race condition is a lazy one (i.e., it is technically a race but easily winnable).</li></ul>")
                }
            }
        },
        Au: {
            name: t("Authentication"),
            values: {
                M: {
                    name: t("Multiple"),
                    description: t("Exploiting the vulnerability requires that the attacker authenticate two or more times, even if the same credentials are used each time. An example is an attacker authenticating to an operating system in addition to providing credentials to access an application hosted on that system.")
                },
                S: {
                    name: t("Single"),
                    description: t("The vulnerability requires an attacker to be logged into the system (such as at a command line or via a desktop session or web interface).")
                },
                N: {
                    name: t("None"),
                    description: t("Authentication is not required to exploit the vulnerability.")
                }
            }
        },
        C: {
            name: t("Confidentiality Impact"),
            values: {
                N: {
                    name: t("None"),
                    description: t("There is no impact to the confidentiality of the system.")
                },
                P: {
                    name: t("Partial"),
                    description: t("There is considerable informational disclosure. Access to some system files is possible, but the attacker does not have control over what is obtained, or the scope of the loss is constrained. An example is a vulnerability that divulges only certain tables in a database.")
                },
                C: {
                    name: t("Complete"),
                    description: t("There is total information disclosure, resulting in all system files being revealed. The attacker is able to read all of the system's data (memory, files, etc.)")
                }
            }
        },
        I: {
            name: t("Integrity Impact"),
            values: {
                N: {
                    name: t("None"),
                    description: t("There is no impact to the integrity of the system.")
                },
                P: {
                    name: t("Partial"),
                    description: t("Modification of some system files or information is possible, but the attacker does not have control over what can be modified, or the scope of what the attacker can affect is limited. For example, system or application files may be overwritten or modified, but either the attacker has no control over which files are affected or the attacker can modify files within only a limited context or scope.")
                },
                C: {
                    name: t("Complete"),
                    description: t("There is a total compromise of system integrity. There is a complete loss of system protection, resulting in the entire system being compromised. The attacker is able to modify any files on the target system.")
                }
            }
        },
        A: {
            name: t("Availability Impact"),
            values: {
                N: {
                    name: t("None"),
                    description: t("There is no impact to the availability of the system.")
                },
                P: {
                    name: t("Partial"),
                    description: t("There is reduced performance or interruptions in resource availability. An example is a network-based flood attack that permits a limited number of successful connections to an Internet service.")
                },
                C: {
                    name: t("Complete"),
                    description: t("There is a total shutdown of the affected resource. The attacker can render the resource completely unavailable.")
                }
            }
        },
        E: {
            name: t("Exploitability"),
            values: {
                U: {
                    name: t("Unproven"),
                    description: t("No exploit code is available, or an exploit is entirely theoretical.")
                },
                POC: {
                    name: t("Proof-of-Concept"),
                    description: t("Proof-of-concept exploit code or an attack demonstration that is not practical for most systems is available. The code or technique is not functional in all situations and may require substantial modification by a skilled attacker.")
                },
                F: {
                    name: t("Functional"),
                    description: t("Functional exploit code is available. The code works in most situations where the vulnerability exists.")
                },
                H: {
                    name: t("High"),
                    description: t("Either the vulnerability is exploitable by functional mobile autonomous code, or no exploit is required (manual trigger) and details are widely available. The code works in every situation, or is actively being delivered via a mobile autonomous agent (such as a worm or virus).")
                },
                ND: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.")
                }
            }
        },
        RL: {
            name: t("Remediation Level"),
            values: {
                OF: {
                    name: t("Official Fix"),
                    description: t("A complete vendor solution is available. Either the vendor has issued an official patch, or an upgrade is available.")
                },
                TF: {
                    name: t("Temporary Fix"),
                    description: t("There is an official but temporary fix available. This includes instances where the vendor issues a temporary hotfix, tool, or workaround.")
                },
                W: {
                    name: t("Workaround"),
                    description: t("There is an unofficial, non-vendor solution available. In some cases, users of the affected technology will create a patch of their own or provide steps to work around or otherwise mitigate the vulnerability.")
                },
                U: {
                    name: t("Unavailable"),
                    description: t("There is either no solution available or it is impossible to apply.")
                },
                ND: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.")
                }
            }
        },
        RC: {
            name: t("Report Confidence"),
            values: {
                UC: {
                    name: t("Unconfirmed"),
                    description: t("There is a single unconfirmed source or possibly multiple conflicting reports. There is little confidence in the validity of the reports. An example is a rumor that surfaces from the hacker underground.")
                },
                UR: {
                    name: t("Uncorroborated"),
                    description: t("There are multiple non-official sources, possibly including independent security companies or research organizations. At this point there may be conflicting technical details or some other lingering ambiguity.")
                },
                C: {
                    name: t("Confirmed"),
                    description: t("The vulnerability has been acknowledged by the vendor or author of the affected technology. The vulnerability may also be Confirmed when its existence is confirmed from an external event such as publication of functional or proof-of-concept exploit code or widespread exploitation.")
                },
                ND: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.")
                }
            }
        },
        CDP: {
            name: t("Collateral Damage Potential"),
            values: {
                N: {
                    name: t("None"),
                    description: t("There is no potential for loss of life, physical assets, productivity or revenue.")
                },
                L: {
                    name: t("Low"),
                    description: t("A successful exploit of this vulnerability may result in slight physical or property damage. Or, there may be a slight loss of revenue or productivity to the organization.")
                },
                LM: {
                    name: t("Low-Medium"),
                    description: t("A successful exploit of this vulnerability may result in moderate physical or property damage. Or, there may be a moderate loss of revenue or productivity to the organization.")
                },
                MH: {
                    name: t("Medium-High"),
                    description: t("A successful exploit of this vulnerability may result in significant physical or property damage or loss. Or, there may be a significant loss of revenue or productivity.")
                },
                H: {
                    name: t("High"),
                    description: t("A successful exploit of this vulnerability may result in catastrophic physical or property damage and loss. Or, there may be a catastrophic loss of revenue or productivity.")
                },
                ND: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.")
                }
            }
        },
        TD: {
            name: t("Target Distribution"),
            values: {
                N: {
                    name: t("None"),
                    description: t("No target systems exist, or targets are so highly specialized that they only exist in a laboratory setting. Effectively 0% of the environment is at risk.")
                },
                L: {
                    name: t("Low"),
                    description: t("Targets exist inside the environment, but on a small scale. Between 1% - 25% of the total environment is at risk.")
                },
                M: {
                    name: t("Medium"),
                    description: t("Targets exist inside the environment, but on a medium scale. Between 26% - 75% of the total environment is at risk.")
                },
                H: {
                    name: t("High"),
                    description: t("Targets exist inside the environment on a considerable scale. Between 76% - 100% of the total environment is considered at risk.")
                },
                ND: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.")
                }
            }
        },
        CR: {
            name: t("Confidentiality Requirement"),
            values: {
                L: {
                    name: t("Low"),
                    description: t("Loss of confidentiality is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                M: {
                    name: t("Medium"),
                    description: t("Loss of confidentiality is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                H: {
                    name: t("High"),
                    description: t("Loss of confidentiality is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                ND: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.")
                }
            }
        },
        IR: {
            name: t("Integrity Requirement"),
            values: {
                L: {
                    name: t("Low"),
                    description: t("Loss of integrity is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                M: {
                    name: t("Medium"),
                    description: t("Loss of integrity is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                H: {
                    name: t("High"),
                    description: t("Loss of integrity is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                ND: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.")
                }
            }
        },
        AR: {
            name: t("Availability Requirement"),
            values: {
                L: {
                    name: t("Low"),
                    description: t("Loss of availability is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                M: {
                    name: t("Medium"),
                    description: t("Loss of availability is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                H: {
                    name: t("High"),
                    description: t("Loss of availability is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                ND: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.")
                }
            }
        }
    },
    r = {
        AV: {
            name: t("Attack Vector"),
            values: {
                N: {
                    name: t("Network"),
                    description: t("A vulnerability exploitable with network access means the vulnerable component is bound to the network stack and the attacker’s path is through OSI layer 3 (the network layer). Such a vulnerability is often termed ”remotely exploitable” and can be thought of as an attack being exploitable one or more network hops away.")
                },
                A: {
                    name: t("Adjacent"),
                    description: t("A vulnerability exploitable with adjacent network access means the vulnerable component is bound to the network stack, however the attack is limited to the same shared physical (e.g. Bluetooth, IEEE 802.11), or logical (e.g. local IP subnet) network, and cannot be performed across an OSI layer 3 boundary (e.g. a router).")
                },
                L: {
                    name: t("Local"),
                    description: t("A vulnerability exploitable with local access means that the vulnerable component is not bound to the network stack, and the attacker’s path is via read/write/execute capabilities. In some cases, the attacker may be logged in locally in order to exploit the vulnerability, otherwise, she may rely on User Interaction to execute a malicious file.")
                },
                P: {
                    name: t("Physical"),
                    description: t("A vulnerability exploitable with physical access requires the attacker to physically touch or manipulate the vulnerable component. Physical interaction may be brief or persistent.")
                }
            }
        },
        AC: {
            name: t("Attack Complexity"),
            values: {
                L: {
                    name: t("Low"),
                    description: t("Specialized access conditions or extenuating circumstances do not exist. An attacker can expect repeatable success against the vulnerable component.")
                },
                H: {
                    name: t("High"),
                    description: t("A successful attack depends on conditions beyond the attacker’s control. That is, a successful attack cannot be accomplished at will, but requires the attacker to invest in some measurable amount of effort in preparation or execution against the vulnerable component before a successful attack can be expected. For example, a successful attack may require the attacker: to perform target-specific reconnaissance; to prepare the target environment to improve exploit reliability; or to inject herself into the logical network path between the target and the resource requested by the victim in order to read and/or modify network communications (e.g. a man in the middle attack).")
                }
            }
        },
        PR: {
            name: t("Privileges Required"),
            values: {
                N: {
                    name: t("None"),
                    description: t("The attacker is unauthorized prior to attack, and therefore does not require any access to settings or files to carry out an attack.")
                },
                L: {
                    name: t("Low"),
                    description: t("The attacker is authorized with (i.e. requires) privileges that provide basic user capabilities that could normally affect only settings and files owned by a user. Alternatively, an attacker with Low privileges may have the ability to cause an impact only to non-sensitive resources.")
                },
                H: {
                    name: t("High"),
                    description: t("The attacker is authorized with (i.e. requires) privileges that provide significant (e.g. administrative) control over the vulnerable component that could affect component-wide settings and files.")
                }
            }
        },
        UI: {
            name: t("User Interaction"),
            values: {
                N: {
                    name: t("None"),
                    description: t("The vulnerable system can be exploited without any interaction from any user.")
                },
                R: {
                    name: t("Required"),
                    description: t("Successful exploitation of this vulnerability requires a user to take some action before the vulnerability can be exploited.")
                }
            }
        },
        S: {
            name: t("Scope"),
            values: {
                U: {
                    name: t("Unchanged"),
                    description: t("An exploited vulnerability can only affect resources managed by the same authority. In this case the vulnerable component and the impacted component are the same.")
                },
                C: {
                    name: t("Changed"),
                    description: t("An exploited vulnerability can affect resources beyond the authorization privileges intended by the vulnerable component. In this case the vulnerable component and the impacted component are different.")
                }
            }
        },
        C: {
            name: t("Confidentiality"),
            values: {
                N: {
                    name: t("None"),
                    description: t("There is no loss of confidentiality within the impacted component.")
                },
                L: {
                    name: t("Low"),
                    description: t("There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained, or the amount or kind of loss is constrained. The information disclosure does not cause a direct, serious loss to the impacted component.")
                },
                H: {
                    name: t("High"),
                    description: t("There is total loss of confidentiality, resulting in all resources within the impacted component being divulged to the attacker. Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact.")
                }
            }
        },
        I: {
            name: t("Integrity"),
            values: {
                N: {
                    name: t("None"),
                    description: t("There is no loss of integrity within the impacted component.")
                },
                L: {
                    name: t("Low"),
                    description: t("Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is constrained. The data modification does not have a direct, serious impact on the impacted component.")
                },
                H: {
                    name: t("High"),
                    description: t("There is a total loss of integrity, or a complete loss of protection. For example, the attacker is able to modify any/all files protected by the impacted component. Alternatively, only some files can be modified, but malicious modification would present a direct, serious consequence to the impacted component.")
                }
            }
        },
        A: {
            name: t("Availability"),
            values: {
                N: {
                    name: t("None"),
                    description: t("There is no impact to availability within the impacted component.")
                },
                L: {
                    name: t("Low"),
                    description: t("There is reduced performance or interruptions in resource availability. Even if repeated exploitation of the vulnerability is possible, the attacker does not have the ability to completely deny service to legitimate users. The resources in the impacted component are either partially available all of the time, or fully available only some of the time, but overall there is no direct, serious consequence to the impacted component.")
                },
                H: {
                    name: t("High"),
                    description: t("There is total loss of availability, resulting in the attacker being able to fully deny access to resources in the impacted component; this loss is either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious consequence to the impacted component (e.g., the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable).")
                }
            }
        },
        E: {
            name: t("Exploit Code Maturity"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score.")
                },
                U: {
                    name: t("Unproven"),
                    description: t("No exploit code is available, or an exploit is theoretical.")
                },
                P: {
                    name: t("Proof-of-Concept"),
                    description: t("Proof-of-concept exploit code is available, or an attack demonstration is not practical for most systems. The code or technique is not functional in all situations and may require substantial modification by a skilled attacker.")
                },
                F: {
                    name: t("Functional"),
                    description: t("Functional exploit code is available. The code works in most situations where the vulnerability exists.")
                },
                H: {
                    name: t("High"),
                    description: t("Functional autonomous code exists, or no exploit is required (manual trigger) and details are widely available. Exploit code works in every situation, or is actively being delivered via an autonomous agent (such as a worm or virus). Network-connected systems are likely to encounter scanning or exploitation attempts. Exploit development has reached the level of reliable, widely-available, easy-to-use automated tools.")
                }
            }
        },
        RL: {
            name: t("Remediation Level"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score.")
                },
                O: {
                    name: t("Official Fix"),
                    description: t("A complete vendor solution is available. Either the vendor has issued an official patch, or an upgrade is available.")
                },
                T: {
                    name: t("Temporary Fix"),
                    description: t("There is an official but temporary fix available. This includes instances where the vendor issues a temporary hotfix, tool, or workaround.")
                },
                W: {
                    name: t("Workaround"),
                    description: t("There is an unofficial, non-vendor solution available. In some cases, users of the affected technology will create a patch of their own or provide steps to work around or otherwise mitigate the vulnerability.")
                },
                U: {
                    name: t("Unavailable"),
                    description: t("There is either no solution available or it is impossible to apply.")
                }
            }
        },
        RC: {
            name: t("Report Confidence"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score.")
                },
                U: {
                    name: t("Unknown"),
                    description: t("There are reports of impacts that indicate a vulnerability is present. The reports indicate that the cause of the vulnerability is unknown, or reports may differ on the cause or impacts of the vulnerability. Reporters are uncertain of the true nature of the vulnerability, and there is little confidence in the validity of the reports or whether a static Base score can be applied given the differences described. An example is a bug report which notes that an intermittent but non-reproducible crash occurs, with evidence of memory corruption suggesting that denial of service, or possible more serious impacts, may result.")
                },
                R: {
                    name: t("Reasonable"),
                    description: t("Significant details are published, but researchers either do not have full confidence in the root cause, or do not have access to source code to fully confirm all of the interactions that may lead to the result. Reasonable confidence exists, however, that the bug is reproducible and at least one impact is able to be verified (Proof-of-concept exploits may provide this). An example is a detailed write-up of research into a vulnerability with an explanation (possibly obfuscated or ’left as an exercise to the reader’) that gives assurances on how to reproduce the results.")
                },
                C: {
                    name: t("Confirmed"),
                    description: t("Detailed reports exist, or functional reproduction is possible (functional exploits may provide this). Source code is available to independently verify the assertions of the research, or the author or vendor of the affected code has confirmed the presence of the vulnerability.")
                }
            }
        },
        CR: {
            name: t("Confidentiality Requirement"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score.")
                },
                L: {
                    name: t("Low"),
                    description: t("Loss of Confidentiality is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                M: {
                    name: t("Medium"),
                    description: t("Assigning this value to the metric will not influence the score.")
                },
                H: {
                    name: t("High"),
                    description: t("Loss of Confidentiality is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                }
            }
        },
        IR: {
            name: t("Integrity Requirement"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score.")
                },
                L: {
                    name: t("Low"),
                    description: t("Loss of Integrity is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                M: {
                    name: t("Medium"),
                    description: t("Assigning this value to the metric will not influence the score.")
                },
                H: {
                    name: t("High"),
                    description: t("Loss of Integrity is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                }
            }
        },
        AR: {
            name: t("Availability Requirement"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Assigning this value to the metric will not influence the score.")
                },
                L: {
                    name: t("Low"),
                    description: t("Loss of Availability is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                },
                M: {
                    name: t("Medium"),
                    description: t("Assigning this value to the metric will not influence the score.")
                },
                H: {
                    name: t("High"),
                    description: t("Loss of Availability is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).")
                }
            }
        },
        MAV: {
            name: t("Modified Attack Vector"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Use the value assigned to the corresponding Base Score metric.")
                },
                N: {
                    name: t("Network"),
                    description: t("A vulnerability exploitable with network access means the vulnerable component is bound to the network stack and the attacker’s path is through OSI layer 3 (the network layer). Such a vulnerability is often termed ”remotely exploitable” and can be thought of as an attack being exploitable one or more network hops away.")
                },
                A: {
                    name: t("Adjacent Network"),
                    description: t("A vulnerability exploitable with adjacent network access means the vulnerable component is bound to the network stack, however the attack is limited to the same shared physical (e.g. Bluetooth, IEEE 802.11), or logical (e.g. local IP subnet) network, and cannot be performed across an OSI layer 3 boundary (e.g. a router).")
                },
                L: {
                    name: t("Local"),
                    description: t("A vulnerability exploitable with local access means that the vulnerable component is not bound to the network stack, and the attacker’s path is via read/write/execute capabilities. In some cases, the attacker may be logged in locally in order to exploit the vulnerability, otherwise, she may rely on User Interaction to execute a malicious file.")
                },
                P: {
                    name: t("Physical"),
                    description: t("A vulnerability exploitable with physical access requires the attacker to physically touch or manipulate the vulnerable component. Physical interaction may be brief or persistent.")
                }
            }
        },
        MAC: {
            name: t("Modified Attack Complexity"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Use the value assigned to the corresponding Base Score metric.")
                },
                L: {
                    name: t("Low"),
                    description: t("Specialized access conditions or extenuating circumstances do not exist. An attacker can expect repeatable success against the vulnerable component.")
                },
                H: {
                    name: t("High"),
                    description: t("A successful attack depends on conditions beyond the attacker’s control. That is, a successful attack cannot be accomplished at will, but requires the attacker to invest in some measurable amount of effort in preparation or execution against the vulnerable component before a successful attack can be expected. For example, a successful attack may require the attacker: to perform target-specific reconnaissance; to prepare the target environment to improve exploit reliability; or to inject herself into the logical network path between the target and the resource requested by the victim in order to read and/or modify network communications (e.g. a man in the middle attack).")
                }
            }
        },
        MPR: {
            name: t("Modified Privileges Required"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Use the value assigned to the corresponding Base Score metric.")
                },
                N: {
                    name: t("None"),
                    description: t("The attacker is unauthorized prior to attack, and therefore does not require any access to settings or files to carry out an attack.")
                },
                L: {
                    name: t("Low"),
                    description: t("The attacker is authorized with (i.e. requires) privileges that provide basic user capabilities that could normally affect only settings and files owned by a user. Alternatively, an attacker with Low privileges may have the ability to cause an impact only to non-sensitive resources.")
                },
                H: {
                    name: t("High"),
                    description: t("The attacker is authorized with (i.e. requires) privileges that provide significant (e.g. administrative) control over the vulnerable component that could affect component-wide settings and files.")
                }
            }
        },
        MUI: {
            name: t("Modified User Interaction"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Use the value assigned to the corresponding Base Score metric.")
                },
                N: {
                    name: t("None"),
                    description: t("The vulnerable system can be exploited without any interaction from any user.")
                },
                R: {
                    name: t("Required"),
                    description: t("Successful exploitation of this vulnerability requires a user to take some action before the vulnerability can be exploited.")
                }
            }
        },
        MS: {
            name: t("Modified Scope"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Use the value assigned to the corresponding Base Score metric.")
                },
                U: {
                    name: t("Unchanged"),
                    description: t("An exploited vulnerability can only affect resources managed by the same authority. In this case the vulnerable component and the impacted component are the same.")
                },
                C: {
                    name: t("Changed"),
                    description: t("An exploited vulnerability can affect resources beyond the authorization privileges intended by the vulnerable component. In this case the vulnerable component and the impacted component are different.")
                }
            }
        },
        MC: {
            name: t("Modified Confidentiality"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Use the value assigned to the corresponding Base Score metric.")
                },
                N: {
                    name: t("None"),
                    description: t("There is no loss of confidentiality within the impacted component.")
                },
                L: {
                    name: t("Low"),
                    description: t("There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained, or the amount or kind of loss is constrained. The information disclosure does not cause a direct, serious loss to the impacted component.")
                },
                H: {
                    name: t("High"),
                    description: t("There is total loss of confidentiality, resulting in all resources within the impacted component being divulged to the attacker. Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact.")
                }
            }
        },
        MI: {
            name: t("Modified Integrity"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Use the value assigned to the corresponding Base Score metric.")
                },
                N: {
                    name: t("None"),
                    description: t("There is no loss of integrity within the impacted component.")
                },
                L: {
                    name: t("Low"),
                    description: t("Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is constrained. The data modification does not have a direct, serious impact on the impacted component.")
                },
                H: {
                    name: t("High"),
                    description: t("There is a total loss of integrity, or a complete loss of protection. For example, the attacker is able to modify any/all files protected by the impacted component. Alternatively, only some files can be modified, but malicious modification would present a direct, serious consequence to the impacted component.")
                }
            }
        },
        MA: {
            name: t("Modified Availability"),
            values: {
                X: {
                    name: t("Not Defined"),
                    description: t("Use the value assigned to the corresponding Base Score metric.")
                },
                N: {
                    name: t("None"),
                    description: t("There is no impact to availability within the impacted component.")
                },
                L: {
                    name: t("Low"),
                    description: t("There is reduced performance or interruptions in resource availability. Even if repeated exploitation of the vulnerability is possible, the attacker does not have the ability to completely deny service to legitimate users. The resources in the impacted component are either partially available all of the time, or fully available only some of the time, but overall there is no direct, serious consequence to the impacted component.")
                },
                H: {
                    name: t("High"),
                    description: t("There is total loss of availability, resulting in the attacker being able to fully deny access to resources in the impacted component; this loss is either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious consequence to the impacted component (e.g., the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable).")
                }
            }
        }
    },
    i = {
        2 : n,
        3 : r
    },
    o = {
        2 : "https://nvd.nist.gov/cvss.cfm?version=2&vector=",
        3 : "https://www.first.org/cvss/calculator/3.0#"
    },
    a = /^CVSS:3\.0\//,
    s = new RegExp("(?:CVE-\\d{4}-\\d+)", "g"),
    c = new RegExp("(CWE-\\d+)", "g"),
    u = function() {
        function e() {}
        return e.prototype.extractCVE = function(e) {
            var t = [];
            if (e) for (var n; n = s.exec(e);) t.push(n[0].substr(4));
            return t
        },
        e.prototype.extractCWE = function(e) {
            var t = [];
            if (e) for (var n; n = c.exec(e);) t.push(n[0].substr(4));
            return t
        },
        e.prototype.detectCVSSVersion = function(e) {
            return a.test(e) ? "3": "2"
        },
        e.prototype.getCVSSMetrics = function(e, t) {
            var n = t && String(t) ? t: this.detectCVSSVersion(e);
            return "3" === n && (e = e.substr(9)),
            e.split("/").map(function(e) {
                var t = e.split(":"),
                r = i[n][t[0]];
                return {
                    metricName: r.name,
                    valueName: r.values[t[1]].name,
                    description: r.values[t[1]].description
                }
            })
        },
        e.prototype.getCVSSLink = function(e, t) {
            var n = t && String(t) ? t: this.detectCVSSVersion(e);
            return "" + o[n] + e
        },
        e
    } ();
    e.module("WVS").service("axVulnClassification", u)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function e(e, t) {
            this.localStorageService = e,
            this.CurrentUser = t
        }
        return e.$inject = ["localStorageService", "CurrentUser"],
        e.prototype.set = function(e, t) {
            var n = this.CurrentUser.get("userId");
            return !! n && (this.localStorageService.set(n + "." + e, t), !0)
        },
        e.prototype.get = function(e) {
            var t = this.CurrentUser.get("userId");
            return t ? this.localStorageService.get(t + "." + e) : null
        },
        e.prototype.remove = function(e) {
            var t = this.CurrentUser.get("userId");
            t && this.localStorageService.remove(t + "." + e)
        },
        e.prototype.clear = function() {
            var e = this.CurrentUser.get("userId");
            if (e) try {
                this.localStorageService.clearAll(new RegExp("^" + e + "."))
            } catch(e) {}
        },
        e
    } ();
    e.module("WVS").service("axUserPreferences", t)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function t(e) {
            this.$stateParams = e
        }
        return t.$inject = ["$stateParams"],
        t.prototype.getStateParam = function(t, n, r) {
            void 0 === n && (n = !1);
            var i = this.$stateParams;
            if (e.isString(t)) {
                var o = i.hasOwnProperty(t) && i[t] ? String(i[t]).trim() : null;
                if (!o) return n ? [] : null;
                var a = o;
                return n ? (a = o.split(",").filter(function(e) {
                    return e.length > 0
                }), e.isArray(r) ? a = a.filter(function(e) {
                    return r.indexOf(e) > -1
                }) : e.isFunction(r) && (a = a.filter(r))) : e.isArray(r) && r.indexOf(a) < 0 ? a = null: e.isFunction(r) && (a = r(a) ? a: null),
                a
            }
            return null
        },
        t
    } ();
    e.module("WVS").service("axStateHelpers", t)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function e(e, t, n) {
            var r = this;
            this.$document = e,
            this.$location = t,
            this.$rootScope = n,
            this._documentIsHidden = !1,
            function() {
                var t, i, o = e.get(0);
                void 0 !== o.hidden ? (t = "hidden", i = "visibilitychange") : void 0 !== o.msHidden ? (t = "msHidden", i = "msvisibilitychange") : void 0 !== o.webkitHidden && (t = "webkitHidden", i = "webkitvisibilitychange"),
                void 0 !== o[t] && e.off(i).on(i,
                function() {
                    r._documentIsHidden !== o[t] && (r._documentIsHidden = o[t], n.$applyAsync(function() {
                        n.$emit("axDocumentVisibilityChanged", {
                            hidden: o[t],
                            visibilityState: o.visibilityState
                        })
                    }))
                })
            } ()
        }
        return e.prototype.currentUrl = function() {
            return this.$location.url()
        },
        e.prototype.currentUrlEncoded = function() {
            return encodeURIComponent(this.currentUrl())
        },
        e.prototype.setDocumentTitle = function(e, t) {
            void 0 === t && (t = "Acunetix");
            var n = [];
            return t.length > 0 && n.push(t),
            e.length > 0 && n.push(e),
            this.$rootScope.documentTitle = n.join(" - ")
        },
        e.prototype.setCurrentSection = function(e) {
            this.$rootScope.currentSection = e
        },
        e.prototype.getCurrentSection = function() {
            return this.$rootScope.currentSection
        },
        e.prototype.setHelpLink = function(e) {
            this.$rootScope.globalHelpLink = e
        },
        e.prototype.setDefaultHelpLink = function() {
            this.$rootScope.globalHelpLink = ""
        },
        e.prototype.isHidden = function() {
            return this._documentIsHidden
        },
        e.$inject = ["$document", "$location", "$rootScope"],
        e
    } ();
    e.module("WVS").service("axPage", t)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function e(e, t, n, r) {
            this.$q = e,
            this.gettextCatalog = t,
            this.localStorageService = n,
            this.axConstant = r
        }
        return e.$inject = ["$q", "gettextCatalog", "localStorageService", "axConstant"],
        e.prototype.init = function() {
            var e = this,
            t = e.axConstant,
            n = e.localStorageService,
            r = n.get("locale");
            this.changeLanguage(r || t.DEFAULT_UI_LANGUAGE)
        },
        e.prototype.changeLanguage = function(e) {
            var t = this,
            n = t.axConstant,
            r = t.$q,
            i = t.gettextCatalog,
            o = t.localStorageService;
            return e === n.DEFAULT_UI_LANGUAGE ? (o.remove("locale"), i.setCurrentLanguage(e), r.when()) : (o.set("locale", e), i.loadRemote("/locales/" + e + ".json").then(function() {
                i.setCurrentLanguage(e)
            }))
        },
        e
    } ();
    e.module("WVS").service("axLocale", t)
} (angular),
function(e) {
    "use strict";
    var t = e.identity,
    n = [{
        code: "AF",
        name: t("Afghanistan")
    },
    {
        code: "AX",
        name: t("Åland Islands")
    },
    {
        code: "AL",
        name: t("Albania")
    },
    {
        code: "DZ",
        name: t("Algeria")
    },
    {
        code: "AS",
        name: t("American Samoa")
    },
    {
        code: "AD",
        name: t("Andorra")
    },
    {
        code: "AO",
        name: t("Angola")
    },
    {
        code: "AI",
        name: t("Anguilla")
    },
    {
        code: "AQ",
        name: t("Antarctica")
    },
    {
        code: "AG",
        name: t("Antigua and Barbuda")
    },
    {
        code: "AR",
        name: t("Argentina")
    },
    {
        code: "AM",
        name: t("Armenia")
    },
    {
        code: "AW",
        name: t("Aruba")
    },
    {
        deprecated: !0,
        code: "AC",
        name: t("Ascension Island")
    },
    {
        code: "AU",
        name: t("Australia")
    },
    {
        inEU: !0,
        code: "AT",
        name: t("Austria")
    },
    {
        code: "AZ",
        name: t("Azerbaijan")
    },
    {
        code: "BS",
        name: t("Bahamas")
    },
    {
        code: "BH",
        name: t("Bahrain")
    },
    {
        code: "BD",
        name: t("Bangladesh")
    },
    {
        code: "BB",
        name: t("Barbados")
    },
    {
        code: "BY",
        name: t("Belarus")
    },
    {
        inEU: !0,
        code: "BE",
        name: t("Belgium")
    },
    {
        code: "BZ",
        name: t("Belize")
    },
    {
        code: "BJ",
        name: t("Benin")
    },
    {
        code: "BM",
        name: t("Bermuda")
    },
    {
        code: "BT",
        name: t("Bhutan")
    },
    {
        code: "BO",
        name: t("Bolivia")
    },
    {
        code: "BQ",
        name: t("Bonaire")
    },
    {
        code: "BA",
        name: t("Bosnia and Herzegovina")
    },
    {
        code: "BW",
        name: t("Botswana")
    },
    {
        code: "BV",
        name: t("Bouvet Island")
    },
    {
        code: "BR",
        name: t("Brazil")
    },
    {
        code: "IO",
        name: t("British Indian Ocean Territory")
    },
    {
        code: "BN",
        name: t("Brunei")
    },
    {
        inEU: !0,
        code: "BG",
        name: t("Bulgaria")
    },
    {
        code: "BF",
        name: t("Burkina Faso")
    },
    {
        code: "BI",
        name: t("Burundi")
    },
    {
        code: "CV",
        name: t("Cabo Verde")
    },
    {
        code: "KH",
        name: t("Cambodia")
    },
    {
        code: "CM",
        name: t("Cameroon")
    },
    {
        code: "CA",
        name: t("Canada")
    },
    {
        code: "KY",
        name: t("Cayman Islands")
    },
    {
        code: "CF",
        name: t("Central African Republic")
    },
    {
        code: "TD",
        name: t("Chad")
    },
    {
        code: "CL",
        name: t("Chile")
    },
    {
        code: "CN",
        name: t("China")
    },
    {
        code: "CX",
        name: t("Christmas Island")
    },
    {
        code: "CC",
        name: t("Cocos (Keeling) Islands")
    },
    {
        code: "CO",
        name: t("Colombia")
    },
    {
        code: "KM",
        name: t("Comoros")
    },
    {
        code: "CG",
        name: t("Congo")
    },
    {
        code: "CD",
        name: t("Congo (DRC)")
    },
    {
        code: "CK",
        name: t("Cook Islands")
    },
    {
        code: "CR",
        name: t("Costa Rica")
    },
    {
        code: "HR",
        name: t("Croatia")
    },
    {
        code: "CU",
        name: t("Cuba")
    },
    {
        code: "CW",
        name: t("Curaçao")
    },
    {
        inEU: !0,
        code: "CY",
        name: t("Cyprus")
    },
    {
        inEU: !0,
        code: "CZ",
        name: t("Czech Republic")
    },
    {
        inEU: !0,
        code: "DK",
        name: t("Denmark")
    },
    {
        code: "DJ",
        name: t("Djibouti")
    },
    {
        code: "DM",
        name: t("Dominica")
    },
    {
        code: "DO",
        name: t("Dominican Republic")
    },
    {
        code: "EC",
        name: t("Ecuador")
    },
    {
        code: "EG",
        name: t("Egypt")
    },
    {
        code: "SV",
        name: t("El Salvador")
    },
    {
        code: "GQ",
        name: t("Equatorial Guinea")
    },
    {
        code: "ER",
        name: t("Eritrea")
    },
    {
        inEU: !0,
        code: "EE",
        name: t("Estonia")
    },
    {
        code: "ET",
        name: t("Ethiopia")
    },
    {
        code: "FK",
        name: t("Falkland Islands")
    },
    {
        code: "FO",
        name: t("Faroe Islands")
    },
    {
        code: "FJ",
        name: t("Fiji Islands")
    },
    {
        inEU: !0,
        code: "FI",
        name: t("Finland")
    },
    {
        inEU: !0,
        code: "FR",
        name: t("France")
    },
    {
        code: "GF",
        name: t("French Guiana")
    },
    {
        code: "PF",
        name: t("French Polynesia")
    },
    {
        code: "TF",
        name: t("French Southern and Antarctic Lands")
    },
    {
        code: "GA",
        name: t("Gabon")
    },
    {
        code: "GM",
        name: t("Gambia, The")
    },
    {
        code: "GE",
        name: t("Georgia")
    },
    {
        inEU: !0,
        code: "DE",
        name: t("Germany")
    },
    {
        code: "GH",
        name: t("Ghana")
    },
    {
        code: "GI",
        name: t("Gibraltar")
    },
    {
        inEU: !0,
        code: "GR",
        name: t("Greece")
    },
    {
        code: "GL",
        name: t("Greenland")
    },
    {
        code: "GD",
        name: t("Grenada")
    },
    {
        code: "GP",
        name: t("Guadeloupe")
    },
    {
        code: "GU",
        name: t("Guam")
    },
    {
        code: "GT",
        name: t("Guatemala")
    },
    {
        code: "GG",
        name: t("Guernsey")
    },
    {
        code: "GN",
        name: t("Guinea")
    },
    {
        code: "GW",
        name: t("Guinea-Bissau")
    },
    {
        code: "GY",
        name: t("Guyana")
    },
    {
        code: "HT",
        name: t("Haiti")
    },
    {
        code: "HM",
        name: t("Heard Island and McDonald Islands")
    },
    {
        code: "VA",
        name: t("Holy See (Vatican City)")
    },
    {
        code: "HN",
        name: t("Honduras")
    },
    {
        code: "HK",
        name: t("Hong Kong SAR")
    },
    {
        inEU: !0,
        code: "HU",
        name: t("Hungary")
    },
    {
        code: "IS",
        name: t("Iceland")
    },
    {
        code: "IN",
        name: t("India")
    },
    {
        code: "ID",
        name: t("Indonesia")
    },
    {
        code: "IR",
        name: t("Iran")
    },
    {
        code: "IQ",
        name: t("Iraq")
    },
    {
        inEU: !0,
        code: "IE",
        name: t("Ireland")
    },
    {
        code: "IM",
        name: t("Isle of Man")
    },
    {
        code: "IL",
        name: t("Israel")
    },
    {
        inEU: !0,
        code: "IT",
        name: t("Italy")
    },
    {
        code: "JM",
        name: t("Jamaica")
    },
    {
        code: "SJ",
        name: t("Jan Mayen")
    },
    {
        code: "JP",
        name: t("Japan")
    },
    {
        code: "JE",
        name: t("Jersey")
    },
    {
        code: "JO",
        name: t("Jordan")
    },
    {
        code: "KZ",
        name: t("Kazakhstan")
    },
    {
        code: "KE",
        name: t("Kenya")
    },
    {
        code: "KI",
        name: t("Kiribati")
    },
    {
        code: "KR",
        name: t("Korea")
    },
    {
        code: "XK",
        name: t("Kosovo")
    },
    {
        code: "KW",
        name: t("Kuwait")
    },
    {
        code: "KG",
        name: t("Kyrgyzstan")
    },
    {
        code: "LA",
        name: t("Laos")
    },
    {
        inEU: !0,
        code: "LV",
        name: t("Latvia")
    },
    {
        code: "LB",
        name: t("Lebanon")
    },
    {
        code: "LS",
        name: t("Lesotho")
    },
    {
        code: "LR",
        name: t("Liberia")
    },
    {
        code: "LY",
        name: t("Libya")
    },
    {
        code: "LI",
        name: t("Liechtenstein")
    },
    {
        inEU: !0,
        code: "LT",
        name: t("Lithuania")
    },
    {
        inEU: !0,
        code: "LU",
        name: t("Luxembourg")
    },
    {
        code: "MO",
        name: t("Macao SAR")
    },
    {
        code: "MK",
        name: t("Macedonia, Former Yugoslav Republic of")
    },
    {
        code: "MG",
        name: t("Madagascar")
    },
    {
        code: "MW",
        name: t("Malawi")
    },
    {
        code: "MY",
        name: t("Malaysia")
    },
    {
        code: "MV",
        name: t("Maldives")
    },
    {
        code: "ML",
        name: t("Mali")
    },
    {
        inEU: !0,
        code: "MT",
        name: t("Malta")
    },
    {
        code: "MH",
        name: t("Marshall Islands")
    },
    {
        code: "MQ",
        name: t("Martinique")
    },
    {
        code: "MR",
        name: t("Mauritania")
    },
    {
        code: "MU",
        name: t("Mauritius")
    },
    {
        code: "YT",
        name: t("Mayotte")
    },
    {
        code: "MX",
        name: t("Mexico")
    },
    {
        code: "FM",
        name: t("Micronesia")
    },
    {
        code: "MD",
        name: t("Moldova")
    },
    {
        code: "MC",
        name: t("Monaco")
    },
    {
        code: "MN",
        name: t("Mongolia")
    },
    {
        code: "ME",
        name: t("Montenegro")
    },
    {
        code: "MS",
        name: t("Montserrat")
    },
    {
        code: "MA",
        name: t("Morocco")
    },
    {
        code: "MZ",
        name: t("Mozambique")
    },
    {
        code: "MM",
        name: t("Myanmar")
    },
    {
        code: "NA",
        name: t("Namibia")
    },
    {
        code: "NR",
        name: t("Nauru")
    },
    {
        code: "NP",
        name: t("Nepal")
    },
    {
        inEU: !0,
        code: "NL",
        name: t("Netherlands")
    },
    {
        deprecated: !0,
        code: "AN",
        name: t("Netherlands Antilles (Former)")
    },
    {
        code: "NC",
        name: t("New Caledonia")
    },
    {
        code: "NZ",
        name: t("New Zealand")
    },
    {
        code: "NI",
        name: t("Nicaragua")
    },
    {
        code: "NE",
        name: t("Niger")
    },
    {
        code: "NG",
        name: t("Nigeria")
    },
    {
        code: "NU",
        name: t("Niue")
    },
    {
        code: "NF",
        name: t("Norfolk Island")
    },
    {
        code: "KP",
        name: t("North Korea")
    },
    {
        code: "MP",
        name: t("Northern Mariana Islands")
    },
    {
        code: "NO",
        name: t("Norway")
    },
    {
        code: "OM",
        name: t("Oman")
    },
    {
        code: "PK",
        name: t("Pakistan")
    },
    {
        code: "PW",
        name: t("Palau")
    },
    {
        code: "PS",
        name: t("Palestinian Authority")
    },
    {
        code: "PA",
        name: t("Panama")
    },
    {
        code: "PG",
        name: t("Papua New Guinea")
    },
    {
        code: "PY",
        name: t("Paraguay")
    },
    {
        code: "PE",
        name: t("Peru")
    },
    {
        code: "PH",
        name: t("Philippines")
    },
    {
        code: "PN",
        name: t("Pitcairn Islands")
    },
    {
        inEU: !0,
        code: "PL",
        name: t("Poland")
    },
    {
        inEU: !0,
        code: "PT",
        name: t("Portugal")
    },
    {
        code: "PR",
        name: t("Puerto Rico")
    },
    {
        code: "QA",
        name: t("Qatar")
    },
    {
        code: "CI",
        name: t("Republic of Côte d'Ivoire")
    },
    {
        code: "RE",
        name: t("Reunion")
    },
    {
        inEU: !0,
        code: "RO",
        name: t("Romania")
    },
    {
        code: "RU",
        name: t("Russia")
    },
    {
        code: "RW",
        name: t("Rwanda")
    },
    {
        code: "XS",
        name: t("Saba")
    },
    {
        code: "SH",
        name: t("Saint Helena, Ascension and Tristan da Cunha")
    },
    {
        code: "WS",
        name: t("Samoa")
    },
    {
        code: "SM",
        name: t("San Marino")
    },
    {
        code: "ST",
        name: t("São Tomé and Príncipe")
    },
    {
        code: "SA",
        name: t("Saudi Arabia")
    },
    {
        code: "SN",
        name: t("Senegal")
    },
    {
        code: "RS",
        name: t("Serbia")
    },
    {
        deprecated: !0,
        code: "YU",
        name: t("Serbia, Montenegro")
    },
    {
        code: "SC",
        name: t("Seychelles")
    },
    {
        code: "SL",
        name: t("Sierra Leone")
    },
    {
        code: "SG",
        name: t("Singapore")
    },
    {
        code: "XE",
        name: t("Sint Eustatius")
    },
    {
        code: "SX",
        name: t("Sint Maarten")
    },
    {
        inEU: !0,
        code: "SK",
        name: t("Slovakia")
    },
    {
        inEU: !0,
        code: "SI",
        name: t("Slovenia")
    },
    {
        code: "SB",
        name: t("Solomon Islands")
    },
    {
        code: "SO",
        name: t("Somalia")
    },
    {
        code: "ZA",
        name: t("South Africa")
    },
    {
        code: "GS",
        name: t("South Georgia and the South Sandwich Islands")
    },
    {
        inEU: !0,
        code: "ES",
        name: t("Spain")
    },
    {
        code: "LK",
        name: t("Sri Lanka")
    },
    {
        code: "BL",
        name: t("St. Barthélemy")
    },
    {
        code: "KN",
        name: t("St. Kitts and Nevis")
    },
    {
        code: "LC",
        name: t("St. Lucia")
    },
    {
        code: "MF",
        name: t("St. Martin")
    },
    {
        code: "PM",
        name: t("St. Pierre and Miquelon")
    },
    {
        code: "VC",
        name: t("St. Vincent and the Grenadines")
    },
    {
        code: "SD",
        name: t("Sudan")
    },
    {
        code: "SR",
        name: t("Suriname")
    },
    {
        code: "SZ",
        name: t("Swaziland")
    },
    {
        inEU: !0,
        code: "SE",
        name: t("Sweden")
    },
    {
        code: "CH",
        name: t("Switzerland")
    },
    {
        code: "SY",
        name: t("Syria")
    },
    {
        code: "TW",
        name: t("Taiwan")
    },
    {
        code: "TJ",
        name: t("Tajikistan")
    },
    {
        code: "TZ",
        name: t("Tanzania")
    },
    {
        code: "TH",
        name: t("Thailand")
    },
    {
        code: "TL",
        name: t("Timor-Leste")
    },
    {
        deprecated: !0,
        code: "TP",
        name: t("Timor-Leste (East Timor)")
    },
    {
        code: "TG",
        name: t("Togo")
    },
    {
        code: "TK",
        name: t("Tokelau")
    },
    {
        code: "TO",
        name: t("Tonga")
    },
    {
        code: "TT",
        name: t("Trinidad and Tobago")
    },
    {
        deprecated: !0,
        code: "TA",
        name: t("Tristan da Cunha")
    },
    {
        code: "TN",
        name: t("Tunisia")
    },
    {
        code: "TR",
        name: t("Turkey")
    },
    {
        code: "TM",
        name: t("Turkmenistan")
    },
    {
        code: "TC",
        name: t("Turks and Caicos Islands")
    },
    {
        code: "TV",
        name: t("Tuvalu")
    },
    {
        code: "UG",
        name: t("Uganda")
    },
    {
        code: "UA",
        name: t("Ukraine")
    },
    {
        code: "AE",
        name: t("United Arab Emirates")
    },
    {
        inEU: !0,
        code: "UK",
        name: t("United Kingdom")
    },
    {
        code: "US",
        name: t("United States")
    },
    {
        code: "UM",
        name: t("United States Minor Outlying Islands")
    },
    {
        code: "UY",
        name: t("Uruguay")
    },
    {
        code: "UZ",
        name: t("Uzbekistan")
    },
    {
        code: "VU",
        name: t("Vanuatu")
    },
    {
        code: "VE",
        name: t("Venezuela")
    },
    {
        code: "VN",
        name: t("Vietnam")
    },
    {
        code: "VG",
        name: t("Virgin Islands, British")
    },
    {
        code: "VI",
        name: t("Virgin Islands, U.S.")
    },
    {
        code: "WF",
        name: t("Wallis and Futuna")
    },
    {
        code: "YE",
        name: t("Yemen")
    },
    {
        code: "ZM",
        name: t("Zambia")
    },
    {
        code: "ZW",
        name: t("Zimbabwe")
    }],
    r = function() {
        function t() {}
        return Object.defineProperty(t.prototype, "countries", {
            get: function() {
                function t() {
                    return e.copy(n)
                }
                return t
            } (),
            enumerable: !0,
            configurable: !0
        }),
        t
    } ();
    e.module("WVS").service("axGeo", r)
} (angular),
function(e) {
    "use strict";
    var t = e.isDefined,
    n = e.isFunction,
    r = function() {
        function r(r, i, o, a, s, c, u) {
            var l = this;
            this.$http = r,
            this.$log = i,
            this.$q = o,
            this.$timeout = a,
            this.gettext = s,
            this.axEscapeHtmlFilter = c,
            this.axConstant = u,
            this.upload = function(r, i, o, a, s) {
                function c(t, r, i, o, a) {
                    return void 0 === i && (i = 0),
                    i = ~~i,
                    u(r, i).then(function(s) {
                        var u = {
                            timeout: o,
                            transformRequest: [],
                            headers: {
                                "Content-Disposition": 'attachment; filename="' + encodeURIComponent(r.name) + '"',
                                "Content-Type": "application/octet-stream",
                                "Content-Range": "bytes " + s.from + "-" + s.to + "/" + s.totalLength
                            }
                        };
                        return p.post(t, new Uint8Array(s.buffer), u).then(function() {
                            n(a) && a({
                                uploadedBytes: s.to + 1,
                                totalBytes: r.size,
                                from: s.from,
                                to: s.to,
                                uploadURL: t
                            })
                        }).then(function() {
                            var e = g.defer();
                            return h(e.resolve, 100),
                            e.promise
                        }).then(function() {
                            if (s.to < r.size - 1) return c(t, r, i + s.bufferLength, o, a)
                        }).
                        catch(function(t) {
                            var n = t.data;
                            return n && e.isString(n.message) && (t.errorMessage = v(_.upperFirst(n.message + "."))),
                            g.reject(t)
                        })
                    })
                }

                function u(e, n) {
                    return g.when().then(function() {
                        var r = g.defer(),
                        i = new FileReader,
                        o = e.slice(n, n + s);
                        return i.onload = function(i) {
                            var o = i.target.error;
                            if (o) return f.debug("Upload error [file_read]: ", o),
                            void r.reject(o);
                            var a = i.target.result,
                            s = t(a.byteLength) ? a.byteLength: a.length,
                            c = {
                                buffer: a,
                                bufferLength: s,
                                from: n,
                                to: n + s - 1,
                                totalLength: e.size
                            };
                            r.resolve(c)
                        },
                        i.readAsArrayBuffer(o),
                        r.promise
                    })
                }
                void 0 === o && (o = 0),
                void 0 === a && (a = l.axConstant.UPLOAD_TIMEOUT),
                void 0 === s && (s = l.axConstant.UPLOAD_CHUNK_SIZE);
                var d = l,
                p = d.$http,
                f = d.$log,
                g = d.$q,
                h = d.$timeout,
                m = d.gettext,
                v = d.axEscapeHtmlFilter,
                y = g.defer(),
                S = g.defer(),
                T = e.extend(y.promise, {
                    cancel: function() {
                        function e(e) {
                            y.reject(e ? {
                                reason: e
                            }: {
                                message: m("The operation has been cancelled")
                            }),
                            S.resolve()
                        }
                        return e
                    } ()
                }),
                x = h(S.resolve, 1e3 * a);
                return T.
                finally(function() {
                    h.cancel(x)
                }),
                c(r, i, o, S.promise,
                function(e) {
                    return y.notify(e)
                }).then(y.resolve, y.reject),
                T
            }
        }
        return r.$inject = ["$http", "$log", "$q", "$timeout", "gettext", "axEscapeHtmlFilter", "axConstant"],
        r
    } ();
    e.module("WVS").service("axFileUploadService", r)
} (angular),
function(e, t) {
    "use strict";
    var n = function() {
        function n(e, t) {
            this.$rootScope = e,
            this.axConstant = t,
            this._currentSession = null
        }
        return n.$inject = ["$rootScope", "axConstant"],
        n.prototype.get = function(n) {
            return e.isString(n) ? t.get(this._currentSession, n, null) : this._currentSession
        },
        n.prototype.hasFeature = function(e) {
            return !! this._currentSession && this._currentSession.features[e]
        },
        n.prototype.hasPermission = function(e) {
            return !! this._currentSession && this._currentSession.permissions[e]
        },
        n.prototype.set = function(t) {
            var n = this,
            r = this,
            i = r.$rootScope,
            o = r.axConstant;
            if (this._currentSession = t ? e.copy(t) : null, this._currentSession) {
                Object.defineProperty(this._currentSession, "isMasterAccount", {
                    value: !this._currentSession.isChildAccount,
                    writable: !1
                }),
                Object.defineProperty(this._currentSession, "isTechAdmin", {
                    value: "tech_admin" === this._currentSession.role,
                    writable: !1
                }),
                Object.defineProperty(this._currentSession, "isAuditor", {
                    value: "auditor" === this._currentSession.role,
                    writable: !1
                }),
                Object.defineProperty(this._currentSession, "isTester", {
                    value: "tester" === this._currentSession.role,
                    writable: !1
                });
                var a = (this._currentSession.isSysAccount, this._currentSession.isMasterAccount),
                s = this._currentSession.isTechAdmin,
                c = s && this._currentSession.accessAllGroups,
                u = this._currentSession.isTester,
                l = function(e) {
                    return (n._currentSession && n._currentSession.license && n._currentSession.license.features ? n._currentSession.license.features.indexOf(e) : -1) > -1
                },
                d = {
                    addTarget: a || c,
                    targetConfig: a || s,
                    addToGroup: a || c,
                    addGroup: a || c,
                    editGroup: a || c,
                    removeGroup: a || c,
                    changeGroupMembership: a || c,
                    removeTarget: a || s,
                    viewLicenseKey: a,
                    removeScan: a || s,
                    stopScan: a || s || u,
                    scheduleScan: a || s || u,
                    createIssue: a || s || u,
                    systemConfig: a,
                    childUsers: a,
                    viewIssueTrackers: a || s,
                    manageExcludedHours: a || c,
                    changeDefaultExcludedHoursProfile: a,
                    generateComplianceReport: l("compliance_reports"),
                    generateWafExport: l("export_waf"),
                    businessCriticality: l("target_business_criticality")
                },
                p = {
                    apikey: l("api_key"),
                    acumonitor: l("acumonitor"),
                    bug_tracking_integration: l("bug_tracking_integration"),
                    compliance_reports: l("compliance_reports"),
                    continuous_scans: l("continuous_scans"),
                    export_waf: l("export_waf"),
                    multi_user: l("multi_user"),
                    scanning_profiles: l("scanning_profiles"),
                    target_business_criticality: l("target_business_criticality"),
                    target_groups: l("target_groups"),
                    trending_graphs: l("trending_graphs"),
                    updates: l("updates"),
                    vuln_retest: l("vuln_retest"),
                    multi_engine: l("multi_engine")
                };
                Object.defineProperty(this._currentSession, "permissions", {
                    writable: !1,
                    value: d
                }),
                Object.defineProperty(this._currentSession, "features", {
                    writable: !1,
                    value: p
                })
            }
            i.$emit(o.API_EVENTS.CURRENT_USER_IDENTITY_UPDATED, {
                identity: this._currentSession ? e.copy(this._currentSession) : null
            })
        },
        n
    } ();
    e.module("WVS").service("CurrentUser", n)
} (angular, _),
function(e) {
    "use strict";
    var t = e.identity,
    n = {
        API_BASE_PATH: "/api/v1",
        API_AUTH_HEADER: "X-Auth",
        API_CACHE_CAPACITY: 10,
        API_REQUEST_TIMEOUT: 3e4,
        BSID: "BSID",
        MIS: "MIS",
        PROMISE_TRACKER_ACTIVATION_DELAY: 0,
        ERROR_CODES: Object.freeze({
            AUTH_REQUIRED: "auth-required"
        }),
        SYI_ERROR_CODES: Object.freeze({
            FEATURE_NOT_ALLOWED: 1,
            AX_CHILD_USERS_REACHED: 2,
            LICENSE_NOT_ACTIVATED: 3,
            LICENSE_EXPIRED: 4,
            FEATURE_REQUIRES_ACTIVATION: 5,
            INVALID_FILTER: 16,
            DB_CONNECTION_ERROR: 100,
            MI_NOT_FROM_LOCALHOST: 64,
            MI_NO_SESSION_ID: 65,
            MI_RECURRENT_SCANS_NOT_ALLOWED: 66,
            MI_ONLY_SCAN_NOW_ALLOWED: 67,
            MI_SCAN_NOW_NOT_POSSIBLE_TARGET_EXCLUDED_HOURS: 67,
            MI_SCAN_NOW_NOT_POSSIBLE_SYSTEM_EXCLUDED_HOURS: 68,
            MI_CONTINUOUS_MODE_NOT_SUPPORTED: 69
        }),
        BUSINESS_CRITICALITY: Object.freeze([{
            value: "30",
            text: t("关键")
        },
        {
            value: "20",
            text: t("高")
        },
        {
            value: "10",
            text: t("一般")
        },
        {
            value: "0",
            text: t("低")
        }]),
        THREAT_LEVEL: Object.freeze([{
            value: "3",
            text: t("高危")
        },
        {
            value: "2",
            text: t("中危")
        },
        {
            value: "1",
            text: t("低危")
        },
        {
            value: "0",
            text: t("信息")
        }]),
        USER_ROLE: Object.freeze([{
            value: "tech_admin",
            text: t("技术管理员")
        },
        {
            value: "tester",
            text: t("测试员")
        },
        {
            value: "auditor",
            text: t("审计")
        }]),
        VULN_SEVERITY_LEVEL: Object.freeze([{
            value: "3",
            text: t("高危")
        },
        {
            value: "2",
            text: t("中危")
        },
        {
            value: "1",
            text: t("低危")
        },
        {
            value: "0",
            text: t("信息")
        }]),
        VULN_STATUS: Object.freeze([{
            value: "open",
            text: t("已确认")
        },
        {
            value: "fixed",
            text: t("已修复")
        },
        {
            value: "ignored",
            text: t("已忽略")
        },
        {
            value: "rediscovered",
            text: t("再次发现")
        },
        {
            value: "false_positive",
            text: t("误报")
        }]),
        CVSS_SCORE: Object.freeze([{
            value: "7",
            text: t("7 或更高")
        },
        {
            value: "4-7",
            text: t("介于4 到 7")
        },
        {
            value: "4",
            text: t("小于 4")
        }]),
        SCAN_STATUS: Object.freeze([{
            value: "aborted",
            text: t("终止")
        },
        {
            value: "aborting",
            text: t("终止中")
        },
        {
            value: "completed",
            text: t("完成")
        },
        {
            value: "continuous",
            text: t("重复中")
        },
        {
            value: "failed",
            text: t("失败")
        },
        {
            value: "processing",
            text: t("运行中")
        },
        {
            value: "queued",
            text: t("队列中")
        },
        {
            value: "scheduled",
            text: t("已列入计划")
        },
        {
            value: "starting",
            text: t("开始中")
        }]),
        SCHEDULE_TYPE: Object.freeze([{
            value: "instant",
            text: t("即时")
        },
        {
            value: "future",
            text: t("将要扫描")
        },
        {
            value: "recurrent",
            text: t("频繁")
        },
        {
            value: "continuous",
            text: t("持续扫描")
        }]),
        REPORT_STATUS: Object.freeze([{
            value: "queued",
            text: t("排队中")
        },
        {
            value: "processing",
            text: t("进行中")
        },
        {
            value: "completed",
            text: t("已完成")
        },
        {
            value: "failed",
            text: t("失败")
        }]),
        REPORT_SOURCE: Object.freeze([{
            value: "all_vulnerabilities",
            text: t("所有漏洞报告")
        },
        {
            value: "targets",
            text: t("目标报告")
        },
        {
            value: "scans",
            text: t("扫描报告")
        },
        {
            value: "scan_result",
            text: t("扫描结果报告")
        },
        {
            value: "vulnerabilities",
            text: t("目标漏洞报告")
        },
        {
            value: "scan_vulnerabilities",
            text: t("漏洞扫描报告")
        }]),
        SCAN_SPEED: Object.freeze([{
            numericValue: 1,
            value: "sequential",
            text: t("最慢")
        },
        {
            numericValue: 2,
            value: "slow",
            text: t("慢")
        },
        {
            numericValue: 3,
            value: "moderate",
            text: t("适度")
        },
        {
            numericValue: 4,
            value: "fast",
            text: t("快")
        }]),
        DEFAULT_UI_LANGUAGE: "en_GB",
        LIST_PAGE_SIZE: void 0,
        LIST_REFRESH_INTERVAL: 1e3,
        LOGIN_SEQUENCE_MAX_SIZE: 65535,
        NOTIFICATIONS_POLL_INTERVAL: 3e4,
        VERSION_CHECK_INTERVAL: 36e5,
        DASH_REFRESH_INTERVAL: 1e4,
        // Interval upon which to refresh license information
        LICENSE_CHECK_INTERVAL: 3e5,
        LICENSE_EXPIRY_DAYS: 15,
        EVENT_TYPES_MAP: Object.freeze([{
            //待汉化
            typeId: "0",
            typeName: t("Created"),
            groupKey: "account",
            groupName: t("Account")
        },
        {
            typeId: "1",
            typeName: t("Details Modified"),
            groupKey: "account",
            groupName: t("Account")
        },
        {
            typeId: "2",
            typeName: t("Email Change Asked"),
            groupKey: "account",
            groupName: t("Account")
        },
        {
            typeId: "3",
            typeName: t("Email Changed"),
            groupKey: "account",
            groupName: t("Account")
        },
        {
            typeId: "4",
            typeName: t("Password Reset Asked"),
            groupKey: "account",
            groupName: t("Account")
        },
        {
            typeId: "5",
            typeName: t("Password Reset"),
            groupKey: "account",
            groupName: t("Account")
        },
        {
            typeId: "6",
            typeName: t("Password Changed"),
            groupKey: "account",
            groupName: t("Account")
        },
        {
            typeId: "7",
            typeName: t("Account Verified"),
            groupKey: "account",
            groupName: t("Account")
        },
        {
            typeId: "8",
            typeName: t("Login"),
            groupKey: "account",
            groupName: t("Account")
        },
        {
            typeId: "9",
            typeName: t("Logout"),
            groupKey: "account",
            groupName: t("Account")
        },
        {
            typeId: "100",
            typeName: t("Created"),
            groupKey: "child_account",
            groupName: t("Child Account")
        },
        {
            typeId: "101",
            typeName: t("Deleted"),
            groupKey: "child_account",
            groupName: t("Child Account")
        },
        {
            typeId: "102",
            typeName: t("Modified"),
            groupKey: "child_account",
            groupName: t("Child Account")
        },
        {
            typeId: "103",
            typeName: t("Set Access"),
            groupKey: "child_account",
            groupName: t("Child Account")
        },
        {
            typeId: "200",
            typeName: t("Created"),
            groupKey: "target",
            groupName: t("Target")
        },
        {
            typeId: "201",
            typeName: t("Modified"),
            groupKey: "target",
            groupName: t("Target")
        },
        {
            typeId: "202",
            typeName: t("Deleted"),
            groupKey: "target",
            groupName: t("Target")
        },
        {
            typeId: "203",
            typeName: t("Add Allowed Host"),
            groupKey: "target",
            groupName: t("Target")
        },
        {
            typeId: "204",
            typeName: t("Remove Allowed Host"),
            groupKey: "target",
            groupName: t("Target")
        },
        {
            typeId: "205",
            typeName: t("Not Responsive"),
            groupKey: "target",
            groupName: t("Target")
        },
        {
            typeId: "206",
            typeName: t("Validated"),
            groupKey: "target",
            groupName: t("Target")
        },
        {
            typeId: "207",
            typeName: t("Verification Succeeded"),
            groupKey: "target",
            groupName: t("Target")
        },
        {
            typeId: "208",
            typeName: t("Verification Failed"),
            groupKey: "target",
            groupName: t("Target")
        },
        {
            typeId: "209",
            typeName: t("Continuous Mode Disabled"),
            groupKey: "target",
            groupName: t("Target"),
            notification: !0
        },
        {
            typeId: "300",
            typeName: t("Created"),
            groupKey: "group",
            groupName: t("Group")
        },
        {
            typeId: "301",
            typeName: t("Deleted"),
            groupKey: "group",
            groupName: t("Group")
        },
        {
            typeId: "302",
            typeName: t("Modified"),
            groupKey: "group",
            groupName: t("Group")
        },
        {
            typeId: "303",
            typeName: t("Targets Modified"),
            groupKey: "group",
            groupName: t("Group")
        },
        {
            typeId: "400",
            typeName: t("Scheduled"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "401",
            typeName: t("Modified"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "402",
            typeName: t("Deleted"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "403",
            typeName: t("Started"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "404",
            typeName: t("Done"),
            groupKey: "scan",
            groupName: t("Scan"),
            notification: !0
        },
        {
            typeId: "405",
            typeName: t("Failed"),
            groupKey: "scan",
            groupName: t("Scan"),
            notification: !0
        },
        {
            typeId: "406",
            typeName: t("User Aborted"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "407",
            typeName: t("Recurrence Suspended"),
            groupKey: "scan",
            groupName: t("Scan"),
            notification: !0
        },
        {
            typeId: "410",
            typeName: t("Job Starting"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "411",
            typeName: t("Job Completed"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "412",
            typeName: t("Job Failed"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "413",
            typeName: t("Job Aborted"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "420",
            typeName: t("Scanner Event"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "430",
            typeName: t("Crawler Memory Limit Reached"),
            groupKey: "scan",
            groupName: t("Scan"),
            notification: !0
        },
        {
            typeId: "431",
            typeName: t("Aborted by Scanner"),
            groupKey: "scan",
            groupName: t("Scan"),
            notification: !0
        },
        {
            typeId: "432",
            typeName: t("AcuSensor Found"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "433",
            typeName: t("AcuSensor Not Found"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "434",
            typeName: t("Automatic login failed"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "435",
            typeName: t("Invalid HTTP Credentials"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "436",
            typeName: t("Login Sequence Required"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "437",
            typeName: t("Crawling"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "438",
            typeName: t("Deep Scan"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "439",
            typeName: t("Scan Started"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "440",
            typeName: t("Scan Finished"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "441",
            typeName: t("Manual Intervention"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "442",
            typeName: t("Scan Resumed"),
            groupKey: "scan",
            groupName: t("Scan")
        },
        {
            typeId: "500",
            typeName: t("Marked As"),
            groupKey: "vulnerability",
            groupName: t("Vulnerability")
        },
        {
            typeId: "501",
            typeName: t("Rediscovered"),
            groupKey: "vulnerability",
            groupName: t("Vulnerability")
        },
        {
            typeId: "502",
            typeName: t("Discovered by AcuMonitor"),
            groupKey: "vulnerability",
            groupName: t("Vulnerability"),
            notification: !0
        },
        {
            typeId: "600",
            typeName: t("Asked"),
            groupKey: "report",
            groupName: t("Report")
        },
        {
            typeId: "601",
            typeName: t("Created"),
            groupKey: "report",
            groupName: t("Report"),
            notification: !0
        },
        {
            typeId: "602",
            typeName: t("Asked"),
            groupKey: "export",
            groupName: t("Export")
        },
        {
            typeId: "603",
            typeName: t("Created"),
            groupKey: "export",
            groupName: t("Export"),
            notification: !0
        },
        {
            typeId: "604",
            typeName: t("Failed"),
            groupKey: "report",
            groupName: t("Report"),
            notification: !0
        },
        {
            typeId: "605",
            typeName: t("Failed"),
            groupKey: "export",
            groupName: t("Export"),
            notification: !0
        },
        {
            typeId: "700",
            typeName: t("New Version"),
            groupKey: "application",
            groupName: t("Application"),
            notification: !0
        },
        {
            typeId: "800",
            typeName: t("Detached"),
            groupKey: "worker",
            groupName: t("Scanning Engine"),
            notification: !0
        },
        {
            typeId: "801",
            typeName: t("Offline"),
            groupKey: "worker",
            groupName: t("Scanning Engine"),
            notification: !0
        }]),
        EVENT_SEVERITY: Object.freeze([{
            text: t("Informational"),
            value: "0"
        },
        {
            text: t("Warning"),
            value: "1"
        },
        {
            text: t("Error"),
            value: "2"
        },
        {
            text: t("Critical"),
            value: "3"
        }]),
        EVENT_RESOURCE_TYPE: Object.freeze([{
            text: t("Child User"),
            value: "2"
        },
        {
            text: t("Export"),
            value: "10"
        },
        {
            text: t("Group"),
            value: "4"
        },
        {
            text: t("Report"),
            value: "7"
        },
        {
            text: t("Scan"),
            value: "5"
        },
        {
            text: t("Scan Session"),
            value: "6"
        },
        {
            text: t("Target"),
            value: "3"
        },
        {
            text: t("User"),
            value: "1"
        },
        {
            text: t("Vulnerability"),
            value: "9"
        },
        {
            text: t("Worker"),
            value: "8"
        }]),
        API_EVENTS: Object.freeze({
            USER_LOGGED_IN: "ax/User/LoggedIn",
            USER_LOGGED_OUT: "ax/User/LoggedOut",
            CURRENT_USER_IDENTITY_UPDATED: "ax/CurrentUser/Identity/Updated",
            USER_PROFILE_UPDATED: "ax/User/Profile/Updated",
            TARGET_CREATED: "ax/Target/Created",
            TARGET_UPDATED: "ax/Target/Updated",
            TARGET_DELETED: "ax/Target/Deleted",
            TARGET_CONTINUOUS_SCAN_STATUS_CHANGED: "ax/Target/ContinuousScanStatusChanged",
            ISSUE_TRACKER_CREATED: "ax/IssueTracker/Created",
            ISSUE_TRACKER_DELETED: "ax/IssueTracker/Deleted",
            TARGET_GROUP_CREATED: "ax/TargetGroup/Created",
            TARGET_GROUP_UPDATED: "ax/TargetGroup/Updated",
            TARGET_GROUP_DELETED: "ax/TargetGroup/Deleted",
            SCAN_CREATED: "ax/Scans/Created",
            SYSTEM_INFO_LOADED: "ax/SystemInfo/Loaded"
        }),
        PRODUCT_ACTIVATION_REQUIRED: "ax/ProductActivation/Required",
        BUG_TRACKERS: Object.freeze([{
            text: t("GitHub"),
            value: "github"
        },
        {
            text: t("JIRA"),
            value: "jira"
        },
        {
            text: t("TFS"),
            value: "tfs"
        }]),
        JIRA_BUG_TRACKER_AUTH: Object.freeze([{
            text: t("Cookie-Based"),
            value: "cookie"
        },
        {
            text: t("HTTP Basic Authentication"),
            value: "http_basic"
        }]),
        LICENSE_FEATURES: [{
            text: t("AcuMonitor"),
            value: "acumonitor"
        },
        {
            text: t("Bug跟踪集成"),
            value: "bug_tracking_integration"
        },
        {
            text: t("合规报告"),
            value: "compliance_reports"
        },
        {
            text: t("连续扫描"),
            value: "continuous_scans"
        },
        {
            text: t("Export WAF"),
            value: "export_waf"
        },
        {
            text: t("多用户"),
            value: "multi_user"
        },
        {
            text: t("产品更新"),
            value: "updates"
        },
        {
            text: t("目标业务临界性"),
            value: "target_business_criticality"
        },
        {
            text: t("目标组"),
            value: "target_groups"
        },
        {
            text: t("趋势图"),
            value: "trending_graphs"
        }],
        PRODUCT_EDITION: Object.freeze([{
            text: t("试用版"),
            value: "TRIAL"
        },
        {
            text: t("标准版"),
            value: "WVSE"
        },
        {
            text: t("专业版"),
            value: "WVSC"
        },
        {
            text: t("企业版"),
            value: "WVSC10"
        },
        {
            text: t("企业版"),
            value: "WVSF05Q"
        },
        {
            text: t("企业版"),
            value: "WVSF10Q"
        },
        {
            text: t("测试版"),
            value: "WVSPOC"
        },
        {
            text: t("服务提供商许可证"),
            value: "WVSSPL"
        }].concat([])),
        SMTP_SECURITY_OPTION: Object.freeze([{
            value: "none",
            text: t("无")
        },
        {
            value: "auto",
            text: t("自动")
        },
        {
            value: "ssl",
            text: t("SSL")
        },
        {
            value: "tls",
            text: t("TLS")
        }]),
        PROXY_PROTOCOL_OPTION: Object.freeze([{
            value: "none",
            text: t("无")
        },
        {
            value: "http",
            text: t("HTTP")
        }]),
        HELP_LINKS: Object.freeze({
            "targets.list": "https://www.acunetix.com/support/docs/wvs/configuring-targets",
            "target.general": "https://www.acunetix.com/support/docs/wvs/configuring-targets/#id.xel0jag02o81",
            "target.crawl": "https://www.acunetix.com/support/docs/wvs/configuring-targets/#id.tqnek5x7fof",
            "target.http": "https://www.acunetix.com/support/docs/wvs/configuring-targets/#id.tqnek5x7fof",
            "target.advanced": "https://www.acunetix.com/support/docs/wvs/configuring-targets/#id.tqnek5x7fof",
            "vulns.list": "https://www.acunetix.com/support/docs/wvs/managing-vulnerabilities/",
            "scans.list": "https://www.acunetix.com/support/docs/wvs/scanning-website/",
            "scan.stats": "https://www.acunetix.com/support/docs/wvs/analyzing-scan-results/#id.djrdugpogazq",
            "scan.vulns": "https://www.acunetix.com/support/docs/wvs/analyzing-scan-results/#id.q7r4wqfaiqrt",
            "scan.crawl": "https://www.acunetix.com/support/docs/wvs/analyzing-scan-results/#id.lbyyspbkedis",
            "scan.events": "https://www.acunetix.com/support/docs/wvs/analyzing-scan-results/#id.ru3cyx3k2ozx",
            "reports.generate": "https://www.acunetix.com/support/docs/wvs/generating-reports/",
            "reports.templates": "https://www.acunetix.com/support/docs/types-reports/",
            settings: "https://www.acunetix.com/support/docs/wvs/acunetix-settings/",
            "settings.updates": "https://www.acunetix.com/support/docs/wvs/acunetix-settings/#id.4ckpaipw8a0x",
            "settings.proxy": "https://www.acunetix.com/support/docs/wvs/acunetix-settings/#id.2ee9eekoaoyr",
            "settings.notifications": "https://www.acunetix.com/support/docs/wvs/acunetix-settings/#id.b2e5l899wu6p",
            "settings.users": "https://www.acunetix.com/support/docs/wvs/configuring-users/",
            "settings.groups": "https://www.acunetix.com/support/docs/wvs/acunetix-settings/#id.9sbqrtmj2h5"
        }),
        UPLOAD_CHUNK_SIZE: 1048576,
        UPLOAD_TIMEOUT: 30,
        TEST_WEBSITES: Object.freeze([{
            url: "http://testhtml5.vulnweb.com",
            sensor: !1
        },
        {
            url: "http://testphp.vulnweb.com",
            sensor: !0
        },
        {
            url: "http://testasp.vulnweb.com",
            sensor: !1
        },
        {
            url: "http://testaspnet.vulnweb.com",
            sensor: !0
        }]),
        TARGET_TYPE: Object.freeze([{
            value: "default",
            text: t("默认")
        },
        {
            value: "network",
            text: t("Free")
        },
        {
            value: "demo",
            text: t("Demo")
        }])
    };
    e.module("WVS").constant("axConstant", n)
} (angular),
function(e) {
    "use strict";
    var t = function(e, t, n, r, i) {
        return Array.isArray(i) && i.length > 0 && i.forEach(function(n) {
            return t.$on(n,
            function() {
                e.get(r).removeAll()
            })
        }),
        e(r, {
            capacity: n.API_CACHE_CAPACITY
        })
    };
    t.$inject = ["$cacheFactory", "$rootScope", "axConstant", "cacheId", "events"];
    var n = function(e, n) {
        for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
        return e.invoke(t, void 0, {
            cacheId: n,
            events: r
        })
    };
    e.module("WVS").factory("axTargetsCache", ["$injector", "axConstant",
    function(e, t) {
        return n(e, "axTargets", t.API_EVENTS.TARGET_CREATED, t.API_EVENTS.TARGET_DELETED)
    }]).factory("axGroupsCache", ["$injector", "axConstant",
    function(e, t) {
        return n(e, "axGroups", t.API_EVENTS.TARGET_GROUP_CREATED, t.API_EVENTS.TARGET_GROUP_DELETED, t.API_EVENTS.TARGET_GROUP_UPDATED)
    }]).factory("axVulnTypesCache", ["$injector",
    function(e) {
        return n(e, "axVulnTypes")
    }]).factory("axLocationsCache", ["$injector",
    function(e) {
        return n(e, "axLocations")
    }]).factory("axReportTemplatesCache", ["$injector",
    function(e) {
        return n(e, "axReportTemplates")
    }]).factory("axExportTemplatesCache", ["$injector",
    function(e) {
        return n(e, "axExportTemplates")
    }])
} (angular),
function(e, t, n, r) {
    "use strict";

    function i(e, n, i, o, a, s, c, u, l) {
        function d(e) {
            return c.delete("/me/credentials/api-key", 204, e).then(Ge)
        }

        function p(e) {
            return c.get("/me/credentials/api-key", 200, e).then(function(e) {
                return e.data ? e.data.api_key: null
            })
        }

        function f() {
            var e = a.BSID,
            n = s.get(e),
            r = u.get("userId");
            if (!n && r) {
                var i = r + "|" + (new Date).getTime() + Math.random();
                n = t.MD5(i).toString().toLowerCase(),
                s.set(e, n)
            }
            return n
        }

        function g(e) {
            return n.when().then(f).then(function(t) {
                return t ? c.get("/me/manual_intervention/" + t, 200, e) : null
            }).then(function(e) {
                return r.get(e, "data.values", []).map(P)
            })
        }

        function h(t) {
            return c.get("/me", 200, t).then(function(e) {
                return null != e.data ? U(e.data) : null
            }).then(function(e) {
                return null === e ? (o(function() {
                    return i.$emit("axAuthRequired")
                },
                0), n.reject({
                    errorMessage: De("Your session has expired.")
                })) : n.resolve(e)
            }).then(function(s) {
                return l.getSystemInfo(ze(t)).then(function(t) {
                    var c = t.license;
                    return s.license = c,
                    u.set(s),
                    !1 === r.get(s, "license.activated") && o(function() {
                        return i.$emit(a.PRODUCT_ACTIVATION_REQUIRED)
                    },
                    1e3),
                    null === _ && (_ = e(x, a.LICENSE_CHECK_INTERVAL)),
                    n.resolve(s)
                })
            }).
            catch(function(e) {
                return b(),
                n.reject(e)
            })
        }

        function m(e, t) {
            return void 0 === e && (e = "simple"),
            n.when({}).then(function(n) {
                return "simple" === e || "full" === e ? c.get("/me/stats", 200, t).then(function(e) {
                    return Fe(n, k(e.data))
                }) : n
            }).then(function(n) {
                return "trends" === e || "full" === e ? c.get("/me/trends", 200, t).then(function(e) {
                    return Fe(n, ie(e.data))
                }) : n
            })
        }

        function v(e) {
            return c.post("/me/credentials/api-key", {},
            201, e).then(function(e) {
                return r.get(e, "data.api_key", null)
            })
        }

        function y(e, n, r, o) {
            var s = {
                email: e,
                password: 225 === n.length && "3" === n[0] ? n: t.SHA256(n).toString(),
                remember_me: r
            },
            u = Fe({
                noAuthToken: !0,
                noLoginRedirect: !0
            },
            o);
            return c.post("/me/login", s, 204, u).then(function() {
                return h(ze(o))
            }).then(function(e) {
                return i.$emit(a.API_EVENTS.USER_LOGGED_IN, {
                    userProfile: Ue(e)
                }),
                e
            })
        }

        function S(e) {
            return c.post("/me/logout", {},
            204, Fe({
                noLoginRedirect: !0
            },
            e)).
            catch(Ge).then(function() {
                var e = u.get();
                u.set(null),
                i.$emit(a.API_EVENTS.USER_LOGGED_OUT, {
                    previousIdentity: e ? Ue(e) : null
                })
            }).then(Ge)
        }

        function T(e, t) {
            var n = we(e);
            return c.patch("/me", n, 204, t).then(function() {
                return h(ze(t))
            }).then(function(e) {
                return i.$emit(a.API_EVENTS.USER_PROFILE_UPDATED, {
                    userProfile: Ue(e)
                }),
                e
            })
        }

        function x() {
            return h({
                noPublishError: !0,
                noLoadingTracker: !0
            }).then(function() {
                if (null === u.get()) return n.reject()
            }).
            catch(function() {
                null === u.get() && b()
            })
        }

        function b() {
            null !== _ && (e.cancel(_), _ = null)
        }
        this.deleteApiKey = d,
        this.getApiKey = p,
        this.getProfile = h,
        this.getStats = m,
        this.resetApiKey = v,
        this.signIn = y,
        this.signOut = S,
        this.updateProfile = T,
        this.getBSIDValue = f,
        this.getManualInterventionStatus = g;
        var _ = null
    }

    function o(e, t, n, i) {
        function o(t, n) {
            return i.post("/users", ge(t), 201, n).then(function(t) {
                return e.get(t.headers("Location"), ze(n))
            }).then(g(200)).then(function(e) {
                return y(e.data)
            })
        }

        function a(e, t) {
            return i.get("/users/" + e + "/access", 200, t).then(f()).then(function(e) {
                return ae(e.data)
            })
        }

        function s(e, t) {
            return i.get("/users/" + e, [200, 404], t).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t ? null: y(n)
            })
        }

        function c(e, t, n) {
            return i.get("/users", 200, Fe({
                params: Ce(void 0, e, t)
            },
            n)).then(function(e) {
                return {
                    users: r.get(e, "data.users", []).map(y),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        }

        function u(e, t) {
            return i.delete("/users/" + e, 204, t).then(r.constant(null))
        }

        function l(e, t) {
            return i.post("/users/" + e + "/confirmation_email", {},
            204, t).then(r.constant(null))
        }

        function d(e, t, n) {
            return i.post("/users/" + e + "/access", Re(t), 204, n).then(f()).then(r.constant(null))
        }

        function p(e, t) {
            return i.patch("/users/" + e.userId, fe(e), 204, t).then(f()).then(function() {
                return s(e.userId, ze(t))
            })
        }

        function f(e) {
            return void 0 === e && (e = De("The requested user information is not available")),
            function(r) {
                return 404 === r.status ? (r.errorMessage = e, !0 !== r.config.noPublishError && n.$emit("axError", r), t.reject(r)) : r
            }
        }
        this.addUser = o,
        this.getAccess = a,
        this.getUser = s,
        this.getUsers = c,
        this.removeUser = u,
        this.resendConfirmationEmail = l,
        this.setAccess = d,
        this.updateUser = p
    }

    function a(e, t, n, i) {
        function o(t, n) {
            return i.post("/excluded_hours_profiles", he(t), 201, n).then(function(t) {
                return e.get(t.headers("Location"), ze(n))
            }).then(function(e) {
                return _(e.data)
            })
        }

        function a(e, t) {
            return i.get("/excluded_hours_profiles/" + e, 200, t).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t ? null: _(n)
            })
        }

        function s(e) {
            return i.get("/excluded_hours_profiles", 200, e).then(function(e) {
                return r.get(e, "data.values", []).map(_)
            })
        }

        function c(e, t) {
            return i.patch("/excluded_hours_profiles/" + e.excludedHoursId, he(e), 204, t).then(l()).then(function() {
                return a(e.excludedHoursId)
            })
        }

        function u(e, t) {
            return i.delete("/excluded_hours_profiles/" + e, 204, t).then(r.constant(null))
        }

        function l(e) {
            return void 0 === e && (e = De("The requested excluded hours profile is not available")),
            function(r) {
                return 404 === r.status ? (r.errorMessage = e, !0 !== r.config.noPublishError && n.$emit("axError", r), t.reject(r)) : r
            }
        }
        this.createExcludedHoursProfile = o,
        this.getExcludedHoursProfile = a,
        this.getExcludedHoursProfiles = s,
        this.modifyExcludedHoursProfile = c,
        this.removeExcludedHoursProfile = u
    }

    function s(e, t, n, i, o, a) {
        function s(e, t, n, i, a, s) {
            var c = Fe({
                params: Ce(void 0, i, a)
            },
            s);
            return o.get("/scans/" + t + "/results/" + e + "/crawldata/" + n + "/children", 200, c).then(v()).then(function(e) {
                return {
                    locations: e.data.locations.map(S),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        }

        function c(e, t, n, r) {
            return o.get("/scans/" + t + "/results/" + e + "/crawldata/" + n, 200, r).then(v()).then(function(e) {
                return T(e.data)
            })
        }

        function u(e, t, n, i, a, s) {
            var c = Ce(void 0, i, a);
            return o.get("/scans/" + t + "/results/" + e + "/crawldata/" + n + "/vulnerabilities", 200, Fe({
                params: c
            },
            s)).then(v()).then(function(e) {
                return {
                    vulnerabilities: e.data.vulnerabilities.map(de),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        }

        function l(e, t, n, i, a, s) {
            var c = Ce(n, i, a);
            return o.get("/scans/" + t + "/results/" + e + "/vulnerabilities", 200, Fe({
                params: c
            },
            s)).then(v()).then(function(e) {
                return {
                    vulnerabilities: e.data.vulnerabilities.map(de),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        }

        function d(t, n, r, i) {
            return o.get("/scans/" + n + "/results/" + t + "/vulnerabilities/" + r, 200, i).then(v()).then(function(t) {
                var n = t.data;
                return e.invoke(le, void 0, {
                    dto: n
                })
            })
        }

        function p(e, t, n, i, a, s) {
            var c = Ce(n, i, a);
            return o.get("/scans/" + t + "/results/" + e + "/vulnerability_types", 200, Fe({
                params: c
            },
            s)).then(function(e) {
                return {
                    vulnerabilityTypes: r.get(e, "data.vulnerability_types", []).map(z),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        }

        function f(e, t, n) {
            return o.get("/scans/" + e + "/results/" + t + "/statistics", [200, 404], n).then(function(e) {
                return 404 === e.status ? null: K(e.data)
            })
        }

        function h(e, n, r, i) {
            var s = {},
            c = a.getBSIDValue();
            return null !== c && (s.ui_session_id = c),
            o.put("/scans/" + n + "/results/" + e + "/vulnerabilities/" + r + "/recheck", s, 201, i).then(v()).then(function(e) {
                return t.get(e.headers("Location"), ze(i))
            }).then(g(200)).then(function(e) {
                return q(e.data)
            })
        }

        function m(e, t, n, i, a, s) {
            var c = Ce(n, i, a);
            return o.get("/scans/" + t + "/results/" + e + "/crawldata", 200, Fe({
                params: c
            },
            s)).then(v()).then(function(e) {
                return {
                    locations: e.data.locations.map(S),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        }

        function v(e) {
            return void 0 === e && (e = De("The requested scan information is not available")),
            function(t) {
                return 404 === t.status ? (t.errorMessage = e, !0 !== t.config.noPublishError && i.$emit("axError", t), n.reject(t)) : t
            }
        }
        this.getLocationChildren = s,
        this.getLocationDetails = c,
        this.getLocationVulnerabilities = u,
        this.getScanVulnerabilities = l,
        this.getScanVulnerabilityDetails = d,
        this.getScanVulnerabilityTypes = p,
        this.getStatistics = f,
        this.recheckVulnerability = h,
        this.searchCrawlData = m
    }

    function c(e, t, n, i, o) {
        function a(e, n) {
            return o.post("/scanning_profiles", Ae(e), 201, n).then(function(e) {
                return t.get(e.headers("Location"), ze(n))
            }).then(g(200)).then(function(e) {
                return B(e.data)
            })
        }

        function s(e, t) {
            return o.delete("/scanning_profiles/" + e, 204, t).then(r.constant(null))
        }

        function c(e, t) {
            return o.get("/scanning_profiles/" + e, [200, 404], t).then(p()).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t ? null: B(n)
            }).then(function(e) {
                return e && (e.checks.sort(), e.checks.reverse()),
                e
            })
        }

        function u(e) {
            return o.get("/scanning_profiles", 200, Fe(e)).then(function(e) {
                return i(r.get(e, "data.scanning_profiles", []).map(B), "sortOrder")
            })
        }

        function l(e, t) {
            return o.patch("/scanning_profiles/" + e.profileId, Ae(e), [204, 404], t).then(p()).then(function() {
                return c(e.profileId, ze(t))
            })
        }

        function d(e) {
            return t.get("/checks.json", Fe({
                timeout: 5e3,
                cache: !0
            },
            e)).then(p("The requested scan type information is not available")).then(function(e) {
                var t = e.data;
                return function e(t) {
                    if (t.checkType = "wvs", t.keyPath = "/" === t.parentKeyPath ? "" + t.parentKeyPath + t.key: (t.parentKeyPath || "") + "/" + t.key, t.isChecked = !0, t.checks) {
                        t.checks = r.sortBy(t.checks, r.property("title"));
                        for (var n = 0; n < t.checks.length; n++) t.checks[n].checkType = "wvs",
                        t.checks[n].parentKeyPath = t.keyPath,
                        t.checks[n].keyPath = t.keyPath + "/" + t.key,
                        e(t.checks[n])
                    }
                } (t),
                {
                    checks: [t]
                }
            })
        }

        function p(t) {
            return void 0 === t && (t = De("The requested scan type is not available")),
            function(r) {
                return 404 === r.status ? (r.errorMessage = t, !0 !== r.config.noPublishError && n.$emit("axError", r), e.reject(r)) : r
            }
        }
        this.createScanningProfile = a,
        this.deleteScanningProfile = s,
        this.getScanningProfile = c,
        this.getScanningProfiles = u,
        this.getWebScanningChecks = d,
        this.updateScanningProfile = l
    }

    function u(e, t, n, i, o, a, s) {
        function c(e, t) {
            return a.post("/scans/" + e + "/abort", {},
            [204, 404], t).then(function(t) {
                return 404 === t.status ? null: u(e)
            })
        }

        function u(e, t) {
            return a.get("/scans/" + e, [200, 404], t).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t ? null: q(n)
            }).then(function(n) {
                return n && "failed" === r.get(n, "status") ? s.getEvents("type_id:411;resource_type:5;resource_id:" + e, void 0, 5, ze(t)).then(function(e) {
                    var t = e.notifications;
                    if (t.length > 0) {
                        var i = t.find(function(e) {
                            return !! r.get(e, "eventData.extendedStatus.failReason")
                        });
                        i && (n.failReason = i.eventData.extendedStatus.failReason)
                    }
                    return n
                }) : n
            })
        }

        function l(e) {
            var t = e.status,
            n = e.nextRun,
            r = e.schedule,
            i = new Date,
            o = null;
            if ("continuous" === t) o = 6e4;
            else if ("processing" === t || "aborting" === t) o = 3e3;
            else if ("queued" === t) o = 5e3;
            else if ("starting" === t) o = 1e3;
            else if ("scheduled" === t) if (null === r.scheduleDate) o = 3e3;
            else {
                var a = Date.now(),
                s = r.recurrence && n ? n.getTime() : r.scheduleDate.getTime();
                o = s - a < 6e4 ? 3e3: Ye(n, i) ? s - a > 36e5 ? 6e5: s - a <= 18e5 ? 5e3: 3e5: 18e5
            }
            return o
        }

        function d(e, t, n, i) {
            return a.get("/scans/" + e + "/results", 200, Fe({
                params: Ce(void 0, t, n)
            },
            i)).then(y()).then(function(e) {
                var t = D(r.get(e, "data.pagination", Be));
                return {
                    results: e.data.results.map(W),
                    pagination: t
                }
            })
        }

        function p(e, t, n, i) {
            return a.get("/scans", 200, Fe({
                params: Ce(e, t, n)
            },
            i)).then(function(e) {
                return {
                    scans: r.get(e, "data.scans", []).map(q),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        }

        function f(e, t) {
            t = Fe({
                noLoadingTracker: !0,
                noPublishError: !0
            },
            t);
            var i = r.chain(e).map(function(e) {
                return {
                    scan: e,
                    nextRefreshIn: l(e)
                }
            }).filter(function(e) {
                var t = e.scan,
                n = e.nextRefreshIn;
                if (n) {
                    var r = t.$$lastRefreshTime;
                    if (r) {
                        return r + n < +new Date
                    }
                    return ! 0
                }
                return ! 1
            }).value();
            if (i.length > 0) {
                i.length > Ke && i.splice(Ke);
                return p("scan_id:" + i.map(r.property("scan.scanId")).join(","), void 0, void 0, t).then(function(t) {
                    var n = t.scans;
                    return n.forEach(function(t) {
                        var n = e.find(r.matchesProperty("scanId", t.scanId));
                        n && (qe(n, t), n.$$lastRefreshTime = +new Date)
                    }),
                    n
                })
            }
            return n.when([])
        }

        function h(e, t) {
            return a.delete("/scans/" + e, 204, t).then(r.constant(null))
        }

        function m(n, s) {
            return a.post("/scans", e.invoke(_e, void 0, {
                scanRequest: n
            }), 201, s).then(function(e) {
                var n = !!r.get(e, "data.ui_session_id", void 0);
                return t.get(e.headers("Location"), ze(s)).then(g(200)).then(function(e) {
                    var t = q(e.data);
                    return i.$emit(o.API_EVENTS.SCAN_CREATED, {
                        scan: Ue(t),
                        actionRequired: n
                    }),
                    t
                })
            })
        }

        function v(t, n, r) {
            var i = n.schedule,
            o = {
                schedule: e.invoke(ke, void 0, {
                    schedule: i
                })
            };
            return a.patch("/scans/" + t, o, 204, r).then(y()).then(function() {
                return u(t, ze(r))
            })
        }

        function y(e) {
            return void 0 === e && (e = De("The requested scan information is not available")),
            function(t) {
                return 404 === t.status ? (t.errorMessage = e, !0 !== t.config.noPublishError && i.$emit("axError", t), n.reject(t)) : t
            }
        }
        this.abortScan = c,
        this.getScan = u,
        this.getScanNextRefresh = l,
        this.getScanResultHistory = d,
        this.getScans = p,
        this.refreshScans = f,
        this.removeScan = h,
        this.scheduleScan = m,
        this.updateScan = v
    }

    function l(n, i, o, a, s, c) {
        function u(e, t, n) {
            return s.post("/targets/" + e + "/allowed_hosts", {
                target_id: t
            },
            201, n).then(r.constant(null))
        }

        function l(e, t) {
            var r = e.address,
            i = e.description,
            u = e.criticality;
            e.networkOnly; ! 0 !== c.hasFeature("target_business_criticality") && (u = void 0);
            var l;
            return s.post("/targets", {
                address: r,
                description: i,
                criticality: u,
                type: l
            },
            201, t).then(function(e) {
                return n.get(e.headers("Location"), ze(t))
            }).then(g(200)).then(function(e) {
                var t = re(e.data);
                return o.$emit(a.API_EVENTS.TARGET_CREATED, {
                    target: Ue(t)
                }),
                t
            })
        }

        function d(e, t, n) {
            return s.patch("/targets/" + e + "/configuration", Ee(t), 204, n).then(F()).then(function() {
                return w(e, ze(n))
            })
        }

        function p(e, t) {
            return s.delete("/targets/" + e + "/configuration/client_certificate", 204, t).then(r.constant(null))
        }

        function f(e, t, n) {
            return s.delete("/targets/" + e + "/configuration/imports/" + t, 204, n).then(r.constant(null))
        }

        function h(e, t) {
            return s.delete("/targets/" + e + "/configuration/login_sequence", 204, t).then(r.constant(null))
        }

        function m(e, n, i) {
            var o = Fe({},
            {
                noAuthToken: !0
            },
            i);
            return He(n) && n.length > 0 && (n = t.MD5(n)),
            s.get("/targets/sensors/" + e + "/" + n, 200, o).then(r.constant(null))
        }

        function y(e, t) {
            return s.get("/targets/" + e + "/allowed_hosts", 200, t).then(function(e) {
                return {
                    hosts: r.get(e, "data.hosts", []).map(v)
                }
            })
        }

        function S(e, t) {
            return s.get("/targets/" + e + "/configuration/client_certificate", [200, 404], t).then(function(e) {
                return 404 === e.status ? null: I(e.data)
            })
        }

        function T(e, t) {
            return s.get("/targets/" + e + "/continuous_scan", 200, t).then(F()).then(function(e) {
                return e.data.enabled
            })
        }

        function x(e, t) {
            return s.get("/targets/" + e + "/configuration/imports", [200, 404], t).then(function(e) {
                return 404 === e.status ? null: r.get(e, "data.files", []).map(I)
            })
        }

        function b(e, t) {
            return s.get("/targets/" + e + "/configuration/login_sequence", [200, 404], t).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t ? null: I(n)
            })
        }

        function _(t, n) {
            return s.get("/targets/" + t + "/configuration/login_sequence/download", [200, 404], n).then(function(n) {
                if (404 !== n.status && null != n.data && n.headers) {
                    var r = n.headers("Content-Disposition");
                    if (r) {
                        var i = r.split("="),
                        o = i[1];
                        return {
                            filename: He(o) ? o: t + ".lsr",
                            contents: He(n.data) ? n.data: e.toJson(n.data)
                        }
                    }
                }
                return null
            })
        }

        function C(e, t) {
            return s.get("/targets/" + e, [200, 404], t).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t || null == n ? null: re(n)
            })
        }

        function w(e, t) {
            return s.get("/targets/" + e + "/configuration", 200, t).then(F()).then(function(e) {
                return te(e.data)
            })
        }

        function k(e, t, n, i) {
            return s.get("/targets", 200, Fe({
                params: Ce(e, t, n)
            },
            i)).then(function(e) {
                return {
                    targets: r.get(e, "data.targets", []).map(re),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        }

        function A(e, t, n, r) {
            return s.post("/targets/" + e + "/configuration/imports", {
                name: t,
                size: n
            },
            201, r).then(F()).then(function(e) {
                return e.data.upload_url
            })
        }

        function L(e, t, n) {
            return s.delete("/targets/" + e + "/allowed_hosts/" + t, 204, n).then(r.constant(null))
        }

        function $(e, t) {
            return s.delete("/targets/" + e, 204, t).then(function() {
                o.$emit(a.API_EVENTS.TARGET_DELETED, {
                    targetId: e
                })
            }).then(r.constant(null))
        }

        function E(e, t, n) {
            return s.post("/targets/" + e + "/sensor/reset", {
                secret: t
            },
            200, n).then(F()).then(function(e) {
                return e.data.secret
            })
        }

        function R(e, t, n, r) {
            return s.post("/targets/" + e + "/configuration/client_certificate", {
                name: t,
                size: n
            },
            200, r).then(F()).then(function(e) {
                return e.data.upload_url
            })
        }

        function P(e, t, n) {
            return s.post("/targets/" + e + "/continuous_scan", {
                enabled: t
            },
            200, n).then(F()).then(function(t) {
                return o.$emit(a.API_EVENTS.TARGET_CONTINUOUS_SCAN_STATUS_CHANGED, {
                    targetId: e,
                    enabled: t
                }),
                t
            })
        }

        function N(e, t, n, r) {
            return s.post("/targets/" + e + "/configuration/login_sequence", {
                name: t,
                size: n
            },
            200, r).then(F()).then(function(e) {
                return e.data.upload_url
            })
        }

        function U(e, t, n) {
            var r = t.description,
            i = t.criticality;
            t.targetType; ! 0 !== c.hasFeature("target_business_criticality") && (i = void 0);
            var u = {
                description: r,
                criticality: i
            };
            return s.patch("/targets/" + e, u, 204, n).then(F()).then(function() {
                return C(e, ze(n))
            }).then(function(e) {
                return o.$emit(a.API_EVENTS.TARGET_UPDATED, {
                    target: Ue(e)
                }),
                e
            })
        }

        function F(e) {
            return void 0 === e && (e = De("The requested target information is not available")),
            function(t) {
                return 404 === t.status ? (t.errorMessage = e, !0 !== t.config.noPublishError && o.$emit("axError", t), i.reject(t)) : t
            }
        }
        this.addAllowedHost = u,
        this.addTarget = l,
        this.configureTarget = d,
        this.deleteClientCertificate = p,
        this.deleteImportedFile = f,
        this.deleteLoginSequence = h,
        this.downloadSensor = m,
        this.getAllowedHosts = y,
        this.getClientCertificate = S,
        this.getContinuousScanStatus = T,
        this.getImportedFiles = x,
        this.getLoginSequence = b,
        this.getLoginSequenceContents = _,
        this.getTarget = C,
        this.getTargetConfiguration = w,
        this.getTargets = k,
        this.importFile = A,
        this.removeAllowedHost = L,
        this.removeTarget = $,
        this.resetSensorSecret = E,
        this.setClientCertificate = R,
        this.setContinuousScanStatus = P,
        this.setLoginSequence = N,
        this.updateTarget = U
    }

    function d(e, t, n, i, o, a) {
        function s(e, t) {
            return o.put("/vulnerabilities/" + e + "/issue", {},
            204, t).then(h()).then(r.constant(null))
        }

        function c(e, t, n, i) {
            return o.get("/vulnerabilities", 200, Fe({
                params: Fe(Ce(e, t, n))
            },
            i)).then(function(e) {
                return {
                    vulnerabilities: r.get(e, "data.vulnerabilities", []).map(de),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        }

        function u(t, n) {
            return o.get("/vulnerabilities/" + t, 200, n).then(h()).then(function(t) {
                var n = t.data;
                return e.invoke(le, void 0, {
                    dto: n
                })
            })
        }

        function l(e, t, n) {
            return o.put("/vulnerabilities/" + e + "/status", {
                status: t
            },
            204, n).then(h()).then(r.constant(null))
        }

        function d(e, t) {
            return o.get("/vulnerability_types/" + e, 200, t).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t ? null: pe(n)
            })
        }

        function p(e, t, n, i, a) {
            void 0 === e && (e = "default");
            var s = Fe(Ce(t, n, i), {
                v: e
            });
            return o.get("/vulnerability_types", 200, Fe({
                params: s
            },
            a)).then(function(e) {
                return {
                    vulnerabilityTypes: r.get(e, "data.vulnerability_types", []).map(ue),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        }

        function f(e, n) {
            var r = {},
            i = a.getBSIDValue();
            return null !== i && (r.ui_session_id = i),
            o.put("/vulnerabilities/" + e + "/recheck", r, 201, n).then(h()).then(function(e) {
                return t.get(e.headers("Location"), ze(n))
            }).then(g(200)).then(function(e) {
                return q(e.data)
            })
        }

        function h(e) {
            return void 0 === e && (e = De("The requested vulnerability information is not available")),
            function(t) {
                return 404 === t.status ? (t.errorMessage = e, !0 !== t.config.noPublishError && i.$emit("axError", t), n.reject(t)) : t
            }
        }
        this.createIssue = s,
        this.getVulnerabilities = c,
        this.getVulnerabilityDetails = u,
        this.setVulnerabilityStatus = l,
        this.getVulnerabilityType = d,
        this.getVulnerabilityTypes = p,
        this.recheckVulnerability = f
    }

    function p(e) {
        return {
            workerId: e.worker_id,
            scanningApp: e.scanning_app,
            endpoint: e.endpoint,
            description: null == e.description ? "": e.description,
            status: e.status,
            authorization: e.authorization,
            appVersion: e.app_version
        }
    }

    function f(e) {
        return Fe(p(e), {
            statusExtra: e.status_extra,
            maxScans: e.max_scans,
            currentScans: e.current_scans
        })
    }

    function g(e) {
        return function(t) {
            return Me(e) && e.indexOf(t.status) < 0 || Oe(e) && t.status,
            t
        }
    }

    function h(e) {
        if (Oe(e) && (e = e.toString()), /^[0-9]+$/.test(e)) {
            var t = parseInt("20" + e.substr(0, 2), 10),
            n = parseInt(e.substr(2, 3), 10),
            r = new Date(t, 0);
            return r = new Date(r.setDate(n))
        }
        return ""
    }

    function m(e, t, n) {
        var r = [e];
        return "-" !== t && r.push(t),
        "-" !== n && r.push(n),
        r.join(".")
    }

    function v(e) {
        return {
            targetId: e.target_id,
            address: e.address,
            description: e.description
        }
    }

    function y(e) {
        var t = {};
        return t.userId = e.user_id,
        t.accessAllGroups = e.access_all_groups,
        t.confirmationToken = e.confirmation_token,
        t.confirmed = e.confirmed,
        t.email = e.email,
        t.enabled = e.enabled,
        t.firstName = e.first_name,
        t.lastName = e.last_name,
        t.fullName = r.trim(e.first_name + " " + e.last_name),
        t.password = e.password === Xe ? Ze: "",
        t.role = e.role,
        t
    }

    function S(e) {
        var t = {};
        return t.locId = e.loc_id,
        t.name = Qe(e.name),
        t.path = Qe(e.path),
        t.isFile = "file" === e.loc_type,
        t.isFolder = "folder" === e.loc_type,
        t.isPort = "port" === e.loc_type,
        t.isIP = "ip" === e.loc_type,
        t.sourceId = e.source_id,
        t.parentId = e.parent_id,
        t.tags = Me(e.tags) ? e.tags: [],
        t
    }

    function T(e) {
        var t = {};
        return t.locId = e.loc_id,
        t.parentId = e.parent_id,
        t.sourceId = e.source_id,
        t.url = Qe(e.url),
        t.severityCounts = Y(e.severity_counts),
        t.threat = e.threat,
        t
    }

    function x(e) {
        var t = {};
        return t.cookie = e.cookie,
        t.url = e.url,
        t
    }

    function b(e) {
        var t = {};
        return e && (Object.keys(e).forEach(function(n) {
            var i = r.camelCase(n),
            o = e[n];
            t[i] = o && r.isPlainObject(o) ? b(o) : o
        }), Me(t.targetDesc) && 2 === t.targetDesc.length && (t.targetDesc = {
            address: t.targetDesc[0],
            description: t.targetDesc[1]
        })),
        t
    }

    function _(e) {
        var t = {};
        return t.name = e.name,
        t.excludedHoursId = e.excluded_hours_id ? e.excluded_hours_id: "",
        t.timeOffset = e.time_offset,
        t.exclusions = e.exclusion_matrix,
        t
    }

    function C(e) {
        var t = {};
        return t.reportId = e.report_id,
        t.source = {},
        e.source && (t.source.listType = e.source.list_type, t.source.idList = e.source.id_list),
        t.templateId = e.template_id,
        t.templateName = e.template_name,
        t.created = e.generation_date ? new Date(e.generation_date) : null,
        t.status = e.status,
        Me(e.download) && e.download.forEach(function(e) {
            r.endsWith(e, ".pdf") || e.indexOf(".pdf?") > -1 ? t.downloadLinkPDF = e: r.endsWith(e, ".html") || e.indexOf(".html?") > -1 ? t.downloadLinkHTML = e: (r.endsWith(e, ".xml") || e.indexOf(".xml?") > -1) && (t.downloadLinkXML = e)
        }),
        t
    }

    function w(e) {
        var t = {};
        return t.exportTypeId = e.export_id,
        t.name = e.name,
        t.contentType = e.content_type,
        t.acceptedSources = e.accepted_sources,
        t
    }

    function I(e) {
        var t = {};
        return t.uploadId = e.upload_id,
        t.name = e.name,
        t.totalBytes = e.size,
        t.uploadedBytes = e.current_size,
        t.status = e.status,
        t
    }

    function k(e) {
        var t = {};
        return t.waitingScans = e.scans_waiting_count,
        t.openVulns = e.vulnerabilities_open_count,
        t.runningScans = e.scans_running_count,
        t.totalScans = e.scans_conducted_count,
        t.totalTargets = e.targets_count,
        t.mostVulnerableTargets = e.most_vulnerable_targets.map(function(e) {
            return {
                address: e.address,
                targetId: e.target_id,
                criticality: e.criticality,
                highVulns: e.high_vuln_count,
                mediumVulns: e.med_vuln_count
            }
        }).slice(0, 5),
        t.vulnCount = function(e) {
            return {
                high: e.high,
                medium: e.med,
                low: e.low
            }
        } (e.vuln_count),
        t.topVulns = e.top_vulnerabilities.map(function(e) {
            return {
                name: e.name,
                vulnTypeId: e.vt_id,
                severity: e.severity,
                count: e.count
            }
        }).slice(0, 5),
        t.vulnCountByCriticality = function(e) {
            return ["critical", "high", "normal", "low"].reduce(function(t, n) {
                return t[n] = {
                    high: 0,
                    medium: 0,
                    low: 0
                },
                null != e[n] && [{
                    source: "high",
                    dest: "high"
                },
                {
                    source: "med",
                    dest: "medium"
                },
                {
                    source: "low",
                    dest: "low"
                }].forEach(function(r) {
                    t[n][r.dest] = 0,
                    Oe(e[n][r.source]) && (t[n][r.dest] = e[n][r.source])
                }),
                t
            },
            {})
        } (e.vuln_count_by_criticality),
        t
    }

    function A(e) {
        var t;
        switch (e.status) {
        case "in-work":
            t = 1;
            break;
        case "pending":
            t = 2;
            break;
        default:
            t = 0
        }
        return {
            status: t,
            action: e.action
        }
    }

    function L(e) {
        return Fe({
            bugTracker: e.bug_tracker,
            url: e.url,
            project: e.project ? R(e.project) : null,
            issueType: e.issue_type ? E(e.issue_type) : null
        },
        e.auth ? {
            auth: {
                kind: e.auth.kind,
                username: e.auth.user,
                password: e.auth.password
            }
        }: {})
    }

    function $(e) {
        return Fe({
            issueTrackerId: e.issue_tracker_id,
            name: e.name
        },
        L(e))
    }

    function E(e) {
        return {
            issueTypeId: e.issue_id,
            issueTypeName: e.issue_name
        }
    }

    function R(e) {
        return {
            projectId: e.project_id,
            projectName: e.project_name
        }
    }

    function P(e) {
        var t = {};
        return t.uniqueKey = e.index + ":" + e.scanning_app + ":" + e.scan_session_id,
        t.targetId = e.target_id,
        t.targetAddress = r.get(e.target_desc, "[0]", ""),
        t.targetDescription = r.get(e.target_desc, "[1]", ""),
        t.scanId = e.scan_id,
        t.scanSessionId = e.scan_session_id,
        t.scanningApp = e.scanning_app,
        t.data = e.data,
        t.index = e.index,
        t.old = e.old,
        t
    }

    function N(e) {
        return {
            eventId: e.notification_id,
            consumed: e.consumed,
            resourceId: e.resource_id,
            resourceType: e.resource_type,
            eventTypeId: e.type_id,
            userId: e.user_id,
            email: e.email,
            eventData: b(e.data),
            created: new Date(e.created),
            severity: e.severity
        }
    }

    function D(e) {
        var t = {};
        return t.nextCursor = null !== e.next_cursor && void 0 !== e.next_cursor ? e.next_cursor: void 0,
        t.prevCursor = null !== e.previous_cursor && void 0 !== e.previous_cursor ? e.previous_cursor: void 0,
        t
    }

    function U(t) {
        return {
            userId: t.user_id,
            licenseType: t.license_type,
            isChildAccount: t.child_account,
            isMasterAccount: !0 !== t.child_account,
            isSysAccount: "boolean" == typeof t.su && t.su,
            email: t.email,
            companyName: e.isString(t.company) ? t.company: "",
            companyWebsite: e.isString(t.website) ? t.website: "",
            contactPhone: e.isString(t.phone) ? t.phone: "",
            countryCode: "GB" === t.country ? "UK": t.country,
            notifications: ce(t.notifications),
            firstName: t.first_name,
            lastName: t.last_name,
            role: F(t.role),
            accessAllGroups: t.access_all_groups,
            enabled: t.enabled
        }
    }

    function F(e) {
        switch (e) {
        case "master":
        case "tech_admin":
        case "tester":
        case "auditor":
            return e
        }
        return "master"
    }

    function M(e) {
        switch (e) {
        case "needs validation":
            return 1;
        case "needs admin validation":
            return 2;
        case "rejected":
            return 4;
        case "auto validation failed":
            return 5;
        case "auto validated":
        case "validated":
        case "admin validated":
            return 3
        }
        return 0
    }

    function V(e) {
        var t = {};
        return t.enabled = !!e.enabled,
        t.enabled && (t.protocol = e.protocol, t.address = e.address, t.port = e.port, t.username = e.username, t.password = e.password),
        t
    }

    function O(e) {
        var t = {};
        return t.reportId = e.report_id,
        t.source = H(e.source),
        t.templateId = e.template_id,
        t.templateName = e.template_name,
        t.templateType = e.template_type,
        t.created = e.generation_date ? new Date(e.generation_date) : null,
        t.status = e.status,
        Me(e.download) && e.download.forEach(function(e) {
            r.endsWith(e, ".pdf") || e.indexOf(".pdf?") > -1 ? t.downloadLinkPDF = e: (r.endsWith(e, ".html") || e.indexOf(".html?") > -1) && (t.downloadLinkHTML = e)
        }),
        t
    }

    function H(e) {
        var t = {};
        if (t.idList = e.id_list, t.listType = e.list_type, t.target = {
            address: De("N/A"),
            description: ""
        },
        e.description) {
            var n = e.description.indexOf(";");
            n > -1 ? (t.target = {},
            t.target.address = e.description.substr(0, n), t.target.description = e.description.substr(n + 1)) : "Multiple targets" === e.description && (t.target.address = De("Multiple Targets"))
        }
        if (e.description && (1 === t.idList.length && ("targets" === t.listType || "scans" === t.listType || "scan_result" === t.listType) || "vulnerabilities" === t.listType && "Multiple targets" !== e.description)) {
            var n = e.description.indexOf(";");
            n > -1 && (t.target = {},
            t.target.address = e.description.substr(0, n), t.target.description = e.description.substr(n + 1))
        }
        return t
    }

    function j(e) {
        var t = {};
        return t.templateId = e.template_id,
        t.name = e.name,
        t.group = e.group,
        t.comparison = "11111111-1111-1111-1111-111111111124" === e.template_id,
        t
    }

    function q(e) {
        var t = null;
        return e && (t = {},
        t.scanId = e.scan_id, t.schedule = G(e.schedule), t.status = "scheduled", t.resultId = null, t.severityCounts = null, t.lastRun = null, e.current_session && (t.status = e.current_session.status, t.running = We.indexOf(e.current_session.status) > -1, t.resultId = e.current_session.scan_session_id, t.lastRun = e.current_session.start_date ? new Date(e.current_session.start_date) : null, t.severityCounts = Y(e.current_session.severity_counts), t.eventLevel = e.current_session.event_level), t.nextRun = !t.schedule.disabled && e.next_run ? new Date(e.next_run) : null, t.profile = {
            profileId: e.profile_id,
            name: e.profile_name
        },
        t.target = {},
        t.target.targetId = e.target_id, t.target.address = e.target.address, t.target.description = e.target.description, t.target.description = e.target.description, t.target.targetType = He(e.target.type) ? e.target.type: "default", !t.schedule.disabled && t.schedule.recurrence && t.nextRun && "completed" === t.status && (t.originalStatus = "completed", t.status = "scheduled")),
        t
    }

    function G(e) {
        var t = n.axConversions.pyToRRULE(e.recurrence),
        r = {};
        return r.recurrence = e.recurrence,
        r.scheduleDate = t ? t.options.dtstart: e.start_date ? new Date(e.start_date) : null,
        r.timeSensitive = e.time_sensitive,
        r.disabled = e.disable,
        r
    }

    function B(e) {
        var t = {};
        return t.profileId = e.profile_id,
        t.name = e.name,
        t.sortOrder = e.sort_order,
        t.isCustom = e.custom,
        t.checks = Me(e.checks) ? e.checks: [],
        t
    }

    function W(e) {
        var t = {};
        return t.scanId = e.scan_id,
        t.resultId = e.result_id,
        t.startDate = e.start_date ? new Date(e.start_date) : null,
        t.endDate = e.end_date ? new Date(e.end_date) : null,
        t.status = e.status,
        t
    }

    function K(t) {
        var n = {};
        if (n.status = t.status, n.threatLevel = "-1", n.severityCounts = null, "failed" === n.status || "aborted" === n.status ? t.severity_counts && Oe(t.severity_counts.medium) && t.severity_counts.medium > 0 ? n.threatLevel = "2": t.severity_counts && Oe(t.severity_counts.high) && t.severity_counts.high > 0 ? n.threatLevel = "3": n.threatLevel = "-1": "completed" === n.status && (n.threatLevel = "0"), t.severity_counts && (n.severityCounts = function(e) {
            var t = e.high,
            r = e.medium,
            i = e.low,
            o = e.info;
            return null != t && null != r && null != i && null != o ? (n.threatLevel = "0", i > 0 && (n.threatLevel = "1"), r > 0 && (n.threatLevel = "2"), t > 0 && (n.threatLevel = "3"), {
                high: ~~t,
                medium: ~~r,
                low: ~~i,
                info: ~~o
            }) : null
        } (t.severity_counts || {})), t.scanning_app) {
            if (t.scanning_app.wvs) {
                var i = t.scanning_app.wvs;
                if (n.wvsScanStats = {
                    status: i.status,
                    abortRequested: i.abort_requested,
                    startDate: i.start_date ? new Date(i.start_date) : null,
                    endDate: i.end_date ? new Date(i.end_date) : null,
                    hosts: [],
                    vulns: [],
                    activity: [],
                    allowedHosts: []
                },
                i.hosts && (e.forEach(i.hosts,
                function(e, t) {
                    var r = {
                        targetId: t,
                        address: e.host,
                        isStartingHost: e.is_starting_host
                    };
                    e.target_info && (r.osName = e.target_info.os, r.technologies = e.target_info.technologies, r.responsive = e.target_info.responsive, r.serverName = e.target_info.server, r.sensorDetected = "boolean" == typeof e.target_info.sensor_detected ? e.target_info.sensor_detected: null),
                    e.web_scan_status && (r.locations = e.web_scan_status.locations, r.avgResponseTime = e.web_scan_status.avg_response_time, r.maxResponseTime = e.web_scan_status.max_response_time, r.requestCount = e.web_scan_status.request_count),
                    e.external_hosts && (r.externalHosts = e.external_hosts.sort(function(e, t) {
                        var n = e.replace(/^https?:\/\//i, ""),
                        r = t.replace(/^https?:\/\//i, "");
                        return n.localeCompare(r)
                    })),
                    n.wvsScanStats.hosts.push(r),
                    r.isStartingHost && (n.wvsScanStats.startingHost = r)
                }), n.wvsScanStats.hosts.sort(function(e) {
                    return e.is_starting_host ? -1 : 1
                })), i.main) {
                    var o = i.main;
                    if (o) {
                        if (n.wvsScanStats.duration = o.duration, n.wvsScanStats.progress = o.progress, o.web_scan_status) {
                            var a = o.web_scan_status;
                            n.wvsScanStats.locations = a.locations,
                            n.wvsScanStats.avgResponseTime = a.avg_response_time,
                            n.wvsScanStats.maxResponseTime = a.max_response_time,
                            n.wvsScanStats.requestCount = a.request_count
                        }
                        Me(o.vulns) && (n.wvsScanStats.vulns = o.vulns.map(function(e) {
                            return {
                                vulnId: e.vuln_id,
                                severity: e.severity,
                                name: e.name,
                                timestamp: new Date(e.time),
                                target: {
                                    targetId: e.target_info.target_id,
                                    address: e.target_info.host
                                }
                            }
                        }), n.wvsScanStats.vulns.sort(function(e, t) {
                            return e.timestamp.getTime() - t.timestamp.getTime()
                        })),
                        Me(o.messages) && (n.wvsScanStats.activity = o.messages.map(function(t) {
                            var n = "";
                            if (t.target_info.host) switch (t.kind) {
                            case "scanning":
                                n = "Scanning of " + t.target_info.host + " started";
                                break;
                            case "finished":
                                n = "Scanning of " + t.target_info.host + " completed";
                                break;
                            case "aborted":
                                n = "Scanning of " + t.target_info.host + " was aborted",
                                "nonresponsive" === t.data ? n += " (target was not responsive)": "network" === t.data && (n += " (network error)");
                                break;
                            case "deep_scan":
                                n = "Deep scan of " + t.target_info.host + " started";
                                break;
                            case "crawling":
                                n = "Crawling of " + t.target_info.host + " started";
                                break;
                            case "crawl_memlimit":
                                n = "Crawler memory limit reached for " + t.target_info.host;
                                break;
                            case "al_error":
                                n = "Automatic login failed for " + t.target_info.host;
                                break;
                            case "au_error":
                                n = "HTTP Authentication error for " + t.target_info.host;
                                break;
                            case "ls_error":
                                n = "The login sequence for " + t.target_info.host + " is invalid";
                                break;
                            case "no_sensor":
                                n = "AcuSensor was not detected on " + t.target_info.host;
                                break;
                            case "sensor":
                                n = "AcuSensor detected on " + t.target_info.host;
                                break;
                            case "manual_browsing":
                                n = "Manual intervention required for " + t.target_info.host;
                                break;
                            case "scan_resumed":
                                n = "Scanning has resumed"
                            }
                            return "" === n && (n = e.uppercase(t.kind[0]) + t.kind.substr(1)),
                            {
                                timestamp: new Date(t.time),
                                message: n,
                                target: {
                                    targetId: t.target_id,
                                    address: t.host
                                },
                                level: t.level,
                                data: t.data
                            }
                        }), n.wvsScanStats.activity.sort(function(e, t) {
                            return e.timestamp.getTime() - t.timestamp.getTime()
                        }))
                    }
                }
            }
            var i, o
        }
        return n.duration = r.get(n, "wvsScanStats.duration", 0),
        n.vulns = r.get(n, "wvsScanStats.vulns", []),
        n.progress = r.get(n, "wvsScanStats.progress", 0),
        n.activity = r.get(n, "wvsScanStats.activity", []),
        n.responsive = r.get(n, "wvsScanStats.startingHost.responsive", !1),
        n
    }

    function z(e) {
        var t = {};
        return Fe(t, pe(e)),
        t.count = e.count,
        t
    }

    function Y(e) {
        var t = null;
        return e && (t = {},
        t.high = e.high, t.medium = e.medium, t.low = e.low, t.info = e.info),
        t
    }

    function Q(e) {
        var t = {};
        return t.kind = e.kind,
        "automatic" === t.kind && (t.credentials = se(e.credentials)),
        t
    }

    function Z(e) {
        var t = {};
        return t.address = e.address,
        t.port = e.port,
        t.security = e.security,
        t.username = e.username,
        t.password = e.password,
        t.fromAddress = e.from_address,
        t
    }

    function X(e) {
        switch (e.kind) {
        case "none":
            return {
                kind:
                "none"
            };
        case "password":
            return {
                kind:
                "password",
                port: je(e.port) ? 22 : e.port,
                username: e.username,
                password: e.password
            };
        case "key":
            return {
                kind:
                "key",
                port: je(e.port) ? 22 : e.port,
                username: e.username,
                sshKey: e.ssh_key,
                keyPassword: e.key_password
            };
        default:
            return {
                kind:
                "none"
            }
        }
    }

    function J(e) {
        var t = {};
        return t.updateMode = e.updates,
        t.notifications = e.notifications ? Z(e.notifications) : null,
        t.proxy = e.proxy ? V(e.proxy) : null,
        t.excludedHoursId = e.excluded_hours_id,
        t
    }

    function ee(e) {
        var t = function(t) {
            return {
                maxEngines: r.defaultTo(r.defaultTo(t.max_engines, t.engines), void 0),
                maxScansPerEngine: r.defaultTo(r.defaultTo(t.max_scans_per_engine, t.scans_per_engine), void 0),
                maxUsers: r.defaultTo(r.defaultTo(t.max_users, e.license.limits.users), void 0)
            }
        } (e.license.limits || {});
        return {
            buildNumber: e.build_number,
            minorVersion: e.minor_version,
            majorVersion: e.major_version,
            versionFull: m(e.major_version, e.minor_version, e.build_number),
            buildDate: h(e.build_number),
            // TODO: Return null for this key if license_key is not set (no license entered)
            license: {
                activated: e.license.activated,
                email: e.license.email,
                licenseKey: e.license.license_key,
                productCode: e.license.product_code,
                expired: e.license.expired,
                features: Me(e.license.features) ? e.license.features.sort() : [],
                limits: t,
                status: function(e) {
                    if (e.expired) {
                        return De("License Expired")
                    }
                    return De(e.activated ? "Licensed": "Not Activated")
                } (e.license),
                expires: e.license.expires ? new Date(e.license.expires) : null,
                maintenance: {
                    expired: e.license.maintenance_expired,
                    expires: He(e.license.maintenance_expires) ? new Date(e.license.maintenance_expires) : null
                }
            },
            updateInfo: oe(e.update_info),
            verificationStatus: M(e.confirmation_status)
        }
    }

    function te(e) {
        var t = {};
        return t.issueTrackerId = r.defaultTo(e.issue_tracker_id, ""),
        t.limitCrawlerScope = e.limit_crawler_scope,
        t.login = Q(e.login),
        t.sensor = e.sensor,
        t.sensorSecret = e.sensor_secret,
        t.sshCredentials = X(e.ssh_credentials),
        t.proxy = e.proxy ? V(e.proxy) : null,
        t.authentication = se(e.authentication),
        t.clientCertificatePassword = e.client_certificate_password,
        t.scanSpeed = e.scan_speed,
        t.caseSensitive = e.case_sensitive,
        t.technologies = Me(e.technologies) ? e.technologies: [],
        t.customHeaders = Me(e.custom_headers) ? e.custom_headers: [],
        t.customCookies = Me(e.custom_cookies) ? e.custom_cookies.map(x) : [],
        t.excludedPaths = Me(e.excluded_paths) ? e.excluded_paths: [],
        t.userAgent = e.user_agent,
        t.debug = e.debug,
        t.excludedHoursId = e.excluded_hours_id ? e.excluded_hours_id: "",
        t
    }

    function ne(e) {
        var t = {};
        return t.groupId = e.group_id,
        t.name = e.name,
        t.description = e.description,
        t.targetCount = e.target_count,
        t
    }

    function re(e) {
        var t = {};
        return t.targetId = e.target_id,
        t.address = e.address,
        t.criticality = e.criticality,
        t.description = e.description,
        t.threat = e.threat,
        t.continuousMode = e.continuous_mode,
        t.lastScanId = e.last_scan_id,
        t.lastScanDate = e.last_scan_date ? new Date(e.last_scan_date) : null,
        t.lastScanStatus = e.last_scan_session_status,
        t.lastScanResultId = e.last_scan_session_id,
        t.severityCounts = Y(e.severity_counts),
        t.targetType = He(e.type) ? e.type: "default",
        t.scansRequireMI = e.manual_intervention,
        Me(e.links) && (t.links = e.links.map(function(e) {
            var t = e.href,
            n = e.rel;
            return {
                href: t,
                rel: n
            }
        })),
        t
    }

    function ie(e) {
        var t = {};
        return t.trendOpenVulns = e.open_vulns_trending.map(function(e) {
            return {
                highVulns: e.high_vulns,
                mediumVulns: e.med_vulns,
                startDate: new Date(e.start_date),
                endDate: new Date(e.end_date)
            }
        }),
        t.trendAverageVulnAge = e.average_vuln_age_trending.map(function(e) {
            return {
                averageDays: e.average_days,
                daysHighVulns: e.high_vuln_days,
                daysMediumVulns: e.med_vuln_days,
                startDate: new Date(e.start_date),
                endDate: new Date(e.end_date)
            }
        }),
        t.trendNewVulns = e.new_vulns_trending.map(function(e) {
            return {
                highVulns: e.high_vulns,
                mediumVulns: e.med_vulns,
                weightedVulns: e.weighted_vulns,
                startDate: new Date(e.start_date),
                endDate: new Date(e.end_date)
            }
        }),
        t.trendAverageRemediationTime = e.average_remediation_time.map(function(e) {
            return {
                fixedHighVulns: e.vuln_fixed_high,
                fixedMediumVulns: e.vuln_fixed_med,
                daysHighVulns: e.high_vuln_days,
                daysMediumVulns: e.med_vuln_days,
                startDate: new Date(e.start_date),
                endDate: new Date(e.end_date),
                averageDays: e.average_days
            }
        }),
        t
    }

    function oe(e) {
        var t = {};
        return t.buildNumber = e.build_number.toString(),
        t.minorVersion = e.minor_version,
        t.majorVersion = e.major_version,
        t.available = e.new_update,
        t.status = e.update_status,
        t.versionFull = m(e.major_version, e.minor_version, e.build_number),
        t.buildDate = h(e.build_number.toString()),
        t
    }

    function ae(e) {
        var t = {};
        return t.accessAllGroups = e.access_all_groups,
        t.groups = e.group_id_list,
        t
    }

    function se(e) {
        var t = {};
        return t.enabled = e.enabled,
        t.enabled && (t.username = e.username, t.password = e.password),
        t
    }

    function ce(e) {
        var t = {};
        return t.monthlyStatus = r.get(e, "monthly_status", !1),
        t.scans = r.get(e, "scans", !1),
        t.updates = r.get(e, "updates", !1),
        t
    }

    function ue(e) {
        var t = {};
        return Fe(t, pe(e)),
        t.count = e.count,
        t.criticality = e.criticality,
        t
    }

    function le(e, t, n) {
        var r = {};
        return Fe(r, de(n)),
        r.description = n.description,
        r.cvss2 = n.cvss2,
        r.cvss3 = n.cvss3,
        r.cvssScore = n.cvss_score,
        r.impact = n.impact,
        r.recommendation = n.recommendation,
        r.longDescription = n.long_description,
        r.references = Me(n.references) ? n.references: [],
        r.details = n.details,
        r.request = n.request ? n.request.replace(/\r\n/g, "\n") : "",
        r.classification = function(r) {
            var i = r.getCVSSLink,
            o = r.getCVSSMetrics,
            a = {
                cve: e(t.extractCVE(n.tags),
                function(e) {
                    return 1e7 * parseInt(e.substr(0, 4), 10) + parseInt(e.substr(5))
                },
                !0),
                cwe: e(t.extractCWE(n.tags),
                function(e) {
                    return parseInt(e, 10)
                })
            };
            return n.cvss3 ? a.cvss = {
                version: 3,
                vector: n.cvss3,
                vectorLink: i(n.cvss3, "3"),
                score: n.cvss_score,
                metrics: o(n.cvss3, "3")
            }: n.cvss2 && (a.cvss = {
                version: 2,
                vector: n.cvss2,
                vectorLink: i(n.cvss2, "2"),
                score: n.cvss_score,
                metrics: o(n.cvss2, "2")
            }),
            a
        } (t),
        r
    }

    function de(e) {
        var t = {};
        return t.status = e.status,
        t.targetDescription = e.target_description,
        t.vulnId = e.vuln_id,
        t.issueId = e.issue_id,
        t.name = e.vt_name,
        t.criticality = e.criticality,
        t.vtId = e.vt_id,
        t.parameter = e.affects_detail,
        t.url = Qe(e.affects_url),
        t.source = e.source,
        t.locId = e.loc_id,
        t.targetId = e.target_id,
        t.firstSeen = e.first_seen ? new Date(e.first_seen) : null,
        t.lastSeen = e.last_seen ? new Date(e.last_seen) : null,
        t.severity = e.severity,
        t.tags = Me(e.tags) ? e.tags: [],
        t.continuous = e.continuous,
        t
    }

    function pe(e) {
        var t = {};
        return t.vulnTypeId = e.vt_id,
        t.name = e.name,
        t.severity = e.severity,
        t.tags = Me(e.tags) ? e.tags: [],
        t.cvss2 = e.cvss2,
        t.cvss3 = e.cvss3,
        t
    }

    function fe(e) {
        var n = {};
        return n.email = e.email,
        n.first_name = e.firstName,
        n.last_name = e.lastName,
        n.role = e.role,
        n.enabled = e.enabled,
        n.access_all_groups = e.accessAllGroups,
        e.password === Xe || (n.password = e.password && e.password !== Ze ? t.SHA256(e.password).toString() : void 0),
        n
    }

    function ge(e) {
        var n = {};
        return n.email = e.email,
        n.password = t.SHA256(e.password).toString(),
        n.access_all_groups = e.accessAllGroups,
        n.first_name = e.firstName,
        n.last_name = e.lastName,
        n.role = e.role,
        n
    }

    function he(e) {
        var t = {};
        return t.excluded_hours_id = e.excludedHoursId,
        t.name = e.name,
        t.time_offset = e.timeOffset,
        t.exclusion_matrix = e.exclusions,
        t
    }

    function me(e) {
        var t = {},
        n = ve(e),
        r = Te(e.project),
        i = null != e.issueType ? Se(e.issueType) : void 0;
        return Fe(t, n),
        t.project = r,
        t.issue_type = i,
        t
    }

    function ve(e) {
        var t = {};
        return e && (t.bug_tracker = e.bugTracker, t.url = e.url, e.auth && (t.auth = {},
        t.auth.kind = e.auth.kind, t.auth.user = e.auth.username, t.auth.password = e.auth.password)),
        t
    }

    function ye(e) {
        var t = {};
        return t.name = e.name,
        Fe(t, me(e)),
        t
    }

    function Se(e) {
        var t = {};
        return t.issue_id = e.issueTypeId,
        t.issue_name = e.issueTypeName,
        t
    }

    function Te(e) {
        var t = {};
        return t.project_id = e.projectId,
        t.project_name = e.projectName,
        t
    }

    function xe(e, t) {
        var n = {};
        return n.export_id = e,
        n.source = {},
        n.source.list_type = t.listType,
        Me(t.idList) && t.idList.length > 0 && (n.source.id_list = t.idList),
        n
    }

    function be(e, t) {
        var n = {};
        return n.template_id = e,
        n.source = {},
        n.source.list_type = t.listType,
        Me(t.idList) && t.idList.length > 0 && (n.source.id_list = t.idList),
        n
    }

    function _e(e, t) {
        var n = e.get("AccountApi"),
        r = {};
        return r.target_id = t.targetId,
        r.profile_id = t.profileId,
        r.report_template_id = t.reportTemplateId,
        r.schedule = e.invoke(ke, void 0, {
            schedule: t.schedule
        }),
        r.ui_session_id = n.getBSIDValue(),
        r
    }

    function Ce(e, t, n) {
        var r = {};
        return He(e) && e.length > 0 && (r.q = e),
        null !== n && void 0 !== n && (r.l = n),
        null !== t && void 0 !== t && (r.c = t),
        r
    }

    function we(e) {
        var t = {};
        return t.email = e.email,
        t.first_name = e.firstName,
        t.last_name = e.lastName,
        t.company = e.companyName,
        t.website = e.companyWebsite,
        t.phone = e.contactPhone,
        t.country = e.countryCode,
        t.notifications = e.notifications ? Ne(e.notifications) : void 0,
        t
    }

    function Ie(e) {
        var t = {
            enabled: r.get(e, "enabled", !1)
        };
        return t.enabled && (t.address = e.address, t.protocol = e.protocol, t.port = parseInt(e.port, 10), e.username && (t.username = e.username, t.password = e.password)),
        t
    }

    function ke(e, t) {
        var n = {};
        return n.disable = t.disabled,
        n.recurrence = t.recurrence,
        n.start_date = t.recurrence ? void 0 : e(t.scheduleDate, "yyyyMMddTHHmmssZ"),
        n.time_sensitive = t.timeSensitive,
        n
    }

    function Ae(e) {
        var t = {};
        return t.profile_id = e.profileId,
        t.name = e.name,
        t.sort_order = e.sortOrder,
        t.custom = e.isCustom,
        t.checks = e.checks,
        t
    }

    function Le(e) {
        var t = {};
        return t.kind = e.kind,
        "automatic" === e.kind && (t.credentials = Pe(e.credentials)),
        t
    }

    function $e(e) {
        var t = {};
        return void 0 !== e.notifications && (null !== e.notifications ? (t.notifications = {
            address: e.notifications.address,
            port: e.notifications.port,
            security: e.notifications.security,
            from_address: e.notifications.fromAddress
        },
        e.notifications.username && (t.notifications.username = e.notifications.username, t.notifications.password = e.notifications.password)) : t.notifications = null),
        void 0 !== e.proxy && (null !== e.proxy ? (t.proxy = {
            protocol: e.proxy.protocol,
            enabled: !1
        },
        "none" !== e.proxy.protocol && (t.proxy.enabled = !0, t.proxy.address = e.proxy.address, t.proxy.port = e.proxy.port, e.proxy.username && (t.proxy.username = e.proxy.username, t.proxy.password = e.proxy.password))) : t.proxy = null),
        void 0 !== e.updateMode && (t.updates = e.updateMode),
        void 0 !== e.excludedHoursId && (t.excluded_hours_id = e.excludedHoursId),
        t
    }

    function Ee(e) {
        var t = {},
        n = e.issueTrackerId,
        r = e.limitCrawlerScope,
        i = e.login,
        o = e.sensor,
        a = e.sensorSecret,
        s = (e.sshCredentials, e.proxy),
        c = e.authentication,
        u = e.clientCertificatePassword,
        l = e.scanSpeed,
        d = e.caseSensitive,
        p = e.technologies,
        f = e.customHeaders,
        g = e.customCookies,
        h = e.excludedPaths,
        m = e.userAgent,
        v = e.debug,
        y = e.excludedHoursId;
        return Ve(n) && (t.issue_tracker_id = n),
        Ve(r) && (t.limit_crawler_scope = r),
        Ve(i) && (t.login = Le(i)),
        Ve(o) && (t.sensor = o),
        Ve(a) && (t.sensor_secret = a),
        Ve(s) && (t.proxy = Ie(s)),
        Ve(e.authentication) && (t.authentication = Pe(c)),
        Ve(u) && (t.client_certificate_password = u),
        Ve(l) && (t.scan_speed = l),
        Ve(d) && (t.case_sensitive = d),
        Ve(p) && (t.technologies = p),
        Ve(f) && (t.custom_headers = f),
        Ve(g) && (t.custom_cookies = g),
        Ve(h) && (t.excluded_paths = h),
        Ve(m) && (t.user_agent = m),
        Ve(v) && (t.debug = v),
        Ve(y) && (t.excluded_hours_id = null === y ? "": y),
        t
    }

    function Re(e) {
        var t = {};
        return t.access_all_groups = e.accessAllGroups,
        t.group_id_list = e.groups,
        t
    }

    function Pe(e) {
        var t = {};
        return t.enabled = e.enabled,
        e.enabled && (t.username = e.username, t.password = e.password),
        t
    }

    function Ne(e) {
        var t = {};
        return t.monthly_status = e.monthlyStatus,
        t.scans = e.scans,
        t.updates = e.updates,
        t
    }
    i.$inject = ["$interval", "$q", "$rootScope", "$timeout", "axConstant", "axUserPreferences", "ApiHttp", "CurrentUser", "SystemConfigApi"],
    o.$inject = ["$http", "$q", "$rootScope", "ApiHttp"],
    a.$inject = ["$http", "$q", "$rootScope", "ApiHttp"],
    s.$inject = ["$injector", "$http", "$q", "$rootScope", "ApiHttp", "AccountApi"],
    c.$inject = ["$q", "$http", "$rootScope", "orderByFilter", "ApiHttp"],
    u.$inject = ["$injector", "$http", "$q", "$rootScope", "axConstant", "ApiHttp", "NotificationsApi"],
    l.$inject = ["$http", "$q", "$rootScope", "axConstant", "ApiHttp", "CurrentUser"],
    d.$inject = ["$injector", "$http", "$q", "$rootScope", "ApiHttp", "AccountApi"],
    le.$inject = ["orderByFilter", "axVulnClassification", "dto"],
    _e.$inject = ["$injector", "scanRequest"],
    ke.$inject = ["dateFilter", "schedule"];
    var De = e.identity,
    Ue = e.copy,
    Fe = e.extend,
    Me = e.isArray,
    Ve = (e.isDate, e.isDefined),
    Oe = e.isNumber,
    He = (e.isObject, e.isString),
    je = e.isUndefined,
    qe = e.merge,
    Ge = r.constant(void 0),
    Be = Object.freeze({
        next_cursor: null,
        previous_cursor: null
    }),
    We = ["processing", "aborting"],
    Ke = 25,
    ze = function(e) {
        return e ? r.pick(e, ["noPublishError", "noLoadingTracker", "formatError"]) : {}
    },
    Ye = function(e, t) {
        return e.toDateString() === t.toDateString()
    },
    Qe = function(e) {
        try {
            return decodeURIComponent(e)
        } catch(t) {
            return e
        }
    },
    Ze = "hIpA2ksAW30abA!",
    Xe = "password set",
    Je = (function() {
        function e(e, t) {
            this.$q = e,
            this.ApiHttp = t
        }
        e.prototype.confirmAccountIntent = function(e, t) {
            var n = this,
            r = n.$q;
            return n.ApiHttp.post("/intents/" + e, {},
            204, t).then(function(e) {
                if (404 === e.status) return r.reject({
                    errorCode: "h404",
                    errorMessage: De("Account validation failed. The link has expired or is not valid.")
                })
            }).then(Ge)
        },
        e.prototype.confirmChangeEmailIntent = function(e, t) {
            var n = this,
            r = n.$q;
            return n.ApiHttp.post("/intents/" + e, {},
            204, t).then(function(e) {
                if (404 === e.status) return r.reject({
                    errorCode: "h404",
                    errorMessage: De("The link has expired or is not valid.")
                })
            }).then(Ge)
        },
        e.prototype.confirmPasswordResetIntent = function(e, n, r) {
            var i = this,
            o = i.$q;
            return i.ApiHttp.post("/intents/" + e, {
                new_password: t.SHA256(n).toString()
            },
            204, r).then(function(e) {
                if (404 === e.status) return o.reject({
                    errorCode: "h404",
                    errorMessage: De("The link has expired or is not valid.")
                })
            }).then(Ge)
        },
        e.prototype.getIntent = function(e, t) {
            var n = this,
            r = n.$q;
            return n.ApiHttp.get("/intents/" + e, 200, t).then(function(e) {
                return 404 === e.status || null == e.data ? r.reject({
                    errorCode: "h404",
                    errorMessage: De("The link has expired or is not valid.")
                }) : r.resolve(A(e.data))
            })
        },
        e.$inject = ["$q", "ApiHttp"]
    } (),
    function() {
        function e(e, t, n, r, i) {
            this.$http = e,
            this.$q = t,
            this.$rootScope = n,
            this.ApiHttp = r,
            this.axConstant = i
        }
        return e.prototype.checkConnection = function(e, t) {
            return this.ApiHttp.post("/issue_trackers/check_connection", ve(e), 200, t).then(function(e) {
                return {
                    success: r.get(e, "data.success", !1),
                    errorMessage: r.get(e, "data.message", "")
                }
            })
        },
        e.prototype.checkIssueTrackerEntry = function(e, t) {
            return this.ApiHttp.get("/issue_trackers/" + e, 200, t).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t || null == n ? null: $(n)
            })
        },
        e.prototype.createIssueTrackerEntry = function(e, t, n) {
            var r = this,
            i = r.$http,
            o = r.$rootScope,
            a = r.ApiHttp,
            s = r.axConstant;
            return a.post("/issue_trackers", Fe(me(t), {
                name: e
            }), 201, n).then(function(e) {
                return i.get(e.headers("Location"), ze(n))
            }).then(g(201)).then(function(e) {
                var t = $(e.data);
                return o.$emit(s.API_EVENTS.ISSUE_TRACKER_CREATED, {
                    issueTracker: Ue(t)
                }),
                t
            })
        },
        e.prototype.deleteIssueTrackerEntry = function(e, t) {
            var n = this,
            r = n.$rootScope,
            i = n.ApiHttp,
            o = n.axConstant;
            return i.delete("/issue_trackers/" + e, 204, t).then(function() {
                r.$emit(o.API_EVENTS.TARGET_DELETED, {
                    issueTrackerId: e
                })
            }).then(Ge)
        },
        e.prototype.getIssueTrackerEntry = function(e, t) {
            return this.ApiHttp.get("/issue_trackers/" + e, 200, t).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t || null == n ? null: $(n)
            })
        },
        e.prototype.getIssueTrackers = function(e) {
            return this.ApiHttp.get("/issue_trackers", 200, e).then(function(e) {
                return r.get(e, "data.issue_trackers", []).map($)
            })
        },
        e.prototype.listIssueTypes = function(e, t, n) {
            var i = this.ApiHttp,
            o = Fe(ve(e), {
                project: Te(t)
            });
            return i.post("/issue_trackers/check_issue_types", o, 200, n).then(function(e) {
                return r.get(e, "data.issue_types", []).map(E)
            })
        },
        e.prototype.listProjects = function(e, t) {
            return this.ApiHttp.post("/issue_trackers/check_projects", ve(e), 200, t).then(function(e) {
                return r.get(e, "data.projects", []).map(R)
            })
        },
        e.prototype.updateIssueTrackerEntry = function(e, t) {
            var n = this,
            r = this,
            i = r.ApiHttp;
            r.$q;
            return i.patch("/issue_trackers/" + e.issueTrackerId, ye(e), 200, t).then(function() {
                return n.getIssueTrackerEntry(e.issueTrackerId, ze(t))
            })
        },
        e.$inject = ["$http", "$q", "$rootScope", "ApiHttp", "axConstant"],
        e
    } ()),
    et = function() {
        function t(e) {
            this.ApiHttp = e
        }
        return t.prototype.consumeAll = function(e) {
            return this.ApiHttp.post("/notifications/consume", {},
            204, e).then(Ge)
        },
        t.prototype.consumeNotification = function(e, t) {
            return this.ApiHttp.post("/notifications/" + e + "/consume", {},
            204, t).then(Ge)
        },
        t.prototype.getEvent = function(e, t) {
            return this.ApiHttp.get("/events/" + e, 200, t).then(function(e) {
                return 404 === e.status || null == e.data ? null: N(e.data)
            })
        },
        t.prototype.getEvents = function(t, n, r, i) {
            return this.ApiHttp.get("/events", 200, Fe({
                params: Ce(t, n, r)
            },
            i)).then(function(t) {
                var n = e.isObject(t.data) ? t.data: null;
                return {
                    notifications: null !== n ? n.notifications.map(N) : [],
                    pagination: null !== n ? D(n.pagination) : {}
                }
            })
        },
        t.prototype.getNotifications = function(t, n, r, i) {
            return this.ApiHttp.get("/notifications", 200, Fe({
                params: Ce(t, n, r)
            },
            i)).then(function(t) {
                var n = e.isObject(t.data) ? t.data: null;
                return {
                    notifications: null !== n ? n.notifications.map(N) : [],
                    pagination: null !== n ? D(n.pagination) : {}
                }
            })
        },
        t.prototype.getUnconsumedNotificationCount = function(e) {
            return this.ApiHttp.get("/notifications/count", 200, e).then(function(e) {
                return null != e.data && Oe(e.data.count) ? e.data.count: 0
            })
        },
        t.$inject = ["ApiHttp"],
        t
    } (),
    tt = function() {
        function e(e, t, n, r, i, o, a) {
            this.$http = e,
            this.$q = t,
            this.$rootScope = n,
            this.ApiHttp = r,
            this.axExportTemplatesCache = i,
            this.axReportTemplatesCache = o,
            this.orderByFilter = a
        }
        return e.prototype.generateNewExport = function(e, t, n) {
            var r = this,
            i = r.$http;
            return r.ApiHttp.post("/exports", xe(e, t), 201, n).then(function(e) {
                return i.get(e.headers("Location"), ze(n))
            }).then(g(200)).then(function(e) {
                return C(e.data)
            })
        },
        e.prototype.generateNewReport = function(e, t, n) {
            var r = this,
            i = r.$http;
            return r.ApiHttp.post("/reports", be(e, t), 201, n).then(function(e) {
                return i.get(e.headers("Location"), ze(n))
            }).then(g(200)).then(function(e) {
                return O(e.data)
            })
        },
        e.prototype.getExport = function(e, t) {
            return this.ApiHttp.get("/exports/" + e, 200, t).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t || null == n ? null: C(n)
            })
        },
        e.prototype.getExportTypes = function(e, t) {
            var n = this,
            i = n.orderByFilter,
            o = n.ApiHttp,
            a = n.axExportTemplatesCache;
            return o.get("/export_types", 200, Fe({
                cache: a
            },
            t)).then(function(e) {
                return r.get(e, "data.templates", []).map(w)
            }).then(function(t) {
                return t.length > 0 && (He(e) ? t = t.filter(function(t) {
                    return t.acceptedSources.indexOf(e) > -1
                }) : Me(e) && (t = r.takeWhile(t,
                function(t) {
                    return r.intersection(t.acceptedSources, e).length > 0
                }))),
                i(t, "name")
            })
        },
        e.prototype.getReport = function(e, t) {
            return this.ApiHttp.get("/reports/" + e, 200, t).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t || null == n ? null: O(n)
            })
        },
        e.prototype.getReportTemplates = function(e) {
            var t = this,
            n = t.orderByFilter,
            i = t.ApiHttp,
            o = t.axReportTemplatesCache;
            return i.get("/report_templates", 200, Fe({
                cache: o
            },
            e)).then(function(e) {
                return n(r.get(e, "data.templates", []).map(j), "name")
            })
        },
        e.prototype.getReports = function(e, t, n, i) {
            return this.ApiHttp.get("/reports", 200, Fe({
                params: Ce(e, t, n)
            },
            i)).then(function(e) {
                return {
                    reports: r.get(e, "data.reports", []).map(O),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        },
        e.prototype.repeatReport = function(e, t) {
            var n = this,
            r = n.$http;
            return n.ApiHttp.post("/reports/" + e + "/repeat", {},
            201, t).then(this._checkForMissingResource()).then(function(e) {
                return r.get(e.headers("Location"), ze(t))
            }).then(g(200)).then(function(e) {
                return O(e.data)
            })
        },
        e.prototype.removeReport = function(e, t) {
            return this.ApiHttp.delete("/reports/" + e, 204, t).then(Ge)
        },
        e.prototype._checkForMissingResource = function(e) {
            void 0 === e && (e = De("The requested report information is not available"));
            var t = this,
            n = t.$q,
            r = t.$rootScope;
            return function(t) {
                return 404 === t.status ? (t.errorMessage = e, !0 !== t.config.noPublishError && r.$emit("axError", t), n.reject(t)) : t
            }
        },
        e.$inject = ["$http", "$q", "$rootScope", "ApiHttp", "axExportTemplatesCache", "axReportTemplatesCache", "orderByFilter"],
        e
    } (),
    nt = function() {
        function e(e, t, n) {
            this.$rootScope = e,
            this.axConstant = t,
            this.ApiHttp = n
        }
        return e.prototype.enableSystemUpgrade = function(e) {
            var t = this;
            return this.ApiHttp.post("/enable_system_upgrade", {},
            204, e).then(function() {
                return t.getSystemInfo(ze(e))
            }).then(function(e) {
                return e.updateInfo
            })
        },
        e.prototype.getSystemConfig = function(e) {
            return this.ApiHttp.get("/config", 200, e).then(function(e) {
                return J(e.data)
            })
        },
        e.prototype.getSystemInfo = function(e) {
            var t = this,
            n = t.$rootScope,
            r = t.ApiHttp,
            i = t.axConstant;
            return r.get("/info", 200, e).then(function(e) {
                return ee(e.data)
            }).then(function(e) {
                return n.$emit(i.API_EVENTS.SYSTEM_INFO_LOADED, {
                    sysInfo: e
                }),
                e
            })
        },
        e.prototype.updateConfiguration = function(e, t) {
            return this.ApiHttp.patch("/config", $e(e), 204, t).then(Ge)
        },
        e.$inject = ["$rootScope", "axConstant", "ApiHttp"],
        e
    } (),
    rt = function() {
        function e(e, t, n, r, i) {
            this.$http = e,
            this.$q = t,
            this.$rootScope = n,
            this.ApiHttp = r,
            this.axConstant = i
        }
        return e.prototype.addGroup = function(e, t, n) {
            var r = this,
            i = r.$http,
            o = r.$rootScope,
            a = r.ApiHttp,
            s = r.axConstant;
            return a.post("/target_groups", {
                name: e,
                description: t
            },
            201, n).then(function(e) {
                return i.get(e.headers("Location"), ze(n))
            }).then(g(200)).then(function(e) {
                var t = ne(e.data);
                return o.$emit(s.API_EVENTS.TARGET_GROUP_CREATED, {
                    group: Ue(t)
                }),
                t
            })
        },
        e.prototype.changeTargets = function(e, t, n) {
            var r = t.add,
            i = void 0 === r ? [] : r,
            o = t.remove,
            a = void 0 === o ? [] : o;
            return this.ApiHttp.patch("/target_groups/" + e + "/targets", {
                add: i,
                remove: a
            },
            204, n).then(Ge)
        },
        e.prototype.deleteGroup = function(e, t) {
            var n = this,
            r = n.$rootScope,
            i = n.ApiHttp,
            o = n.axConstant;
            return i.delete("/target_groups/" + e, 204, t).then(function() {
                r.$emit(o.API_EVENTS.TARGET_GROUP_DELETED, {
                    groupId: e
                })
            })
        },
        e.prototype.getGroup = function(e, t) {
            return this.ApiHttp.get("/target_groups/" + e, [200, 404], t).then(function(e) {
                var t = e.status,
                n = e.data;
                return 404 === t || null == n ? null: ne(n)
            })
        },
        e.prototype.getGroups = function(e, t, n, i) {
            return this.ApiHttp.get("/target_groups", 200, Fe({
                params: Ce(e, t, n)
            },
            i)).then(function(e) {
                return {
                    groups: r.get(e, "data.groups", []).map(ne),
                    pagination: D(r.get(e, "data.pagination", Be))
                }
            })
        },
        e.prototype.listTargets = function(e, t) {
            return this.ApiHttp.get("/target_groups/" + e + "/targets", 200, t).then(function(e) {
                return r.get(e, "data.target_id_list", [])
            })
        },
        e.prototype.setTargets = function(e, t, n) {
            return this.ApiHttp.post("/target_groups/" + e + "/targets", {
                target_id_list: t
            },
            204, n).then(Ge)
        },
        e.prototype.updateGroup = function(e, t) {
            var n = this,
            r = this,
            i = r.$rootScope,
            o = r.ApiHttp,
            a = r.axConstant,
            s = e.groupId,
            c = e.name,
            u = e.description;
            return o.patch("/target_groups/" + s, {
                name: c,
                description: u
            },
            204, t).then(this._checkForMissingResource()).then(function() {
                return n.getGroup(s, ze(t))
            }).then(this._checkForMissingResource()).then(function(e) {
                return i.$emit(a.API_EVENTS.TARGET_GROUP_UPDATED, {
                    group: Ue(e)
                }),
                e
            })
        },
        e.prototype._checkForMissingResource = function(e) {
            void 0 === e && (e = De("The requested target information is not available"));
            var t = this,
            n = t.$q,
            r = t.$rootScope;
            return function(t) {
                return 404 === t.status ? (t.errorMessage = e, !0 !== t.config.noPublishError && r.$emit("axError", t), n.reject(t)) : t
            }
        },
        e.$inject = ["$http", "$q", "$rootScope", "ApiHttp", "axConstant"],
        e
    } (),
    it = function() {
        function e(e, t, n, r, i) {
            this.$http = e,
            this.$q = t,
            this.$rootScope = n,
            this.ApiHttp = r,
            this.axConstant = i
        }
        return e.prototype.setAssignedWorkers = function(e, t, n) {
            return this.ApiHttp.post("/targets/" + e + "/configuration/workers", {
                worker_id_list: t
            },
            200, n).then(Ge)
        },
        e.prototype.getAssignedWorkers = function(e, t) {
            return this.ApiHttp.get("/targets/" + e + "/configuration/workers", 200, t).then(function(e) {
                var t = e.data,
                n = e.status;
                return null == t || 404 === n ? [] : t.workers.map(p).reduce(function(e, t) {
                    return e[t.scanningApp] = t,
                    e
                },
                {})
            })
        },
        e.prototype.getWorkers = function(e) {
            return this.ApiHttp.get("/workers", 200, e).then(function(e) {
                return {
                    workers: r.get(e.data, "workers", []).map(p)
                }
            })
        },
        e.prototype.checkAuthorization = function(e, t) {
            return this.ApiHttp.post("/workers/" + e + "/check", {},
            200, t).then(this._checkForMissingResource()).then(function(e) {
                return f(e.data)
            })
        },
        e.prototype.removeWorker = function(e, t) {
            return this.ApiHttp.delete("/workers/" + e, [204, 404], t).then(Ge)
        },
        e.prototype.authorize = function(e, t) {
            return this.ApiHttp.post("/workers/" + e + "/authorize", {},
            204, t).then(Ge)
        },
        e.prototype.reject = function(e, t) {
            return this.ApiHttp.post("/workers/" + e + "/reject", {},
            204, t).then(Ge)
        },
        e.prototype.rename = function(e, t, n) {
            return this.ApiHttp.post("/workers/" + e + "/rename", {
                description: t
            },
            204, n).then(Ge)
        },
        e.prototype._checkForMissingResource = function(e) {
            void 0 === e && (e = De("The requested worker information is not available"));
            var t = this,
            n = t.$q,
            r = t.$rootScope;
            return function(t) {
                return 404 === t.status ? (t.errorMessage = e, !0 !== t.config.noPublishError && r.$emit("axError", t), n.reject(t)) : t
            }
        },
        e.$inject = ["$http", "$q", "$rootScope", "ApiHttp", "axConstant"],
        e
    } (),
    ot = function() {
        function e(e, t) {
            var n = this;
            this.$http = e,
            this.axConstant = t;
            var r = function(n, r, i, o, a) {
                return e(Fe({},
                a || {},
                {
                    method: n,
                    url: "" + t.API_BASE_PATH + r,
                    data: i
                })).then(g(o))
            }; ["get", "delete"].forEach(function(e) {
                return n[e] = function(t, n, i) {
                    return r(e, t, void 0, n, i)
                }
            }),
            ["post", "put", "patch"].forEach(function(e) {
                return n[e] = function(t, n, i, o) {
                    return r(e, t, n, i, o)
                }
            })
        }
        return e.$inject = ["$http", "axConstant"],
        e
    } ();
    e.module("WVS").service({
        AccountApi: i,
        ApiHttp: ot,
        ChildUsersApi: o,
        ExcludedHoursApi: a,
        IssueTrackersApi: Je,
        NotificationsApi: et,
        ReportsApi: tt,
        ResultsApi: s,
        ScannerApi: c,
        ScansApi: u,
        SystemConfigApi: nt,
        TargetGroupsApi: rt,
        TargetsApi: l,
        VulnerabilitiesApi: d,
        WorkersApi: it
    })
} (angular, CryptoJS, RRule, _),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l, d, p, f, g, h, m, v, y, S, T, x) {
        function b() {
            var e = t.reportList.gridApi && t.reportList.gridApi.selection;
            return e ? e.getSelectedRows() : []
        }

        function _() {
            var e = t.reportList.gridApi && t.reportList.gridApi.selection;
            return e ? e.getSelectedCount() : 0
        }

        function C() {
            t.filterAsideVisible = !t.filterAsideVisible
        }

        function w(e) {
            var n = t.searchFilters;
            switch (n.filterTags.splice(n.filterTags.indexOf(e), 1), e.key) {
            case "status":
                n.status = [];
                break;
            case "created":
            case "created_start":
            case "created_end":
                n.createdStartDate = null,
                n.createdEndDate = null;
                break;
            case "source":
                n.reportSource = null;
                break;
            case "template":
                n.reportTemplate = null
            }
            H()
        }

        function I(e) {
            "all_vulnerabilities" === e && t.pageState.noTargetsInSystem || m.chooseReportOptions().then(function(t) {
                return k(t.templateId, e)
            })
        }

        function k(e, n) {
            return h.generateNewReport(e, {
                listType: n
            },
            {
                tracker: t.loadingTracker,
                onRetry: function() {
                    function t() {
                        return k(e, n)
                    }
                    return t
                } ()
            }).then(function() {
                d.success(u.getString("正在创建报表"))
            }).then(B)
        }

        function A() {
            var n = e.extend(t.$new(), {
                message: u.getPlural(_(), c("是否要删除选定的报表?"), c("是否要删除选定的报表?"))
            });
            return x.confirm({
                scope: n
            }).then(function() {
                return L()
            }).then(function() {
                return W()
            }).
            finally(function() {
                return n.$destroy()
            })
        }

        function L() {
            var e = t.loadingTracker.createPromise(),
            n = 0;
            return b().reduce(function(e, r) {
                return e.then(function() {
                    return h.removeReport(r.reportId)
                }).then(function() {
                    t.reportList.gridApi.selection.unSelectRow(r),
                    t.reportList.items.splice(t.reportList.items.indexOf(r), 1),
                    n++
                })
            },
            i.when()).then(function() {
                if (void 0 !== t.reportList.nextCursor && n > 0) return P({
                    limit: n
                })
            }).
            finally(e.resolve)
        }

        function $() {
            return p.currentUrlEncoded()
        }

        function E() {
            return v.addTarget().then(function(e) {
                o.go("app.target_config", {
                    returnUrl: $(),
                    targetId: e.targetId
                },
                {
                    inherit: !1
                })
            })
        }

        function R() {
            if (K) try {
                s.cancel(K)
            } finally {
                K = null
            }
            t.loadingTracker.cancel()
        }

        function P(n) {
            var r = t.loadingTracker.createPromise();
            return i.when().then(function() {
                t.reportList.gridApi.infiniteScroll.saveScrollPercentage()
            }).then(function() {
                var r = n && e.isNumber(n.limit) ? n.limit: g.LIST_PAGE_SIZE;
                return h.getReports(M(), t.reportList.nextCursor, r, {
                    onRetry: function() {
                        function e() {
                            return P(n)
                        }
                        return e
                    } ()
                })
            }).then(function(n) {
                var r = n.reports,
                i = n.pagination;
                r.forEach(function(e) {
                    t.reportList.items.find(function(t) {
                        return t.reportId === e.reportId
                    }) || t.reportList.items.push(e)
                }),
                t.reportList.nextCursor = i.nextCursor,
                t.reportList.gridApi.infiniteScroll.dataLoaded(!1, e.isDefined(i.nextCursor))
            }).
            catch(function(e) {
                return t.reportList.gridApi.infiniteScroll.dataLoaded(!1, !1),
                i.reject(e)
            }).
            finally(r.resolve)
        }

        function N() {
            var e = t.loadingTracker.createPromise();
            return h.getReportTemplates({
                onRetry: function() {
                    function e() {
                        return N()
                    }
                    return e
                } ()
            }).then(function(e) {
                t.searchFilters.reportTemplateList = e,
                t.searchFilters.reportTemplate = f.getStateParam("template", !1, e.map(function(e) {
                    return e.templateId
                })),
                O()
            }).
            finally(e.resolve)
        }

        function D(e, t) {
            t !== e && (B(), O(), H())
        }

        function U(e, t) {
            e === t || Y || o.reload(o.current)
        }

        function F() {
            z || (z = !0, i.when().then(function() {
                if (!t.$$destroyed) {
                    var n = i.defer(),
                    o = t.$on("$destroy",
                    function() {
                        return n.resolve()
                    }),
                    a = t.reportList.gridApi.grid.renderContainers.body.renderedRows.map(function(e) {
                        return e.entity
                    });
                    return r(a, [], !1,
                    function(t, n) {
                        return t = t.value,
                        n = n.value,
                        e.isDefined(t.$$refreshed) && e.isDefined(n.$$refreshed) ? t.$$refreshed < n.$$refreshed ? -1 : 1 : e.isDefined(t.$$refreshed) ? 1 : -1
                    }).filter(function(e) {
                        return "processing" === e.status || "queued" === e.status
                    }).slice(0, 5).reduce(function(r, o) {
                        return r.then(function() {
                            if (null === K) return i.reject();
                            var r = {
                                timeout: n.promise,
                                noPublishError: !0,
                                noLoadingTracker: !0
                            };
                            return h.getReport(o.reportId, r).then(function(n) {
                                if (e.extend(o, n, {
                                    $$refreshed: +new Date
                                }), "processing" === o.status || "queued" === o.status) {
                                    if (t.reportList.items.indexOf(o) > 0) for (var r = 0; r < t.reportList.items.length; r++) {
                                        var i = t.reportList.items[r];
                                        if ("processing" === o.status && i.status !== o.status || "processing" === o.status && i.status === o.status && o.created > i.created) {
                                            t.reportList.items.splice(r, 0, o),
                                            t.reportList.items.splice(t.reportList.items.lastIndexOf(o), 1);
                                            break
                                        }
                                        if (i.status === o.status && o.created > i.created) {
                                            t.reportList.items.splice(r, 0, o),
                                            t.reportList.items.splice(t.reportList.items.lastIndexOf(o), 1);
                                            break
                                        }
                                    }
                                }
                            })
                        })
                    },
                    i.when()).
                    finally(o)
                }
            }).
            finally(function() {
                z = !1,
                t.$$destroyed || (K = s(F, g.LIST_REFRESH_INTERVAL))
            }))
        }

        function M() {
            var e = [],
            r = t.searchFilters;
            return r.status.length > 0 && e.push("status:" + r.status.join(",")),
            r.reportSource && ("targets" === r.reportSource ? e.push("source:targets,vulnerabilities") : "scans" === r.reportSource ? e.push("source:scans,scan_result,scan_vulnerabilities") : e.push("source:" + r.reportSource)),
            r.reportTemplate && e.push("template_id:" + r.reportTemplate),
            r.createdStartDate && e.push("created:>=" + encodeURIComponent(n(r.createdStartDate, "yyyy-MM-ddTHH:mm:ss.sssZ"))),
            r.createdEndDate && e.push("created:<=" + encodeURIComponent(n(r.createdEndDate, "yyyy-MM-ddTHH:mm:ss.sssZ"))),
            e.join(";")
        }

        function V() {
            t.reportList.gridApi && t.reportList.gridApi.infiniteScroll.resetScroll(!1, void 0 !== t.reportList.nextCursor)
        }

        function O() {
            var e = t.searchFilters,
            r = [];
            if (e.status.length > 0 && r.push({
                key: "status",
                label: c("状态:"),
                value: e.status.map(function(t) {
                    var n = e.statusList.find(function(e) {
                        return e.value === t
                    });
                    return u.getString(n.text)
                }).join(", ")
            }), e.reportSource && r.push({
                key: "source",
                label: c("报告类型:"),
                value: e.reportSourceList.find(function(t) {
                    return t.value === e.reportSource
                }).text
            }), e.reportTemplate) {
                var i = e.reportTemplateList.find(function(t) {
                    return t.templateId === e.reportTemplate
                });
                r.push({
                    key: "template",
                    label: c("报告模板:"),
                    value: i ? i.name: "N/A"
                })
            }
            e.createdEndDate && e.createdStartDate ? r.push({
                key: "created",
                label: c("创建于:"),
                value: n(e.createdStartDate) + " and " + n(e.createdEndDate)
            }) : e.createdEndDate ? r.push({
                key: "created_end",
                label: c("在此之前的创建:"),
                value: n(e.createdEndDate)
            }) : e.createdStartDate && r.push({
                key: "created_start",
                label: c("在此之后的创建:"),
                value: n(e.createdStartDate)
            }),
            t.searchFilters.filterTags = r
        }

        function H() {
            Y = !0;
            var e = t.searchFilters,
            r = {};
            e.status.length > 0 && (r.status = e.status.join(",")),
            e.reportSource && (r.source = e.reportSource),
            e.reportTemplate && (r.template = e.reportTemplate),
            e.createdStartDate && (r.created_start = n(e.createdStartDate, "yyyy-MM-ddTHH:mm:ss.sssZ")),
            e.createdEndDate && (r.created_end = n(e.createdEndDate, "yyyy-MM-ddTHH:mm:ss.sssZ")),
            o.go(o.current.name, r, {
                inherit: !1
            }).
            finally(function() {
                Y = !1
            })
        }

        function j() {
            T.set("list-reports", t.reportList.gridApi.saveState.save())
        }

        function q() {
            var e = T.get("list-reports");
            e && t.reportList.gridApi.saveState.restore(t, e)
        }

        function G() {
            T.remove("list-reports"),
            o.reload(o.current)
        }

        function B() {
            t.reportList.items.splice(0),
            t.reportList.nextCursor = void 0,
            t.reportList.gridApi && t.reportList.gridApi.selection && t.reportList.gridApi.selection.clearSelectedRows(),
            V();
            var e = i.defer();
            return s(function() {
                Q.promise.then(function() {
                    return P()
                }).then(function() {
                    return e.resolve()
                },
                function(t) {
                    return e.reject(t)
                })
            }),
            e.promise
        }

        function W() {
            return i.when().then(function() {
                return S.getTargets(void 0, void 0, 1, {
                    noPublishError: !0
                }).then(function(e) {
                    var n = e.targets;
                    if (t.pageState.noTargetsInSystem = 0 === n.length, !t.pageState.noTargetsInSystem) return y.getScans(void 0, void 0, 1, {
                        noPublishError: !0
                    }).then(function(e) {
                        var n = e.scans;
                        t.pageState.noScansInSystem = 0 === n.length
                    });
                    t.pageState.noScansInSystem = !0
                })
            }).then(function() {
                return h.getReports(void 0, void 0, 1, {
                    noPublishError: !0
                }).then(function(e) {
                    var n = e.reports;
                    t.pageState.noReportsInSystem = 0 === n.length
                })
            })
        }
        var K, z, Y = !1,
        Q = i.defer(),
        Z = Object.freeze([{
            value: "all_vulnerabilities",
            text: c("所有的漏洞报告")
        },
        {
            value: "targets",
            text: c("目标报告")
        },
        {
            value: "scans",
            text: c("扫描报告")
        }]);
        t.loadingTracker = l({
            activationDelay: g.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        t.reportList = {
            items: [],
            nextCursor: void 0
        },
        t.reportList.gridOptions = {
            data: t.reportList.items,
            appScopeProvider: t,
            enableColumnMenus: !1,
            enableColumnResizing: !0,
            enableGridMenu: !0,
            enableSelectAll: !1,
            enableSelectionBatchEvent: !1,
            enableSorting: !1,
            useExternalSorting: !0,
            enableFiltering: !1,
            useExternalFiltering: !0,
            saveFilter: !1,
            saveFocus: !1,
            saveGrouping: !1,
            savePinning: !1,
            saveSelection: !1,
            saveSort: !1,
            saveTreeView: !1,
            columnDefs: [{
                displayName: u.getString("报告模板"),
                field: "templateName",
                width: 200
            },
            {
                cellFilter: "axReportSource:true",
                displayName: u.getString("报告类型"),
                field: "source",
                width: 200
            },
            {
                displayName: u.getString("目标"),
                field: "source.target.address",
                width: 320
            },
            {
                cellFilter: "date:'medium'",
                displayName: u.getString("创建于"),
                field: "created",
                width: 180
            },
            {
                cellTemplate: __axtr("/templates/reports/cell/status.html"),
                displayName: u.getString("状态"),
                field: "status",
                width: 130
            },
            {
                cellTemplate: __axtr("/templates/reports/cell/actions.html"),
                displayName: "",
                name: "actions",
                width: 120
            }],
            gridMenuCustomItems: [{
                title: u.getString("重置"),
                action: G
            }],
            getRowIdentity: function() {
                function e(e) {
                    return e.reportId
                }
                return e
            } (),
            rowIdentity: function() {
                function e(e) {
                    return e.reportId
                }
                return e
            } (),
            infiniteScrollRowsFromEnd: 20,
            infiniteScrollUp: !1,
            infiniteScrollDown: !0,
            onRegisterApi: function() {
                function e(e) {
                    t.reportList.gridApi = e,
                    e.infiniteScroll.on.needLoadMoreData(t, P),
                    e.colResizable.on.columnSizeChanged(t, j),
                    e.core.on.columnVisibilityChanged(t, j),
                    e.core.on.sortChanged(t, j),
                    Q.resolve(e)
                }
                return e
            } ()
        },
        t.searchFilters = {
            status: f.getStateParam("status", !0, g.REPORT_STATUS.map(function(e) {
                return e.value
            })),
            statusList: g.REPORT_STATUS,
            reportSource: f.getStateParam("source", !1, Z.map(function(e) {
                return e.value
            })),
            reportSourceList: Z,
            reportTemplate: f.getStateParam("template", !1),
            reportTemplateList: [],
            createdStartDate: a.created_start ? new Date(f.getStateParam("created_start")) : null,
            createdEndDate: a.created_end ? new Date(f.getStateParam("created_end")) : null,
            createdCalendarVisible: !1,
            filterTags: []
        },
        t.filterAsideVisible = !1,
        t.createdStartDateDatePickerOptions = {
            showWeeks: !1
        },
        t.createdEndDateDatePickerOptions = {
            showWeeks: !1
        },
        t.pageState = {
            noTargetsInSystem: !1,
            noScansInSystem: !1,
            noReportsInSystem: !1
        },
        t.toggleFilter = C,
        t.selectedItems = b,
        t.selectedItemsCount = _,
        t.removeFilterTag = w,
        t.onGenerateReport = I,
        t.onDeleteSelectedReports = A,
        t.deleteSelectedReports = L,
        t.currentUrl = $,
        t.addTargetModal = E,
        t.$watch("searchFilters.status", D),
        t.$watch("searchFilters.reportSource", D),
        t.$watch("searchFilters.reportTemplate", D),
        t.$watch("searchFilters.createdStartDate", D),
        t.$watch("searchFilters.createdEndDate", D),
        t.$watchCollection(function() {
            return a
        },
        U),
        t.$on("$destroy", R),
        t.$on("axScrollTop", V),
        function() {
            p.setDocumentTitle(c("报告")),
            p.setCurrentSection("reports"),
            O(),
            Q.promise.then(function() {
                return W().
                catch(function() {
                    return null
                })
            }).then(function() {
                return N().
                catch(function() {
                    return null
                })
            }).then(P).
            finally(function() {
                q(),
                K = s(F, g.LIST_REFRESH_INTERVAL)
            })
        } ()
    }

    function n(e, n) {
        e.state("app.list_reports", {
            url: "reports/?status=&source=&created_start=&created_end=&template=&returnUrl=",
            controller: t,
            templateUrl: __axtr("/templates/reports/list-reports.html"),
            reloadOnSearch: !1,
            data: {
                page: {
                    icon: "fa-file-text",
                    section: "reports"
                }
            },
            onEnter: function() {
                function e(e, t) {
                    e.globalHelpLink = t.HELP_LINKS["reports.generate"]
                }
                return e.$inject = ["$rootScope", "axConstant"],
                e
            } (),
            onExit: function() {
                function e(e) {
                    e.globalHelpLink = ""
                }
                return e.$inject = ["$rootScope"],
                e
            } ()
        })
    }
    t.$inject = ["$scope", "dateFilter", "orderByFilter", "$q", "$state", "$stateParams", "$timeout", "gettext", "gettextCatalog", "promiseTracker", "toastr", "axPage", "axStateHelpers", "axConstant", "ReportsApi", "axReportOptionsModal", "axAddTargetModal", "ScansApi", "TargetsApi", "axUserPreferences", "axGeneralModal"],
    n.$inject = ["$stateProvider", "gettext"],
    e.module("WVS").config(n)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function e(e, t, n) {
            this.$q = e,
            this.axScanningOptionsModal = t,
            this.ScansApi = n
        }
        return e.prototype.createScansWizard = function(e, t) {
            var n = this,
            r = n.axScanningOptionsModal,
            i = n.$q,
            o = n.ScansApi;
            return r.chooseScanningOptions({
                targetCount: e.length
            }).then(function(n) {
                return 0 === e.length ? n: function(n) {
                    var r = i.defer();
                    return e.reduce(function(e, i) {
                        return e.then(function() {
                            var e, a;
                            switch (n.scheduleType) {
                            case "instant":
                                e = null;
                                break;
                            case "future":
                                e = n.scheduleDate;
                                break;
                            case "recurrent":
                                a = n.recurrence
                            }
                            var s = {};
                            return s.targetId = i.targetId,
                            s.profileId = n.scanProfile,
                            s.reportTemplateId = n.reportType ? n.reportType: void 0,
                            s.schedule = {},
                            s.schedule.disabled = !1,
                            s.schedule.timeSensitive = n.timeSensitive,
                            s.schedule.recurrence = a,
                            s.schedule.scheduleDate = e,
                            o.scheduleScan(s, {
                                tracker: t
                            }).then(function(e) {
                                r.notify({
                                    target: i,
                                    scanId: e.scanId,
                                    scanningOptions: n
                                })
                            })
                        })
                    },
                    i.when()).then(r.resolve, r.reject, r.notify),
                    r.promise
                } (n)
            })
        },
        e.$inject = ["$q", "axScanningOptionsModal", "ScansApi"],
        e
    } ();
    e.module("WVS").service("axScansModal", t)
} (angular),
function(e) {
    "use strict";
    var t = function() {
        function t(e) {
            this.$uibModal = e
        }
        return t.$inject = ["$uibModal"],
        t.prototype.confirm = function(t) {
            return t = e.extend({},
            t, {
                templateUrl: __axtr("/templates/modals/general/confirm-action.modal.html")
            }),
            this.$uibModal.open(t).result
        },
        t.prototype.alert = function(t) {
            return t = e.extend({},
            t, {
                templateUrl: __axtr("/templates/modals/general/alert.modal.html")
            }),
            this.$uibModal.open(t).result
        },
        t
    } ();
    e.module("WVS").service("axGeneralModal", t)
} (angular),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u, l, d, p, f, g, h, m, v, y, S, T) {
        function x() {
            return s.signOut({
                noLoginRedirect: !0,
                noPublishError: !0
            }).
            finally(function() {
                n.authUser = {}
            })
        }

        function b() {
            n.$applyAsync(function() {
                return e.element(".cell.scrollable").scrollTop(0)
            }),
            n.$broadcast("axScrollTop")
        }

        function _(e, n) {
            return o.go(e, n, {
                inherit: !1,
                reload: t.get(o, "current.name", !0)
            })
        }

        function C() {
            n.app.asideFolded = !n.app.asideFolded,
            p.set("aside_folded", n.app.asideFolded)
        }

        function w(e) {
            if (n.app.locale.value !== e.value) {
                var t = n.loadingTracker.createPromise();
                return l.changeLanguage(e.value).then(function() {
                    n.app.locale = e,
                    i.$emit("axLocaleChanged", {
                        locale: e
                    })
                }).
                finally(t.resolve)
            }
            return r.when()
        }

        function I(e) {
            return v.consumeNotification(e.eventId).then(R)
        }

        function k() {
            return v.consumeAll().then(R)
        }

        function A() {
            var e = n.loadingTracker.createPromise();
            S.enableSystemUpgrade().then(function(e) {
                n.updateInfo = e
            }).
            finally(e.resolve)
        }

        function L(e) {
            var r = p.get(u.MIS);
            Array.isArray(r) || (r = []);
            var i = r.findIndex(function(t) {
                return t.scanningApp === e.scanningApp && t.scanSessionId === e.scanSessionId
            });
            i > -1 ? r[i] = e: r.push(e),
            p.set(u.MIS, r),
            t.remove(n.manualIntervention.items, e)
        }

        function $() {
            q && (a.cancel(q), q = null),
            n.loadingTracker.cancel()
        }

        function E(e) {
            if (e) {
                if (e.firstName || e.lastName) return [e.firstName, e.lastName].join(" ").trim();
                if (e.email) return e.email
            }
            return ""
        }

        function R() {
            if (G) return r.when();
            var e = [v.getUnconsumedNotificationCount({
                noPublishError: !0,
                noLoadingTracker: !0
            }), v.getNotifications(void 0, void 0, void 0, {
                noPublishError: !0,
                noLoadingTracker: !0
            }), S.getSystemInfo({
                noPublishError: !0,
                noLoadingTracker: !0
            })];
            return G = !0,
            r.all(e).then(function(e) {
                var t = e[0],
                r = e[1].notifications,
                i = e[2].updateInfo;
                n.notifications.count = t,
                n.notifications.items = r,
                n.updateInfo = i,
                "none" !== n.updateInfo.status && n.notifications.count++
            }).
            finally(function() {
                K = Date.now(),
                G = !1,
                n.$$destroyed || (q = a(function() {
                    return R()
                },
                u.NOTIFICATIONS_POLL_INTERVAL))
            })
        }

        function P() {
            return r.when().then(function() {
                return W ? r.reject() : (W = !0, s.getManualInterventionStatus({
                    noPublishError: !0,
                    noLoadingTracker: !0
                }))
            }).then(function(e) {
                if (e = e.filter(function(e) {
                    return !! e.data
                }), !n.$$destroyed) {
                    var r = n.manualIntervention.items.length;
                    n.manualIntervention.items = [];
                    var i = p.get(u.MIS),
                    o = function(e) {
                        return !! (Array.isArray(i) && i.length > 0) && !!i.find(function(t) {
                            return t.uniqueKey === e.uniqueKey
                        })
                    };
                    e.forEach(function(e) {
                        o(e) || n.manualIntervention.items.push(e)
                    }),
                    Array.isArray(i) && i.length > 0 &&
                    function() {
                        for (var n = 0; n < i.length;) !
                        function() {
                            var r = i[n];
                            if (t.findIndex(e,
                            function(e) {
                                return r.scanningApp === e.scanningApp && r.scanSessionId === e.scanSessionId
                            }) < 0 || e[n].old > 300) return i.splice(n, 1),
                            "continue";
                            n++
                        } ()
                    } (),
                    Array.isArray(i) && p.set(u.MIS, i),
                    null == B && n.manualIntervention.items.length > r && (B = T.warning("一些扫描需要手动干预.请检查通知.", {
                        timeOut: 0,
                        extendedTimeOut: 0,
                        preventOpenDuplicates: !0,
                        closeButton: !1,
                        tapToDismiss: !0,
                        autoDismiss: !1
                    })),
                    0 === n.manualIntervention.items.length && null !== B && (T.clear(B, !1), B = null)
                }
            }).
            finally(function() {
                W = !1,
                n.$$destroyed || a(P, u.NOTIFICATIONS_POLL_INTERVAL)
            })
        }

        function N(e, t) {
            t.hidden ? D() : U()
        }

        function D() {
            q && (a.cancel(q), q = null)
        }

        function U() {
            if (D(), K) {
                var e = Date.now();
                if (K + u.NOTIFICATIONS_POLL_INTERVAL < e) return void(q = a(function() {
                    return R()
                },
                0))
            }
            q = a(function() {
                return R()
            },
            u.NOTIFICATIONS_POLL_INTERVAL)
        }

        function F(t) {
            n.authUser = e.copy(t || {}),
            n.authUser.displayName = E(t)
        }

        function M(e) {
            e && (n.updateInfo = e.updateInfo, n.licenseInfo = e.license)
        }

        function V() {
            var e = m.getCurrentLanguage(),
            t = n.app.locales.find(function(t) {
                return t.value === e
            });
            t && (n.app.locale = t, i.currentLocaleId = t.value)
        }

        function O() {
            n.notifications.tooltip = h(0 === n.notifications.count ? "暂无新通知": "新通知")
        }

        function H(e) {
            v.consumeNotification(e).then(function() {
                1 === t.remove(n.notifications.items,
                function(t) {
                    return t.eventId === e
                }).length && n.notifications.count--
            })
        }

        function j(e, t) {
            var n = t.scan;
            t.actionRequired && T.warning(m.getString("关于" + n.target.address + " 的扫描需要手动干预"), {
                allowHtml: !1,
                autoDismiss: !0,
                closeButton: !1,
                preventOpenDuplicates: !0,
                tapToDismiss: !0,
                timeOut: 1e4
            })
        }
        var q = null,
        G = !1,
        B = null,
        W = !1,
        K = null;
        n.loadingTracker = y({
            activationDelay: u.PROMISE_TRACKER_ACTIVATION_DELAY
        }),
        n.authUser = e.extend({},
        c, {
            displayName: E(c)
        }),
        n.notifications = {
            count: 0,
            items: [],
            tooltip: ""
        },
        n.app = {
            asideFolded: !!p.get("aside_folded"),
            locales: [{
                value: "en_GB",
                text: "English (United Kingdom)",
                flag: "gb"
            }],
            sections: Object.freeze([{
                name: "dashboard",
                title: h("仪表盘"),
                state: "app.dash",
                icon: "fa-dashboard"
            },
            {
                name: "targets",
                title: h("目标"),
                state: "app.list_targets",
                icon: "fa-dot-circle-o"
            },
            {
                name: "vulns",
                title: h("漏洞"),
                state: "app.list_vulns",
                icon: "fa-bug",
                stateParams: {
                    status: "open"
                }
            },
            {
                name: "scans",
                title: h("扫描"),
                state: "app.list_scans",
                icon: "fa-area-chart"
            },
            {
                name: "reports",
                title: h("报告"),
                state: "app.list_reports",
                icon: "fa-file-text"
            },
            {
                name: "settings",
                title: h("设置"),
                state: "app.edit_settings",
                icon: "fa-cog"
            }])
        },
        n.app.locale = n.app.locales[0],
        i.currentLocaleId = n.app.locale.value,
        n.$state = o,
        n.updateInfo = null,
        n.licenseInfo = null,
        n.currentUser = f.get(),
        n.manualIntervention = {
            items: []
        },
        e.extend(n, {
            changeLocale: w,
            consumeAllNotifications: k,
            consumeNotification: I,
            navigateTo: _,
            onEnableSystemUpdate: A,
            onMarkManualInterventionItem: L,
            scrollTop: b,
            signOut: x,
            toggleAside: C
        }),
        n.$on("gettextLanguageChanged", V),
        n.$on("$destroy", i.$on(u.API_EVENTS.CURRENT_USER_IDENTITY_UPDATED,
        function(e, t) {
            F(t.identity)
        })),
        n.$on("$destroy", i.$on(u.API_EVENTS.SYSTEM_INFO_LOADED,
        function(e, t) {
            M(t.sysInfo)
        })),
        n.$on("$destroy", $),
        n.$on("$destroy", i.$on("axConsumeNotification",
        function(e, t) {
            H(t.eventId)
        })),
        n.$on("$destroy", i.$on(u.API_EVENTS.SCAN_CREATED, j)),
        n.$on("$destroy", i.$on("axDocumentVisibilityChanged", N)),
        n.$watch("notifications.count", O),
        n.$watch(function() {
            return f.get()
        },
        function(e) {
            n.currentUser = e
        }),
        function() {
            d.setDocumentTitle(h("Acunetix")),
            d.setCurrentSection(""),
            R(),
            V(),
            P()
        } (),
        jQuery(window).one("beforeunload",
        function() {
            if (n.manualIntervention.items.length > 0) return h("Some scans require manual intervention. Are you sure you want to close/reload this page?")
        }),
        n.$on("destroy",
        function() {
            return jQuery(window).off("beforeunload")
        })
    }

    function r(e) {
        e.state("app", {
            url: "/",
            abstract: !0,
            templateUrl: __axtr("/templates/layout/shell.html"),
            controller: n,
            resolve: {
                authUser: ["AccountApi", "$q", "$state", "axPage",
                function(e, t, n, r) {
                    return e.getProfile({
                        noLoadingTracker: !0,
                        noPublishError: !1
                    }).
                    catch(function(e) {
                        return t.when({
                            firstName: "N/A"
                        })
                    })
                }]
            }
        })
    }
    n.$inject = ["$scope", "$q", "$rootScope", "$state", "$timeout", "AccountApi", "authUser", "axConstant", "axLocale", "axPage", "axUserPreferences", "CurrentUser", "dateFilter", "gettext", "gettextCatalog", "NotificationsApi", "promiseTracker", "SystemConfigApi", "toastr"],
    e.module("WVS").config(["$stateProvider", r])
} (angular, _),
function(e) {
    "use strict";

    function t() {
        return {
            restrict: "A",
            scope: !1,
            compile: function() {
                function t(t) {
                    t.addClass("text-muted").attr("href", t.attr("href") || "http://www.acunetix.com/support").attr("target", "_blank").prepend(e.element('<i class="fa fa-fw fa-question-circle"></i>'))
                }
                return t
            } ()
        }
    }
    e.module("WVS").directive("axSupportLink", t)
} (angular),
function(e) {
    "use strict";

    function t(e) {
        return {
            restrict: "A",
            link: function() {
                function t(t, n) {
                    function r(e) {
                        e ? n.removeClass("hidden") : n.addClass("hidden")
                    }
                    n.addClass("fa fa-spinner fa-spin");
                    var i = t.$watch(function() {
                        return e.globalPromiseTracker.active()
                    },
                    r);
                    t.$on("$destroy", i),
                    r(!1)
                }
                return t
            } ()
        }
    }
    t.$inject = ["$rootScope"],
    e.module("WVS").directive("axSpinner", t)
} (angular),
function(e) {
    "use strict";

    function t() {
        return {
            require: "ngModel",
            link: function() {
                function e(e, t, i, o) {
                    o.$validators[n] = function(e) {
                        return !! e && r.test(e)
                    }
                }
                return e
            } ()
        }
    }
    var n = "passwordPolicy",
    r = /(?=^.{8,}$)((?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])|(?=.*?\d)(?=.*?[^\w\d\s])(?=.*?[a-z])|(?=.*?[^\w\d\s])(?=.*?[A-Z])(?=.*?[a-z])|(?=.*?\d)(?=.*?[A-Z])(?=.*?[^\w\d\s]))^.*/;
    e.module("WVS").directive(n, t)
} (angular),
function(e) {
    "use strict";

    function t() {
        return {
            restrict: "A",
            link: function() {
                function t(t, n, r) {
                    var i = e.element('<div class="ax-overlay hidden" tabindex="1"></div>').appendTo(n).on("keyup keydown keypress input click dblclick mousedown mouseup",
                    function(e) {
                        e.preventDefault(),
                        e.stopPropagation()
                    }),
                    o = t.$watch(r.axOverlay,
                    function(e) {
                        e ? i.removeClass("hidden") : i.addClass("hidden")
                    });
                    t.$on("$destroy", o),
                    n.on("$destroy",
                    function() {
                        return i.remove()
                    })
                }
                return t
            } ()
        }
    }
    e.module("WVS").directive("axOverlay", [t])
} (angular),
function(e, t) {
    "use strict";

    function n(n, r, i, o, a, s, c, u) {
        function l(e) {
            return function() {
                o.$applyAsync(e)
            }
        }

        function d(t, n, r) {
            return i.when().then(function() {
                var e = {
                    noLoadingTracker: !0,
                    noPublishError: !0
                };
                return r ? u.getExport(n, e) : u.getReport(n, e)
            }).
            catch(function() {
                var e = {
                    errorMessage: c("你的 " + (r ? "生成内容": "报告") + " 无法下载 [" + (r ? "生成内容": "报告") + " 已删除]")
                };
                return o.$emit("axError", e),
                i.reject(e)
            }).then(function(t) {
                e.element("#download-helper").attr("src", t.downloadLinkXML || t.downloadLinkPDF || t.downloadLinkHTML)
            }).then(function() {
                o.$emit("axConsumeNotification", {
                    eventId: t
                })
            })
        }
        return {
            restrict: "A",
            link: function() {
                function c(c, u, p) {
                    function f(e) {
                        u.one("click", ".ax-notification-event-name", l(function() {
                            i.when().then(e).then(function() {
                                o.$emit("axConsumeNotification", {
                                    eventId: h.eventId
                                })
                            }).
                            catch(function(e) {
                                o.$emit("axError", e)
                            })
                        }))
                    }
                    var g = r(p.axEventResourceLink),
                    h = g(c);
                    switch (h.resourceType) {
                    case 5:
                        if (h.resourceId) {
                            var m = h.eventData ? h.eventData.scanSessionId: null;
                            if (m) {
                                var v = {
                                    scanId: h.resourceId,
                                    resultId: m,
                                    view: "stats",
                                    returnUrl: s.currentUrlEncoded()
                                };
                                f(function() {
                                    a.go("app.scan_details", v, {
                                        inherit: !1
                                    })
                                })
                            }
                        }
                        break;
                    case 6:
                        if (h.resourceId) {
                            var y = {
                                scanId: h.eventData.scanId,
                                resultId: h.resourceId,
                                view: "stats",
                                returnUrl: s.currentUrlEncoded()
                            };
                            f(function() {
                                a.go("app.scan_details", y, {
                                    inherit: !1
                                })
                            })
                        }
                        break;
                    case 7:
                        if (h.resourceId && (u.css({
                            color: "#3a3f51",
                            cursor: "default"
                        }), 601 === h.eventTypeId)) {
                            var S = e.element('<button class="btn btn-danger btn-xs pull-right m-t-n-sm m-r-lg">Download</button>');
                            u.append(n(S)(c)),
                            S.on("click", l(function() {
                                return d(h.eventId, h.resourceId, !1)
                            }))
                        }
                        break;
                    case 8:
                        f(function() {
                            a.go("app.edit_settings", {
                                section: "workers"
                            },
                            {
                                inherit: !1
                            })
                        });
                        break;
                    case 9:
                        if (h.resourceId) {
                            var T = h.resourceId;
                            e.isString(T) && (T = t.trim(T, "(),")),
                            f(function() {
                                a.go("app.vuln_details", {
                                    vulnId: T
                                },
                                {
                                    inherit: !1
                                })
                            })
                        }
                        break;
                    case 10:
                        if (h.resourceId && (u.css({
                            color: "#3a3f51",
                            cursor: "default"
                        }), 603 === h.eventTypeId)) {
                            var S = e.element('<button class="btn btn-danger btn-xs pull-right m-t-n-sm m-r-lg">Download</button>');
                            u.append(n(S)(c)),
                            S.on("click", l(function() {
                                return d(h.eventId, h.resourceId, !0)
                            }))
                        }
                    }
                }
                return c
            } ()
        }
    }
    n.$inject = ["$compile", "$parse", "$q", "$rootScope", "$state", "axPage", "gettext", "ReportsApi"],
    e.module("WVS").directive("axEventResourceLink", n)
} (angular, _),
function(e) {
    "use strict";

    function t() {
        return {
            require: "ngModel",
            scope: (e = {},
            e[n] = "=", e),
            link: function() {
                function e(e, t, r, i) {
                    i.$validators[n] = function(t) {
                        return t == e.equalTo
                    },
                    e.$watch(n,
                    function() {
                        return i.$validate()
                    })
                }
                return e
            } ()
        };
        var e
    }
    var n = "equalTo";
    e.module("WVS").directive(n, t)
} (angular),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l, d, p, f, g, h, m, v, y, S, T) {
        function x(e) {
            A(e.name),
            v.remove(l.API_AUTH_HEADER),
            g.set(null),
            T.clear(),
            c.dismissAll(),
            a.go("login", {},
            {
                inherit: !1
            })
        }

        function b(e) {
            A(e.name),
            T.clear(),
            S.getScans("status:completed", void 0, 1, {
                noPublishError: !0,
                noLoadingTracker: !0
            }).then(function(e) {
                if (! (e.scans.length > 0)) return o.reject();
                r.url("/dashboard/").replace()
            }).
            catch(function() {
                r.url("/").replace()
            })
        }

        function C(e) {
            A(e.name),
            v.remove(l.API_AUTH_HEADER),
            g.set(null),
            T.clear(),
            a.go("login", {},
            {
                inherit: !1
            })
        }

        function w(e, n) {
            e.preventDefault(),
            t.$emit("axError", new Error(h("请求的页面不可用"))),
            i.warn("状态 " + n.to + "未定义")
        }

        function I(e, n, r, o, c, u) {
            e.preventDefault(),
            t.$emit("axError", new Error(h("请求的页面不可用"))),
            i.warn("无法过渡到状态" + n.name + ": " + u.message),
            o && !o.abstract || s(function() {
                return a.go("app.list_targets", {},
                {
                    inherit: !1
                })
            },
            100)
        }

        function k() {
            u.location.reload(!0)
        }

        function A(t) {
            e.forEach(n.info(),
            function(e, t) {
                0 === t.indexOf("ax") && n.get(t).removeAll()
            })
        }

        function L(e) {
            var n = "",
            r = "";
            if (e) {
                var i = e.license,
                o = void 0,
                a = new Date;
                if (a = new Date(a.setDate(a.getDate() + l.LICENSE_EXPIRY_DAYS)), i.maintenance) {
                    var s = "";
                    switch (i.productCode) {
                    case "WVSE":
                        s = "WVSEUMA";
                        break;
                    case "WVSC":
                        s = "WVSCMA";
                        break;
                    case "WVSC10":
                        s = "WVSC10MA";
                        break;
                    case "WVSF05Q":
                        s = "WVSF05QPMA";
                        break;
                    case "WVSF10Q":
                        s = "WVSF10QPMA"
                    }
                    r = o = "https://erp.acunetix.com/orderform/default.aspx?upg=" + encodeURIComponent(i.productCode) + "&support1=" + encodeURIComponent(s) + "&key=" + i.licenseKey,
                    i.maintenance.expired ? n = m.getString('许可证到期日{{date}}. 点击 <a href="{{upgradeURL}}">这里</a> 更新', {
                        date: f(i.maintenance.expires, "mediumDate"),
                        upgradeURL: o
                    }) : i.maintenance.expires && a > i.maintenance.expires && (n = m.getString('许可证到期日{{date}}. 点击 <a href="{{upgradeURL}}">这里</a> 更新', {
                        date: f(i.maintenance.expires, "mediumDate"),
                        upgradeURL: o
                    }))
                } else i.expired ? (r = o = "https://erp.acunetix.com/ordering/", n = m.getString('许可证到期日{{date}}. 点击 <a href="{{upgradeURL}}">这里</a> 更新', {
                    date: f(i.expires, "mediumDate"),
                    upgradeURL: o
                })) : i.expires && a > i.expires && (r = o = "https://erp.acunetix.com/ordering/", n = m.getString('许可证到期日{{date}}. 点击 <a href="{{upgradeURL}}">这里</a> 更新', {
                    date: f(i.expires, "mediumDate"),
                    upgradeURL: o
                }));
                t.licenseWarningMessageHtml = n,
                t.licenseUpgradeLink = r
            }
        }
        t.$on("$stateChangeError", I),
        t.$on("$stateNotFound", w),
        t.$on("axAuthRequired", x),
        t.$on("axLocaleChanged", k),
        t.$on(l.API_EVENTS.USER_LOGGED_IN, b),
        t.$on(l.API_EVENTS.USER_LOGGED_OUT, C),
        t.$on(l.API_EVENTS.SYSTEM_INFO_LOADED,
        function(e, t) {
            L(t.sysInfo)
        }),
        p.init(),
        t.globalPromiseTracker = y({
            activationDelay: 300
        }),
        t.globalHelpLink = "",
        t.scrollTopActionVisible = !0,
        t.appConfig = {
            showBusinessCriticality: !1
        },
        function() {
            var t = function(t, n) {
                var r = v.get(t);
                if (e.isNumber(r) && r !== l[n]) {
                    var o = l[n],
                    a = r;
                    _.endsWith(n, "_INTERVAL") && (o = d(o / 1e3), a = d(a / 1e3)),
                    i.warn("Overriding " + n + " from " + o + " to " + a),
                    l[n] = r
                }
            };
            t("DRI", "DASH_REFRESH_INTERVAL"),
            t("LCI", "LICENSE_CHECK_INTERVAL"),
            t("LRI", "LIST_REFRESH_INTERVAL"),
            t("NPI", "NOTIFICATIONS_POLL_INTERVAL"),
            t("VCI", "VERSION_CHECK_INTERVAL"),
            t("LPS", "LIST_PAGE_SIZE"),
            t("UCS", "UPLOAD_CHUNK_SIZE")
        } ()
    }

    function n(e) {
        return function(t) {
            e.get("$log").error(t)
        }
    }
    t.$inject = ["$rootScope", "$cacheFactory", "$location", "$log", "$q", "$state", "$timeout", "$uibModalStack", "$window", "axConstant", "axFormatDurationFilter", "axLocale", "dateFilter", "CurrentUser", "gettext", "gettextCatalog", "localStorageService", "promiseTracker", "ScansApi", "toastr"],
    e.module("WVS").factory("$exceptionHandler", ["$injector", n]).run(t)
} (angular),
function(e, t, n) {
    "use strict";
    var r = function(t) {
        return t ? e.element("<div></div>").text(t).html() : ""
    };
    e.module("WVS").filter("axBusinessCriticality", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.BUSINESS_CRITICALITY, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axVulnSeverityLevel", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.VULN_SEVERITY_LEVEL, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axVulnStatus", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.VULN_STATUS, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axMaxDigits", ["numberFilter",
    function(t) {
        return function(n, r) {
            return n = e.isNumber(n) ? n: parseInt(String(n), 10),
            isNaN(n) ? "": e.isNumber(r) && r > 0 && (r = Math.min(r, 5), n > Math.pow(10, r)) ? (Math.pow(10, r) - 1).toString() + "+": t(n)
        }
    }]).filter("axUserRoleName", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.USER_ROLE, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axScanStatus", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.SCAN_STATUS, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axThreatLevel", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.THREAT_LEVEL, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axReportStatus", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.REPORT_STATUS, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axReportSource", ["axConstant", "gettext",
    function(t, r) {
        return function(i, o) {
            void 0 === o && (o = !1);
            var a = n.get(i, "listType", null);
            if (e.isString(a)) {
                var s = t.REPORT_SOURCE.find(function(e) {
                    return e.value === a
                });
                if (s) {
                    if (o) {
                        if ("scan_result" === s.value || "scan_vulnerabilities" === s.value) return r("Scan Report");
                        if ("vulnerabilities" === s.value) return r("Target Report")
                    }
                    return s.text
                }
            }
            return ""
        }
    }]).filter("axSmtpSecurityOption", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.SMTP_SECURITY_OPTION, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axProxyProtocolOption", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.PROXY_PROTOCOL_OPTION, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axJoin",
    function() {
        return function(e, t) {
            return n.join(e, n.defaultTo(t, ","))
        }
    }).filter("axEventName", ["axConstant",
    function(e) {
        return function(t) {
            t = String(t);
            var r = n.find(e.EVENT_TYPES_MAP, n.matchesProperty("typeId", t));
            return r ? r.groupName + " " + r.typeName: t
        }
    }]).filter("axEscapeHtml",
    function() {
        return r
    }).filter("axFormatRecurrence",
    function() {
        return function(e) {
            return t.axConversions.pyToRfc3339(e)
        }
    }).filter("axBugTrackerName", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.BUG_TRACKERS, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axJiraBugTrackerAuthType", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.JIRA_BUG_TRACKER_AUTH, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axLicenseFeatureName", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.LICENSE_FEATURES, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axProductEdition", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.PRODUCT_EDITION, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axTargetType", ["axConstant",
    function(e) {
        return function(t) {
            return n.get(n.find(e.TARGET_TYPE, n.matchesProperty("value", String(t))), "text", "")
        }
    }]).filter("axFormatDuration",
    function() {
        return function(t) {
            if (e.isNumber(t)) {
                var n = Math.floor(t / 3600),
                r = t % 3600,
                i = Math.floor(r / 60),
                o = r % 60,
                a = Math.ceil(o),
                s = [a + "s"];
                return i > 0 && s.unshift(i + "m"),
                n > 0 && s.unshift(n + "h"),
                s.join(" ")
            }
            return ""
        }
    }),
    e.module("WVS").filter("axScanningApp",
    function() {
        return function(e) {
            switch (e) {
            case "wvs":
                return "WVS"
            }
            return e
        }
    }).filter("axWorkerAuthorization", ["gettext",
    function(e) {
        return function(t) {
            switch (t) {
            case "authorized":
                return e("Authorized");
            case "rejected":
                return e("Rejected");
            case "pending":
                return e("Pending");
            case "detached":
                return e("Detached");
            case "none":
                return e("None")
            }
            return ""
        }
    }]).filter("axWorkerStatus", ["gettext",
    function(e) {
        return function(t) {
            switch (t) {
            case "online":
                return e("Online");
            case "offline":
                return e("Offline");
            case "suspended":
                return e("Suspended")
            }
            return ""
        }
    }]).filter("axWorkerEndpoint",
    function() {
        return function(e) {
            if ("string" == typeof e) {
                if ("main installation" === e.toLowerCase()) return e;
                if (void 0 === window.URL) return n.endsWith("/", e) && (e = e.slice(0, -1)),
                n.endsWith(e, "/worker/v1") && (e = e.slice(0, -10)),
                e;
                try {
                    return new URL(e).origin
                } catch(t) {
                    return e
                }
            }
            return ""
        }
    })
} (angular, RRule, _),
function(e) {
    "use strict";

    function t(t, n, r, i, o, a, s, c, u, l, d, p) {
        n.useLegacyPromiseExtensions(!1),
        n.useApplyAsync(!0),
        n.interceptors.push("axApiInterceptor"),
        t.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|awvs|data):/),
        t.debugInfoEnabled(!1),
        i.debugEnabled(!1),
        p.theme = "bootstrap",
        e.extend(d, {
            preventOpenDuplicates: !0,
            timeOut: 3e3
        }),
        a.options({
            placement: "bottom auto",
            appendToBody: !0
        }),
        l.setPrefix("ax"),
        s.otherwise("/"),
        r.html5Mode(!1),
        function() {
            o.state("redirect", {
                url: "/redirect?res_type=&res_id=&ss_id=&err_reason=",
                redirectTo: function() {
                    function e(e) {
                        var t = e.params();
                        switch (parseInt(t.res_type, 10)) {
                        case 5:
                            return {
                                state:
                                "app.scan_details",
                                params: {
                                    scanId: t.res_id,
                                    resultId: t.ss_id
                                }
                            };
                        case 7:
                            return {
                                state:
                                "app.list_reports",
                                params: {}
                            };
                        case 3:
                            return {
                                state:
                                "app.target_config",
                                params: {
                                    targetId: t.res_id
                                }
                            };
                        case 1:
                        default:
                            return {
                                state:
                                "app.list_targets",
                                params: {}
                            }
                        }
                    }
                    return e
                } ()
            })
        } (),
        function() {
            var t = function(e, t) {
                switch (e.scrollTopActionVisible = !1, e.globalHelpLink = "", t.section) {
                case "crawl":
                case "http":
                case "advanced":
                case "general":
                    e.globalHelpLink = c.HELP_LINKS["target." + t.section]
                }
            };
            t.$inject = ["$rootScope", "$stateParams"];
            var n = function(e) {
                e.globalHelpLink = "",
                e.scrollTopActionVisible = !0
            };
            n.$inject = ["$rootScope"];
            var r = function(t, n, r, i, o, a, s, u, l, d, p, f, g) {
                return f.getTarget(o.targetId, {
                    noPublishError: !0
                }).then(function(e) {
                    if (null === e) {
                        var n = l("The specified target does not exist");
                        return t.reject({
                            errorMessage: n
                        })
                    }
                    return e
                }).then(function(n) {
                    return t.all([f.getTargetConfiguration(o.targetId, {
                        noPublishError: !0
                    }), u.getExcludedHoursProfiles({
                        noPublishError: !0
                    }), p.getSystemConfig({
                        noPublishError: !0
                    })]).then(function(t) {
                        var r = t[0],
                        i = t[1],
                        o = t[2].excludedHoursId;
                        return e.extend({},
                        {
                            target: n,
                            excludedHours: {
                                profiles: i,
                                globalExcludedHoursId: o
                            },
                            config: r
                        })
                    })
                }).then(function(e) {
                    return "advanced" === o.section ? t.when().then(function() {
                        return ! 0 !== s.hasFeature("bug_tracking_integration") ? [] : d.getIssueTrackers({
                            noPublishError: !0
                        })
                    }).then(function(t) {
                        return e.issueTrackers = t,
                        e
                    }).
                    catch(function(n) {
                        return 403 === n.status ? (e.issueTrackers = [{
                            issueTrackerId: e.config.issueTrackerId,
                            name: l("Name is not available")
                        }], e) : t.reject(n)
                    }) : e
                }).then(function(e) {
                    if ("general" === o.section) {
                        if (!0 === s.hasFeature("continuous_scans")) return f.getContinuousScanStatus(o.targetId, {
                            noPublishError: !0
                        }).then(function(t) {
                            return e.target.continuousMode = t,
                            e
                        });
                        e.target.continuousMode = !1
                    }
                    return e
                }).then(function(e) {
                    return "general" === o.section && "sequence" === e.config.login.kind ? f.getLoginSequence(o.targetId, {
                        noPublishError: !0
                    }).then(function(t) {
                        return t && (e.loginSequence = t),
                        e
                    }) : "http" === o.section ? f.getClientCertificate(o.targetId, {
                        noPublishError: !0
                    }).then(function(t) {
                        return t && (e.clientCertificate = t),
                        e
                    }) : e
                }).then(function(t) {
                    return "crawl" === o.section ? f.getImportedFiles(o.targetId, {
                        noPublishError: !0
                    }).then(function(n) {
                        return e.extend(t, {
                            importedFiles: Array.isArray(n) ? n: []
                        })
                    }) : t
                }).then(function(e) {
                    var t = c.TEST_WEBSITES.find(function(t) {
                        var n = t.url,
                        r = e.target.address;
                        "/" === r[r.length - 1] && (r = r.substr(0, r.length - 1));
                        var i = n.indexOf(r);
                        return 0 === i || 7 === i
                    });
                    return t && (e.testWebsite = t),
                    e
                }).then(function(e) {
                    if (s.hasFeature("multi_engine")) {
                        var r = n.get("WorkersApi");
                        return r.getAssignedWorkers(o.targetId, {
                            noPublishError: !0
                        }).then(function(t) {
                            return e.assignedWorkers = t,
                            e.workers = [],
                            e.assignedWorkers.wvs && e.workers.push(e.assignedWorkers.wvs),
                            e
                        }).then(function(e) {
                            return r.getWorkers({
                                noPublishError: !0
                            }).then(function(t) {
                                var n = t.workers;
                                return e.workers = e.workers.concat(n.filter(function(t) {
                                    return _.get(e, "assignedWorkers.wvs.workerId", null) === t.workerId || "authorized" === t.authorization
                                })),
                                e.workers = _.uniqBy(e.workers, "workerId"),
                                e
                            }).
                            catch(function(n) {
                                return 403 !== n.status ? t.reject(n) : e
                            })
                        })
                    }
                    return e
                }).
                catch(function(e) {
                    return i.go("app.list_targets", {},
                    {
                        inherit: !1
                    }).then(function() {
                        e.errorMessage && a(function() {
                            return r.$emit("axError", {
                                errorMessage: e.errorMessage
                            })
                        },
                        1e3)
                    }),
                    t.reject(e)
                })
            };
            r.$inject = ["$q", "$injector", "$rootScope", "$state", "$stateParams", "$timeout", "CurrentUser", "ExcludedHoursApi", "gettext", "IssueTrackersApi", "SystemConfigApi", "TargetsApi", "authUser"],
            o.state("app.target_config", {
                url: "targets/:targetId/:section/?returnUrl=",
                reloadOnSearch: !1,
                data: {
                    page: {
                        icon: "fa-dot-circle-o",
                        section: "targets"
                    }
                },
                resolve: {
                    targetInfo: r
                },
                params: {
                    section: "general"
                },
                views: {
                    "": {
                        templateUrl: __axtr("/templates/targets/target-config/target-config.html"),
                        controller: "axTargetConfigCtrl"
                    },
                    "general@app.target_config": {
                        templateUrl: __axtr("/templates/targets/target-config/sections/general/general.html"),
                        controller: "axTargetGeneralConfigCtrl"
                    },
                    "crawl@app.target_config": {
                        templateUrl: __axtr("/templates/targets/target-config/sections/crawl/crawl.html"),
                        controller: "axTargetCrawlConfigCtrl"
                    },
                    "http@app.target_config": {
                        templateUrl: __axtr("/templates/targets/target-config/sections/http/http.html"),
                        controller: "axTargetHttpConfigCtrl"
                    },
                    "advanced@app.target_config": {
                        templateUrl: __axtr("/templates/targets/target-config/sections/advanced/advanced.html"),
                        controller: "axTargetAdvancedConfigCtrl"
                    }
                },
                onEnter: t,
                onExit: n
            })
        } (),
        function() {
            var e = function(e, t) {
                switch (e.globalHelpLink = "", t.view) {
                case "stats":
                    e.globalHelpLink = c.HELP_LINKS["scan.stats"];
                    break;
                case "vulns":
                    e.globalHelpLink = c.HELP_LINKS["scan.vulns"];
                    break;
                case "crawl":
                    e.globalHelpLink = c.HELP_LINKS["scan.crawl"];
                    break;
                case "events":
                    e.globalHelpLink = c.HELP_LINKS["scan.events"]
                }
                e.scrollTopActionVisible = "vulns" === t.view || "events" === t.view || "sessions" === t.view
            };
            e.$inject = ["$rootScope", "$stateParams"];
            var t = function(e) {
                e.globalHelpLink = "",
                e.scrollTopActionVisible = !0
            };
            t.$inject = ["$rootScope"],
            o.state("app.scan_details", {
                url: "scans/:scanId/:view/:resultId/?criticality=&severity=&status=&cvss=&type=&vt_id=&returnUrl=",
                reloadOnSearch: !1,
                data: {
                    page: {
                        icon: "fa-area-chart",
                        section: "scans"
                    }
                },
                params: {
                    view: "stats",
                    resultId: "default"
                },
                views: {
                    "": {
                        controller: "axScanDetailsCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/scan-details.html")
                    },
                    "stats@app.scan_details": {
                        controller: "axScanDetailsStatsCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/scan-details-stats.html")
                    },
                    "vulns@app.scan_details": {
                        controller: "axScanDetailsVulnsCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/scan-details-vulns.html")
                    },
                    "crawl@app.scan_details": {
                        controller: "axScanDetailsCrawlCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/scan-details-crawl.html")
                    },
                    "events@app.scan_details": {
                        controller: "axScanDetailsEventsCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/scan-details-events.html")
                    },
                    "sessions@app.scan_details": {
                        controller: "axScanDetailsSessionsCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/scan-details-sessions.html")
                    }
                },
                onEnter: e,
                onExit: t
            })
        } (),
        function() {
            var e = function(e, t) {
                switch (e.globalHelpLink = "", t.view) {
                case "stats":
                case "vulns":
                case "crawl":
                case "events":
                    e.globalHelpLink = c.HELP_LINKS["scan." + t.view]
                }
                e.scrollTopActionVisible = "vulns" === t.view || "events" === t.view || "sessions" === t.view
            };
            e.$inject = ["$rootScope", "$stateParams"];
            var t = function(e) {
                e.globalHelpLink = "",
                e.scrollTopActionVisible = !0
            };
            t.$inject = ["$rootScope"],
            o.state("app.scan_details_grouped", {
                url: "scans/:scanId/by-:groupBy/:view/:resultId?severity=&status=&cvss=&target=&returnUrl=",
                reloadOnSearch: !1,
                views: {
                    "": {
                        controller: "axGroupedScanDetailsCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/grouped/grouped-scan-details.html")
                    },
                    "stats@app.scan_details_grouped": {
                        controller: "axScanDetailsStatsCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/scan-details-stats.html")
                    },
                    "vulns@app.scan_details_grouped": {
                        controller: "axGroupedScanDetailsVulnsCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/grouped/grouped-scan-details-vulns.html")
                    },
                    "crawl@app.scan_details_grouped": {
                        controller: "axScanDetailsCrawlCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/scan-details-crawl.html")
                    },
                    "events@app.scan_details_grouped": {
                        controller: "axScanDetailsEventsCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/scan-details-events.html")
                    },
                    "sessions@app.scan_details_grouped": {
                        controller: "axScanDetailsSessionsCtrl",
                        templateUrl: __axtr("/templates/scans/scan-details/scan-details-sessions.html")
                    }
                },
                params: {
                    view: "stats",
                    resultId: "default"
                },
                data: {
                    page: {
                        icon: "fa-area-chart",
                        section: "scans"
                    }
                },
                onEnter: e,
                onExit: t
            })
        } (),
        function() {
            var t = function(e, t) {
                switch (e.scrollTopActionVisible = !1, e.globalHelpLink = "", t.section) {
                case "updates":
                    e.globalHelpLink = c.HELP_LINKS["settings.updates"];
                    break;
                case "proxy":
                    e.globalHelpLink = c.HELP_LINKS["settings.proxy"];
                    break;
                case "notifications":
                    e.globalHelpLink = c.HELP_LINKS["settings.notifications"];
                    break;
                case "users":
                    e.globalHelpLink = c.HELP_LINKS["settings.users"];
                    break;
                case "target-groups":
                    e.globalHelpLink = c.HELP_LINKS["settings.groups"];
                    break;
                case "issue-trackers":
                case "scanning-profiles":
                case "exclusion-hours":
                    e.globalHelpLink = c.HELP_LINKS.settings
                }
            };
            t.$inject = ["$rootScope", "$stateParams"];
            var n = function(e) {
                e.globalHelpLink = "",
                e.scrollTopActionVisible = !0
            };
            n.$inject = ["$rootScope"];
            var r = {
                "workers@app.edit_settings": {
                    controller: "axSystemConfigWorkersCtrl",
                    templateUrl: __axtr("/templates/settings/system-config/sections/workers/workers.html")
                }
            },
            i = {
                "": {
                    controller: "axSystemConfigCtrl",
                    templateUrl: __axtr("/templates/settings/system-config/system-config.html")
                },
                "updates@app.edit_settings": {
                    controller: "axSystemConfigProductUpdatesCtrl",
                    templateUrl: __axtr("/templates/settings/system-config/sections/updates/product-updates.html")
                },
                "proxy@app.edit_settings": {
                    controller: "axSystemConfigProxyCtrl",
                    templateUrl: __axtr("/templates/settings/system-config/sections/proxy/proxy.html")
                },
                "notifications@app.edit_settings": {
                    controller: "axSystemConfigNotificationsCtrl",
                    templateUrl: __axtr("/templates/settings/system-config/sections/notifications/notifications.html")
                },
                "users@app.edit_settings": {
                    controller: "axSystemConfigUsersCtrl",
                    templateUrl: __axtr("/templates/settings/system-config/sections/users/users.html")
                },
                "target-groups@app.edit_settings": {
                    controller: "axSystemConfigTargetGroupsCtrl",
                    templateUrl: __axtr("/templates/settings/system-config/sections/target-groups/target-groups.html")
                },
                "issue-trackers@app.edit_settings": {
                    controller: "axSystemConfigIssueTrackersCtrl",
                    templateUrl: __axtr("/templates/settings/system-config/sections/issue-trackers/issue-trackers.html")
                },
                "scanning-profiles@app.edit_settings": {
                    controller: "axSystemConfigScanningProfilesCtrl",
                    templateUrl: __axtr("/templates/settings/system-config/sections/scanning-profiles/scanning-profiles.html")
                },
                "excluded-hours@app.edit_settings": {
                    controller: "axExclusionHoursCtrl",
                    templateUrl: __axtr("/templates/settings/system-config/sections/exclusion-hours/exclusion-hours.html")
                }
            };
            o.state("app.edit_settings", {
                url: "settings/:section/?returnUrl=",
                redirectTo: void 0,
                reloadOnSearch: !1,
                params: {
                    section: "updates"
                },
                views: e.extend(r, i, r),
                data: {
                    page: {
                        icon: "fa-cog",
                        section: "settings"
                    }
                },
                onEnter: t,
                onExit: n
            })
        } (),
        function() {
            var e = function(e, t) {
                e.globalHelpLink = t.HELP_LINKS["vulns.list"]
            };
            e.$inject = ["$rootScope", "axConstant"];
            var t = function(e) {
                e.globalHelpLink = ""
            };
            t.$inject = ["$rootScope"],
            o.state("app.list_vulns", {
                url: "vulnerabilities/?target=&group=&severity=&criticality=&status=&cvss=&type=&scan=&returnUrl=",
                controller: "axListVulnsCtrl",
                templateUrl: __axtr("/templates/vulns/list-vulns/list-vulns.html"),
                reloadOnSearch: !1,
                data: {
                    page: {
                        icon: "fa-bug",
                        section: "vulns"
                    }
                },
                onEnter: e,
                onExit: t
            })
        } (),
        function() {
            o.state("app.list_vulns_grouped", {
                url: "vulnerabilities/by-:groupBy/?target=&group=&severity=&criticality=&status=&cvss=&returnUrl=",
                controller: "axGroupedListsVulnsCtrl",
                templateUrl: __axtr("/templates/vulns/list-vulns/grouped/grouped-list-vulns.html"),
                reloadOnSearch: !1,
                data: {
                    page: {
                        icon: "fa-bug",
                        section: "vulns"
                    }
                },
                onEnter: ["$rootScope", "axConstant",
                function(e, t) {
                    e.globalHelpLink = t.HELP_LINKS["vulns.list"]
                }],
                onExit: ["$rootScope",
                function(e) {
                    e.globalHelpLink = ""
                }]
            })
        } (),
        function() {
            o.state("app.vuln_details", {
                url: "vulnerabilities/:vulnId/?returnUrl=",
                templateUrl: __axtr("/templates/vulns/vuln-details/vuln-details.html"),
                controller: "axVulnDetailsCtrl",
                data: {
                    page: {
                        icon: "fa-bug",
                        section: "vulns"
                    }
                },
                onEnter: ["$rootScope",
                function(e) {
                    e.scrollTopActionVisible = !1
                }],
                onExit: ["$rootScope",
                function(e) {
                    e.scrollTopActionVisible = !0
                }]
            })
        } ()
    }
    t.$inject = ["$compileProvider", "$httpProvider", "$locationProvider", "$logProvider", "$stateProvider", "$uibTooltipProvider", "$urlRouterProvider", "axConstant", "gettext", "localStorageServiceProvider", "toastrConfig", "uiSelectConfig"],
    e.module("WVS").config(t)
} (angular);
//# sourceMappingURL=app-bundle.js.map
