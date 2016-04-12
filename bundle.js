require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-photo-gallery":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var Gallery = (function (_React$Component) {
    _inherits(Gallery, _React$Component);

    function Gallery() {
        _classCallCheck(this, Gallery);

        _get(Object.getPrototypeOf(Gallery.prototype), 'constructor', this).call(this);
        this.state = {
            currentImage: 0,
            containerWidth: 0
        };
        this.handleResize = this.handleResize.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
    }

    _createClass(Gallery, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ containerWidth: Math.floor(_reactDom2['default'].findDOMNode(this).clientWidth) });
            window.addEventListener('resize', this.handleResize);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (_reactDom2['default'].findDOMNode(this).clientWidth !== this.state.containerWidth) {
                this.setState({ containerWidth: Math.floor(_reactDom2['default'].findDOMNode(this).clientWidth) });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.handleResize, false);
        }
    }, {
        key: 'handleResize',
        value: function handleResize(e) {
            this.setState({ containerWidth: Math.floor(_reactDom2['default'].findDOMNode(this).clientWidth) });
        }
    }, {
        key: 'openLightbox',
        value: function openLightbox(index, event) {
            event.preventDefault();
            this.setState({
                currentImage: index,
                lightboxIsOpen: true
            });
        }
    }, {
        key: 'closeLightbox',
        value: function closeLightbox() {
            this.setState({
                currentImage: 0,
                lightboxIsOpen: false
            });
        }
    }, {
        key: 'gotoPrevious',
        value: function gotoPrevious() {
            this.setState({
                currentImage: this.state.currentImage - 1
            });
        }
    }, {
        key: 'gotoNext',
        value: function gotoNext() {
            this.setState({
                currentImage: this.state.currentImage + 1
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var rowLimit = 2,
                photoPreviewNodes = [];
            if (this.state.containerWidth >= 480) {
                rowLimit = 2;
            }
            if (this.state.containerWidth >= 1024) {
                rowLimit = 6;
            }
            var contWidth = this.state.containerWidth - rowLimit * 4; /* 4px for margin around each image*/
            contWidth = Math.floor(contWidth - 2); // add some padding to prevent layout prob
            var lightboxImages = [];
            for (var i = 0; i < this.props.photos.length; i += rowLimit) {
                var rowItems = [];
                // loop thru each set of rowLimit num
                // eg. if rowLimit is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
                var aspectRatio = 0,
                    totalAr = 0,
                    commonHeight = 0;
                for (var j = i; j < i + rowLimit; j++) {
                    if (j == this.props.photos.length) {
                        break;
                    }
                    totalAr += this.props.photos[j].aspectRatio;
                }
                commonHeight = contWidth / totalAr;
                // run thru the same set of items again to give the common height
                for (var k = i; k < i + rowLimit; k++) {
                    if (k == this.props.photos.length) {
                        break;
                    }
                    lightboxImages.push(this.props.photos[k].lightboxImage);
                    var src = this.props.photos[k].src;
                    photoPreviewNodes.push(_react2['default'].createElement(
                        'div',
                        { key: k, style: style },
                        _react2['default'].createElement(
                            'a',
                            { href: '#', className: k, onClick: this.openLightbox.bind(this, k) },
                            _react2['default'].createElement('img', { src: src, style: { display: 'block', border: 0 }, height: commonHeight, width: commonHeight * this.props.photos[k].aspectRatio, alt: '' })
                        )
                    ));
                }
            }
            return _react2['default'].createElement(
                'div',
                { id: 'Gallery', className: 'clearfix' },
                photoPreviewNodes,
                _react2['default'].createElement(_reactImages2['default'], {
                    currentImage: this.state.currentImage,
                    images: lightboxImages,
                    isOpen: this.state.lightboxIsOpen,
                    onClose: this.closeLightbox,
                    onClickPrev: this.gotoPrevious,
                    onClickNext: this.gotoNext,
                    width: 1600,
                    showImageCount: this.props.lightboxShowImageCount
                })
            );
        }
    }]);

    return Gallery;
})(_react2['default'].Component);

;
Gallery.displayName = 'Gallery';
Gallery.propTypes = {
    photos: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
        src: _react2['default'].PropTypes.string.isRequired,
        width: _react2['default'].PropTypes.number.isRequired,
        height: _react2['default'].PropTypes.number.isRequired,
        aspectRatio: _react2['default'].PropTypes.number.isRequired,
        lightboxImage: _react2['default'].PropTypes.object.isRequired
    })).isRequired
};
Gallery.defaultProps = {
    lightboxShowImageCount: false
};
// Gallery image style
var style = {
    display: 'block',
    margin: 2,
    // backgroundColor:'#e3e3e3',
    float: 'left'
};

exports['default'] = Gallery;
module.exports = exports['default'];

},{"react":undefined,"react-dom":undefined,"react-images":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGVvL0RvY3VtZW50cy9yZWFjdC1waG90by1nYWxsZXJ5L3NyYy9HYWxsZXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztxQkNBa0IsT0FBTzs7Ozt3QkFDSixXQUFXOzs7OzJCQUNYLGNBQWM7Ozs7SUFFN0IsT0FBTztjQUFQLE9BQU87O0FBQ0UsYUFEVCxPQUFPLEdBQ0k7OEJBRFgsT0FBTzs7QUFFWixtQ0FGSyxPQUFPLDZDQUVKO0FBQ1IsWUFBSSxDQUFDLEtBQUssR0FBRztBQUNULHdCQUFZLEVBQUUsQ0FBQztBQUNmLDBCQUFjLEVBQUUsQ0FBQztTQUNwQixDQUFDO0FBQ0YsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxZQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25ELFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdDOztpQkFaQyxPQUFPOztlQWFRLDZCQUFFO0FBQ3RCLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQVMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQTtBQUM1RSxrQkFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEs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QUFDWCxXQUFPLEVBQUUsT0FBTztBQUNoQixVQUFNLEVBQUUsQ0FBQzs7QUFFVCxTQUFLLEVBQUUsTUFBTTtDQUNmLENBQUE7O3FCQUVjLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcyc7XG5cbmNsYXNzIEdhbGxlcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gICAgY29uc3RydWN0b3IoKXtcblx0c3VwZXIoKTtcblx0dGhpcy5zdGF0ZSA9IHtcblx0ICAgIGN1cnJlbnRJbWFnZTogMCxcblx0ICAgIGNvbnRhaW5lcldpZHRoOiAwXG5cdH07XG5cdHRoaXMuaGFuZGxlUmVzaXplID0gdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKTtcblx0dGhpcy5jbG9zZUxpZ2h0Ym94ID0gdGhpcy5jbG9zZUxpZ2h0Ym94LmJpbmQodGhpcyk7XG5cdHRoaXMuZ290b05leHQgPSB0aGlzLmdvdG9OZXh0LmJpbmQodGhpcyk7XG5cdHRoaXMuZ290b1ByZXZpb3VzID0gdGhpcy5nb3RvUHJldmlvdXMuYmluZCh0aGlzKTtcblx0dGhpcy5vcGVuTGlnaHRib3ggPSB0aGlzLm9wZW5MaWdodGJveC5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHR0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcihSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5jbGllbnRXaWR0aCl9KVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIH1cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKXtcblx0aWYgKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmNsaWVudFdpZHRoICE9PSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoKXtcblx0ICAgIHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmNsaWVudFdpZHRoKX0pO1xuXHR9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdCB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUsIGZhbHNlKTtcbiAgICB9XG4gICAgaGFuZGxlUmVzaXplKGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcihSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5jbGllbnRXaWR0aCl9KTtcbiAgICB9XG4gICAgb3BlbkxpZ2h0Ym94KGluZGV4LCBldmVudCl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiBpbmRleCxcbiAgICAgICAgICAgIGxpZ2h0Ym94SXNPcGVuOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbG9zZUxpZ2h0Ym94KCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiAwLFxuICAgICAgICAgICAgbGlnaHRib3hJc09wZW46IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ290b1ByZXZpb3VzKCl7XG5cdHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSAtIDEsXG5cdH0pO1xuICAgIH1cbiAgICBnb3RvTmV4dCgpe1xuXHR0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgKyAxLFxuXHR9KTtcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciByb3dMaW1pdCA9IDIsXG4gICAgICAgICAgICBwaG90b1ByZXZpZXdOb2RlcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCA+PSA0ODApe1xuICAgICAgICAgICAgcm93TGltaXQgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoID49IDEwMjQpe1xuICAgICAgICAgICAgcm93TGltaXQgPSA2O1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250V2lkdGggPSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoIC0gKHJvd0xpbWl0ICogNCk7IC8qIDRweCBmb3IgbWFyZ2luIGFyb3VuZCBlYWNoIGltYWdlKi9cbiAgICAgICAgY29udFdpZHRoID0gTWF0aC5mbG9vcihjb250V2lkdGggLSAyKTsgLy8gYWRkIHNvbWUgcGFkZGluZyB0byBwcmV2ZW50IGxheW91dCBwcm9iXG5cdHZhciBsaWdodGJveEltYWdlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpPTA7aTx0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGg7aSs9cm93TGltaXQpe1xuICAgICAgICAgICAgdmFyIHJvd0l0ZW1zID0gW107XG4gICAgICAgICAgICAvLyBsb29wIHRocnUgZWFjaCBzZXQgb2Ygcm93TGltaXQgbnVtXG4gICAgICAgICAgICAvLyBlZy4gaWYgcm93TGltaXQgaXMgMyBpdCB3aWxsICBsb29wIHRocnUgMCwxLDIsIHRoZW4gMyw0LDUgdG8gcGVyZm9ybSBjYWxjdWxhdGlvbnMgZm9yIHRoZSBwYXJ0aWN1bGFyIHNldFxuICAgICAgICAgICAgdmFyIGFzcGVjdFJhdGlvPTAsXG4gICAgICAgICAgICAgICAgdG90YWxBcj0wLFxuICAgICAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBqPWk7IGo8aStyb3dMaW1pdDsgaisrKXtcbiAgICAgICAgICAgICAgICBpZiAoaiA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0dG90YWxBciArPSB0aGlzLnByb3BzLnBob3Rvc1tqXS5hc3BlY3RSYXRpbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IGNvbnRXaWR0aCAvIHRvdGFsQXI7XG4gICAgICAgICAgICAvLyBydW4gdGhydSB0aGUgc2FtZSBzZXQgb2YgaXRlbXMgYWdhaW4gdG8gZ2l2ZSB0aGUgY29tbW9uIGhlaWdodFxuICAgICAgICAgICAgZm9yICh2YXIgaz1pOyBrPGkrcm93TGltaXQ7IGsrKyl7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXHRcdGxpZ2h0Ym94SW1hZ2VzLnB1c2godGhpcy5wcm9wcy5waG90b3Nba10ubGlnaHRib3hJbWFnZSk7XG5cdFx0dmFyIHNyYyA9IHRoaXMucHJvcHMucGhvdG9zW2tdLnNyYztcbiAgICAgICAgICAgICAgICBwaG90b1ByZXZpZXdOb2Rlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2t9IHN0eWxlPXtzdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT17a30gb25DbGljaz17dGhpcy5vcGVuTGlnaHRib3guYmluZCh0aGlzLCBrKX0+PGltZyBzcmM9e3NyY30gc3R5bGU9e3tkaXNwbGF5OidibG9jaycsIGJvcmRlcjowfX0gaGVpZ2h0PXtjb21tb25IZWlnaHR9IHdpZHRoPXtjb21tb25IZWlnaHQgKiB0aGlzLnByb3BzLnBob3Rvc1trXS5hc3BlY3RSYXRpb30gYWx0PVwiXCIgLz48L2E+XG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdHJldHVybihcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJHYWxsZXJ5XCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cbiAgICAgICAgICAgICAgICB7cGhvdG9QcmV2aWV3Tm9kZXN9XG4gICAgICAgICAgICAgICAgPExpZ2h0Ym94XG5cdFx0ICAgIGN1cnJlbnRJbWFnZT17dGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgIGltYWdlcz17bGlnaHRib3hJbWFnZXN9XG4gICAgICAgICAgICAgICAgICAgIGlzT3Blbj17dGhpcy5zdGF0ZS5saWdodGJveElzT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5jbG9zZUxpZ2h0Ym94fVxuXHRcdCAgICBvbkNsaWNrUHJldj17dGhpcy5nb3RvUHJldmlvdXN9XG5cdFx0ICAgIG9uQ2xpY2tOZXh0PXt0aGlzLmdvdG9OZXh0fVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17MTYwMH1cblx0XHQgICAgc2hvd0ltYWdlQ291bnQ9e3RoaXMucHJvcHMubGlnaHRib3hTaG93SW1hZ2VDb3VudH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufTtcbkdhbGxlcnkuZGlzcGxheU5hbWUgPSAnR2FsbGVyeSc7XG5HYWxsZXJ5LnByb3BUeXBlcyA9IHtcbiAgICBwaG90b3M6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuXHRSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuXHQgICAgc3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdCAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHQgICAgaGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdCAgICBhc3BlY3RSYXRpbzogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHQgICAgbGlnaHRib3hJbWFnZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG5cdH0pXG4gICAgKS5pc1JlcXVpcmVkLFxufTtcbkdhbGxlcnkuZGVmYXVsdFByb3BzID0ge1xuICAgIGxpZ2h0Ym94U2hvd0ltYWdlQ291bnQ6IGZhbHNlXG59XG4vLyBHYWxsZXJ5IGltYWdlIHN0eWxlXG5jb25zdCBzdHlsZSA9IHtcbiAgIGRpc3BsYXk6ICdibG9jaycsXG4gICBtYXJnaW46IDIsXG4gICAvLyBiYWNrZ3JvdW5kQ29sb3I6JyNlM2UzZTMnLFxuICAgZmxvYXQ6ICdsZWZ0J1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYWxsZXJ5O1xuIl19
