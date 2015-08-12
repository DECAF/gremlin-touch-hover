import gremlins from 'gremlins';
import gremlinsJquery from 'gremlins-jquery';
import dispatcher from 'gremlins-dispatcher';

const ACTIVE_TOUCH_HOVER = 'ACTIVE_TOUCH_HOVER';

const TouchHover = gremlins.create('touch-hover', {
    mixins: [gremlinsJquery, dispatcher],
    events: {
        'touchstart': 'onTouchStart',
        'touchmove': 'onTouchMove',
        'touchend': 'onTouchEnd',
        'click': 'onClick',
        'blur': 'onBlur',
        'blur *': 'onBlur'
    },
    initialize(){
        this._isActive = false;
        this._wasMoved = false;
        this._$child   = this.$el.children();

        if (this._$child.length > 1) {
            throw new Error('A <touch-hover /> element needs a single child (the hovered element) to work!')
        }
    },
    getListeners(){
        return {
            ACTIVE_TOUCH_HOVER: 'onActiveChanged'
        }
    },
    onTouchStart(){
        //console.log('touch start')
    },
    onTouchMove(){
        this._wasMoved = true;
    },
    onTouchEnd(event){
        if (!this._wasMoved) {

            if (!this._isActive) {
                event.preventDefault();
                this._isActive = true;
                this._$child.focus();
                this.emit(ACTIVE_TOUCH_HOVER, {
                    gremlin: this
                });
            } else {
                this._$child.blur();
            }
        }
        //console.log('touch end')

        this._wasMoved = false;
        return true;
    },
    onBlur(event) {
        console.log('on blur')
        this._isActive = false;
    },
    onClick(){
        //console.log('click')
    },
    onActiveChanged(data){
        if (data.gremlin !== this) {
            //console.log('active changed!')
            this._isActive = false;
        }
    }
});

export default TouchHover;