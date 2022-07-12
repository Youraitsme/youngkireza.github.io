"use strict";
function _typeof(a) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (a) {
            return typeof a;
          }
        : function (a) {
            return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
          }),
    _typeof(a)
  );
}
var Vara = function (a, b, c, d) {
  var e = this;
  (this.elementName = a),
    (this.textsInit = []),
    "string" == typeof c ? this.textsInit.push({ text: c }) : "object" == _typeof(c) && (this.textsInit = c),
    (this.texts = this.textsInit),
    (this.properties = d || {}),
    (this.properties.textAlign = this.properties.textAlign || "left"),
    (this.letterSpacing = 0),
    (this.element = document.querySelector(this.elementName)),
    (this.fontSource = b),
    (this.characters = {}),
    (this.drawnCharacters = {}),
    (this.totalPathLength = 0),
    (this.fontSize = 24),
    (this.frameRate = 1e3 / 30),
    (this.prevDuration = 0),
    (this.completed = !1),
    (this.ready = function (a) {
      e.readyF = a;
    }),
    (this.animationEnd = function (a) {
      e.animationEndF = a;
    }),
    (this.svg = this.createNode("svg", { width: "100%" })),
    this.element.appendChild(this.svg),
    (this.font = document.createElement("object")),
    this.getSVGData();
};
(Vara.prototype.createNode = function (a, b) {
  for (var c in ((a = document.createElementNS("http://www.w3.org/2000/svg", a)), b))
    a.setAttributeNS(
      null,
      c.replace(/[A-Z]/g, function (a) {
        return "-" + a.toLowerCase();
      }),
      b[c]
    );
  return a;
}),
  (Vara.prototype.getSVGData = function () {
    var a = this,
      b = new XMLHttpRequest();
    b.open("GET", this.fontSource, !0),
      (b.onreadystatechange = function () {
        4 == b.readyState && 200 == b.status && ((a.contents = JSON.parse(b.responseText)), (a.characters = JSON.parse(b.responseText).c), a.preCreate(), a.createText());
      }),
      b.send(null);
  }),
  (Vara.prototype.preCreate = function () {
    (function () {
      return "function" != typeof NodeList.prototype.forEach && void (NodeList.prototype.forEach = Array.prototype.forEach);
    })(),
      (this.questionMark =
        this.characters[63] == null
          ? {
              paths: [
                { w: 8.643798828125, h: 14.231731414794922, my: 22.666500004827977, mx: 0, pw: 28.2464542388916, d: "m 0,0 c -2,-6.01,5,-8.64,8,-3.98,2,4.09,-7,8.57,-7,11.85" },
                {
                  w: 1.103759765625,
                  h: 1.549820899963379,
                  my: 8.881500004827977,
                  mx: 1,
                  pw: 4.466640472412109,
                  d: "m 0,0 a 0.7592,0.7357,0,0,1,0,0.735,0.7592,0.7357,0,0,1,-1,-0.735,0.7592,0.7357,0,0,1,1,-0.738,0.7592,0.7357,0,0,1,0,0.738 z",
                },
              ],
              w: 8.643798828125,
            }
          : this.characters[63]),
      (this.space = { paths: [{ d: "M0,0 l" + this.contents.p.space + " 0", mx: 0, my: 0, w: this.contents.p.space, h: 0 }], w: this.contents.p.space });
    for (var a = this.analyseWidth(), b = 0; b < this.texts.length; b++) {
      for (var c = [], d = "string" == typeof this.texts[b] ? { text: this.texts[b] } : this.texts[b], e = d.text, f = 0; f < e.length; f++) {
        var g = e[f];
        if (0 < a.breakPoints[b][f].length)
          for (var h, i, l = a.breakPoints[b][f].length, m = 0; m <= l; m++) {
            (i = a.breakPoints[b][f][m]), a.breakPoints[b][f][l - 1] != g.length && a.breakPoints[b][f].push(g.length);
            var n = null == a.breakPoints[b][f][m - 1] ? 0 : a.breakPoints[b][f][m - 1];
            (h = g.slice(n, i).replace(/^\s+/g, "")), c.push(h);
          }
        else c.push(e[f]);
      }
      this.texts[b].text = c;
    }
  }),
  (Vara.prototype.createText = function () {
    var a,
      b = this,
      c = this.svg,
      d = 0,
      e = 0,
      f = this.properties.lineHeight == null ? this.contents.p.lh : this.properties.lineHeight;
    this.properties.autoAnimation = !(this.properties.autoAnimation != null) || this.properties.autoAnimation;
    for (var g = 0, h = !0, k = 0; k < this.texts.length; k++) {
      var l = [],
        m = 0;
      a = this.texts[k].fontSize;
      var n = this.texts[k].strokeWidth,
        o = this.texts[k].color == null ? (this.properties.color == null ? "black" : this.properties.color) : this.texts[k].color,
        p = this.texts[k].duration == null ? (this.properties.duration == null ? 2e3 : this.properties.duration) : this.texts[k].duration;
      this.texts[k].duration = p;
      var q = this.texts[k].id == null ? k : this.texts[k].id;
      (this.texts[k].delay = this.texts[k].delay == null ? 0 : this.texts[k].delay),
        (this.prevDuration += this.texts[k].delay),
        this.texts[k].fromCurrentPosition == null && (this.texts[k].fromCurrentPosition = { x: !0, y: !0 }),
        (h = !(null != this.texts[k].y) || !!(null == this.texts[k].fromCurrentPosition.y || this.texts[k].fromCurrentPosition.y));
      var r = o,
        s = this.texts[k].textAlign == null ? this.properties.textAlign : this.texts[k].textAlign;
      f = this.texts[k].lineHeight == null ? f : this.texts[k].lineHeight / a;
      var t = this.createNode("g", { class: "outer", transform: "translate(0,0)", "data-text": this.texts[k].text });
      c.appendChild(t), (e = g);
      for (var u = 0, v = 0; v < this.texts[k].text.length; v++) {
        var w = 0,
          y = this.createNode("g");
        t.appendChild(y);
        for (var z = 0, A = 0, B = 0; B < this.texts[k].text[v].length; B++) {
          var C = this.texts[k].text[v][B],
            D = this.createNode("g");
          y.appendChild(D);
          var d = 0,
            E = this.characters[C.charCodeAt(0)] != null || " " == C ? (" " == C ? this.space.paths : this.characters[C.charCodeAt(0)].paths) : this.questionMark.paths;
          (o = " " == C ? "transparent" : r),
            E.forEach(function (a, c) {
              var d = b.createNode("path", { d: a.d, "stroke-width": n, stroke: o, fill: "none", "stroke-linecap": b.contents.p.slc, "stroke-linejoin": b.contents.p.slj });
              D.appendChild(d),
                d.setAttribute("transform", "translate(" + a.mx + "," + -a.my + ")"),
                (z = z > a.my - d.getBBox().y ? z : a.my - d.getBBox().y),
                0 == c && (A = z),
                (d.style.opacity = 0),
                (d.style.strokeDasharray = d.getTotalLength() + " " + (d.getTotalLength() + 2)),
                (d.style.strokeDashoffset = d.getTotalLength() + 1);
            }),
            l.push(D);
          var d = D.getBBox().x * a,
            F = this.texts[k].letterSpacing;
          "object" === _typeof(F) && (F = F[C] === void 0 ? (F.global === void 0 ? 0 : F.global) : F[C]),
            D.getBBox().width < this.texts[k].minWidth && (d -= (this.texts[k].minWidth - D.getBBox().width) / 2),
            D.setAttribute("transform", "translate(" + (w - d + F) + ",0)  scale(" + a + ")"),
            (w += D.getBBox().width * a + F),
            D.getBBox().width < this.texts[k].minWidth && (w += this.texts[k].minWidth - D.getBBox().width);
        }
        var G = y.getBBox();
        y.setAttribute("transform", "translate(" + n * a + "," + (-G.y + n * a) + ")");
        var H = 0;
        "center" == s ? (H = (this.svg.getBoundingClientRect().width - G.width) / 2) : "right" == s && (H = this.svg.getBoundingClientRect().width - G.width),
          this.setPosition(y, { x: H, y: m + this.contents.p.tf * a - z }),
          (m += f * a),
          (u += this.contents.p.tf * a + (this.contents.p.tf * a - A));
      }
      (this.texts[k].y == null || !0 == this.texts[k].fromCurrentPosition.y) && this.setPosition(t, { y: e }),
        this.texts[k].fromCurrentPosition != null && this.texts[k].fromCurrentPosition.y && (g += this.texts[k].y == null ? 0 : this.texts[k].y),
        this.setPosition(t, { x: this.texts[k].x, y: this.texts[k].y }, this.texts[k].fromCurrentPosition),
        h && (g += u),
        this.drawnCharacters[q] != null && (q = k),
        (this.drawnCharacters[q] = { characters: l, queued: this.texts[k].queued, container: t, index: k }),
        (this.texts[k].autoAnimation == null || this.texts[k].autoAnimation) && this.properties.autoAnimation && (b.draw(q, p), (this.texts[k].queued == null || this.texts[k].queued) && (b.prevDuration += p));
    }
    (this.completed = !0), this.svg.setAttribute("height", this.svg.getBBox().height + this.svg.getBBox().y + 10), this.readyF && this.readyF();
  }),
  (Vara.prototype.playAll = function () {
    this.prevDuration = 0;
    for (var a = 0; a < this.texts.length; a++) {
      var b = this.texts[a].duration,
        c = this.texts[a].id == null ? a : this.texts[a].id;
      (this.prevDuration += this.texts[a].delay), this.draw(c, b), (this.texts[a].queued == null || this.texts[a].queued) && (this.prevDuration += b);
    }
  }),
  (Vara.prototype.draw = function (a, b) {
    var c = this;
    if (null == this.drawnCharacters[a]) return console.warn("ID:`" + a + "` not found. Animation skipped"), void console.trace();
    var d = b === void 0 ? this.texts[this.drawnCharacters[a].index].duration : b,
      e = this.getSectionPathLength(a),
      f = 0,
      g = !(this.drawnCharacters[a].queued != null) || this.drawnCharacters[a].queued,
      h = g ? this.prevDuration : 1;
    setTimeout(function () {
      c.drawnCharacters[a].characters.forEach(function (a) {
        a.querySelectorAll("path").forEach(function (a) {
          var b = (parseFloat(a.style.strokeDashoffset) / e) * d;
          (a.style.opacity = 1), c.animate(a, b, f, 0), (f += b);
        });
      }),
        setTimeout(function () {
          c.animationEndF && c.animationEndF(a, c.drawnCharacters[a]);
        }, f);
    }, h);
  }),
  (Vara.prototype.get = function (a) {
    this;
    return null == this.drawnCharacters[a] ? (console.warn("ID:`" + a + "` not found."), console.trace(), !1) : this.drawnCharacters[a];
  }),
  (Vara.prototype.animate = function (a, b, c, d) {
    var e = this;
    (d = +d || 0),
      setTimeout(function () {
        var c = new Date().getTime(),
          f = parseFloat(a.style.strokeDashoffset),
          g = setInterval(function () {
            var e = Math.min(1, (new Date().getTime() - c) / b);
            (a.style.strokeDashoffset = f + e * (d - f)), 1 == e && clearInterval(g);
          }, e.frameRate);
      }, c);
  }),
  (Vara.prototype.getSectionPathLength = function (a) {
    var b = this;
    return (
      (this.totalPathLength = 0),
      this.drawnCharacters[a].characters.forEach(function (a) {
        a.querySelectorAll("path").forEach(function (a) {
          b.totalPathLength += a.getTotalLength();
        });
      }),
      this.totalPathLength
    );
  }),
  (Vara.prototype.analyseWidth = function () {
    var a = String.fromCharCode,
      b = Math.round,
      c = 0,
      d = this.svg.getBoundingClientRect().width,
      e = [],
      f = null == this.characters[97] ? Object.keys(this.characters)[b(Math.random() * Object.keys(this.characters).length - 1)] : "97",
      g = document.createElement("span");
    this.element.appendChild(g), (g.style.opacity = 0), (g.style.position = "absolute"), (g.innerHTML = a(f));
    var h = document.createElement("span");
    this.element.appendChild(h), (h.style.opacity = 0), (h.style.position = "absolute"), (h.innerHTML = " . ");
    for (var k = 0; k < this.texts.length; k++) {
      var l,
        m = this.texts[k];
      (l = "string" == typeof m.text ? [m.text] : m.text),
        (this.texts[k].text = l),
        (this.texts[k].letterSpacing = null == this.texts[k].letterSpacing ? (null == this.properties.letterSpacing ? 0 : this.properties.letterSpacing) : this.texts[k].letterSpacing),
        (this.texts[k].strokeWidth = null == this.texts[k].strokeWidth ? (null == this.properties.strokeWidth ? this.contents.p.bsw : this.properties.strokeWidth) : this.texts[k].strokeWidth);
      var n = null == this.texts[k].breakWord ? null != this.properties.breakWord && this.properties.breakWord : this.texts[k].breakWord,
        o = null == m.fontSize ? (null == this.properties.fontSize ? this.fontSize : this.properties.fontSize) : m.fontSize;
      (g.style.fontSize = o + "px"), (h.style.fontSize = o + "px");
      var p = g.getBoundingClientRect().width / this.characters[f].w;
      this.texts[k].minWidth = h.getBoundingClientRect().width;
      var q,
        r = null == this.texts[k].width ? d : this.texts[k].width,
        s = [],
        t = null == this.texts[k].x ? 0 : this.texts[k].x;
      (this.trueFontSize = o), (this.texts[k].fontSize = p);
      for (var u = this.texts[k].letterSpacing, v = 0; v < l.length; v++) {
        for (var w = t, y = [], z = l[v], A = 0, B = 0; B < z.length; B++)
          if (
            ("object" === _typeof(u) && "object" === _typeof(u) && (u = void 0 === u[z] ? (void 0 === u.global ? 0 : u.global) : u[z]),
            null == this.characters[z[B].charCodeAt(0)]
              ? " " == z[B]
                ? ((q = this.space.w * p), (A = w))
                : (q = this.questionMark.w * p + u)
              : ((q = this.characters[z[B].charCodeAt(0)].w * p), q < this.texts[k].minWidth && (q += (p * (this.texts[k].minWidth - this.characters[z[B].charCodeAt(0)].w)) / 2), (q += u)),
            (q += this.texts[k].strokeWidth * p),
            w + q >= r)
          ) {
            0 == A && (n = !0);
            var C = B;
            " " == z[B] || n || (C = z.slice(0, C + 1).search(/\S+$/)), y.push(C), (w = t + w - A);
          } else (c += q), (w += q);
        s.push(y);
      }
      e.push(s);
    }
    return g.parentNode.removeChild(g), h.parentNode.removeChild(h), { width: c, breakPoints: e };
  }),
  (Vara.prototype.setPosition = function (a, b, c) {
    var c = c == null ? { x: !1, y: !1 } : c;
    (c.x = c.x != null && c.x), (c.y = c.y != null && c.y);
    var d = a.transform.baseVal.consolidate().matrix,
      e = d.e,
      f = d.f;
    b.x != null && (c.x ? (e += b.x) : (e = b.x)), b.y != null && (c.y ? (f += b.y) : (f = b.y - a.getBBox().y));
    var g = this.svg.createSVGTransform();
    g.setTranslate(e, f), a.transform.baseVal.replaceItem(g, 0);
  }),
  "undefined" == typeof module ? (window.Vara = Vara) : (module.exports = Vara);
