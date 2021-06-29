/**
 * Created by yh on 2021/6/7
 */
export default {
    methods:{
        $_getPenLabel(pen) {
            if (pen.type === 1) {
                switch (pen.name) {
                    case 'curve':
                        return '直线';
                    case 'polyline':
                        return '折线';
                    case 'line':
                        return '直线';
                    case 'mind':
                        return '脑图曲线';
                }
                return ''
            } else {
                if (pen._realLabel) return pen._realLabel;
                if (pen.label) return pen.label;
                if (pen.text) return pen.text;
                return pen.name;
            }
        },
        $_activePens(pen) {
            this.$emit('setPens', pen)
        },
        $_setPenVisible(pen, visible) {
            if(pen.visible === undefined){
                this.$set(pen,'visible',visible);
            }else {
                pen.visible = visible;
            }
            if(typeof this.handleChangeNode === 'function') {
                this.handleChangeNode(pen);
            }else {
                this.$emit('change', pen);
            }
        },

        $_setPenLock(pen, isLock) {
            if(pen.locked === undefined){
                this.$set(pen,'locked',isLock);
            }else {
                pen.locked = isLock;
            }
            if(typeof this.handleChangeNode === 'function') {
                this.handleChangeNode(pen);
            }else {
                this.$emit('change', pen);
            }
        }
    }
}
