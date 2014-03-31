/*
 AngularJS v1.2.15
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(n, e, A) {
    'use strict';

    function x(s, g, k) {
        return {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            link: function(a, c, b, f, w) {
                function y() {
                    p && (p.remove(), p = null);
                    h && (h.$destroy(), h = null);
                    l && (k.leave(l, function() {
                        p = null
                    }), p = l, l = null)
                }

                function v() {
                    var b = s.current && s.current.locals;
                    if (e.isDefined(b && b.$template)) {
                        var b = a.$new(),
                            d = s.current;
                        l = w(b, function(d) {
                            k.enter(d, null, l || c, function() {
                                !e.isDefined(t) || t && !a.$eval(t) || g()
                            });
                            y()
                        });
                        h = d.scope = b;
                        h.$emit("$viewContentLoaded");
                        h.$eval(u)
                    } else y()
                }
                var h, l, p, t = b.autoscroll,
                    u = b.onload || "";
                a.$on("$routeChangeSuccess", v);
                v()
            }
        }
    }

    function z(e, g, k) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(a, c) {
                var b = k.current,
                    f = b.locals;
                c.html(f.$template);
                var w = e(c.contents());
                b.controller && (f.$scope = a, f = g(b.controller, f), b.controllerAs && (a[b.controllerAs] = f), c.data("$ngControllerController", f), c.children().data("$ngControllerController", f));
                w(a)
            }
        }
    }
    n = e.module("ngRoute", ["ng"]).provider("$route", function() {
        function s(a, c) {
            return e.extend(new(e.extend(function() {}, {
                prototype: a
            })), c)
        }

        function g(a, e) {
            var b = e.caseInsensitiveMatch,
                f = {
                    originalPath: a,
                    regexp: a
                }, k = f.keys = [];
            a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(a, e, b, c) {
                a = "?" === c ? c : null;
                c = "*" === c ? c : null;
                k.push({
                    name: b,
                    optional: !! a
                });
                e = e || "";
                return "" + (a ? "" : e) + "(?:" + (a ? e : "") + (c && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "")
            }).replace(/([\/$\*])/g, "\\$1");
            f.regexp = RegExp("^" + a + "$", b ? "i" : "");
            return f
        }
        var k = {};
        this.when = function(a, c) {
            k[a] = e.extend({
                reloadOnSearch: !0
            }, c, a && g(a, c));
            if (a) {
                var b =
                    "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
                k[b] = e.extend({
                    redirectTo: a
                }, g(b, c))
            }
            return this
        };
        this.otherwise = function(a) {
            this.when(null, a);
            return this
        };
        this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce",
            function(a, c, b, f, g, n, v, h) {
                function l() {
                    var d = p(),
                        m = r.current;
                    if (d && m && d.$$route === m.$$route && e.equals(d.pathParams, m.pathParams) && !d.reloadOnSearch && !u) m.params = d.params, e.copy(m.params, b), a.$broadcast("$routeUpdate", m);
                    else if (d || m) u = !1, a.$broadcast("$routeChangeStart",
                        d, m), (r.current = d) && d.redirectTo && (e.isString(d.redirectTo) ? c.path(t(d.redirectTo, d.params)).search(d.params).replace() : c.url(d.redirectTo(d.pathParams, c.path(), c.search())).replace()), f.when(d).then(function() {
                        if (d) {
                            var a = e.extend({}, d.resolve),
                                c, b;
                            e.forEach(a, function(d, c) {
                                a[c] = e.isString(d) ? g.get(d) : g.invoke(d)
                            });
                            e.isDefined(c = d.template) ? e.isFunction(c) && (c = c(d.params)) : e.isDefined(b = d.templateUrl) && (e.isFunction(b) && (b = b(d.params)), b = h.getTrustedResourceUrl(b), e.isDefined(b) && (d.loadedTemplateUrl =
                                b, c = n.get(b, {
                                    cache: v
                                }).then(function(a) {
                                    return a.data
                                })));
                            e.isDefined(c) && (a.$template = c);
                            return f.all(a)
                        }
                    }).then(function(c) {
                        d == r.current && (d && (d.locals = c, e.copy(d.params, b)), a.$broadcast("$routeChangeSuccess", d, m))
                    }, function(c) {
                        d == r.current && a.$broadcast("$routeChangeError", d, m, c)
                    })
                }

                function p() {
                    var a, b;
                    e.forEach(k, function(f, k) {
                        var q;
                        if (q = !b) {
                            var g = c.path();
                            q = f.keys;
                            var l = {};
                            if (f.regexp)
                                if (g = f.regexp.exec(g)) {
                                    for (var h = 1, p = g.length; h < p; ++h) {
                                        var n = q[h - 1],
                                            r = "string" == typeof g[h] ? decodeURIComponent(g[h]) :
                                                g[h];
                                        n && r && (l[n.name] = r)
                                    }
                                    q = l
                                } else q = null;
                                else q = null;
                            q = a = q
                        }
                        q && (b = s(f, {
                            params: e.extend({}, c.search(), a),
                            pathParams: a
                        }), b.$$route = f)
                    });
                    return b || k[null] && s(k[null], {
                        params: {},
                        pathParams: {}
                    })
                }

                function t(a, c) {
                    var b = [];
                    e.forEach((a || "").split(":"), function(a, d) {
                        if (0 === d) b.push(a);
                        else {
                            var e = a.match(/(\w+)(.*)/),
                                f = e[1];
                            b.push(c[f]);
                            b.push(e[2] || "");
                            delete c[f]
                        }
                    });
                    return b.join("")
                }
                var u = !1,
                    r = {
                        routes: k,
                        reload: function() {
                            u = !0;
                            a.$evalAsync(l)
                        }
                    };
                a.$on("$locationChangeSuccess", l);
                return r
            }
        ]
    });
    n.provider("$routeParams",
        function() {
            this.$get = function() {
                return {}
            }
        });
    n.directive("ngView", x);
    n.directive("ngView", z);
    x.$inject = ["$route", "$anchorScroll", "$animate"];
    z.$inject = ["$compile", "$controller", "$route"]
})(window, window.angular);
//# sourceMappingURL=angular-route.min.js.map