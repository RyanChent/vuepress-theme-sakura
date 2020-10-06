/**
 * 扩展 VuePress 应用
 */
import { Button, Switch, Card, Image, Pagination, Icon, Autocomplete, Timeline, TimelineItem, Backtop, Carousel, CarouselItem } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as Tool from "./theme/util/tool";
export default ({ Vue, options, router, siteData }) => {
    // ...做一些其他的应用级别的优化
    Vue.use(Button)
    Vue.use(Switch);
    Vue.use(Card)
    Vue.use(Image)
    Vue.use(Pagination)
    Vue.use(Autocomplete)
    Vue.use(Icon)
    Vue.use(Timeline)
    Vue.use(TimelineItem)
    Vue.use(Backtop)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Object.keys(Tool).map(key => {
        Vue.prototype[`$${key}`] = Tool[key]
    })
    Vue.mixin({
        mounted() {
            setTimeout(() => {
                try {
                    document &&
                        (() => {
                            document.dispatchEvent(new Event('custom-render-trigger'))
                            Tool.copy();
                            // Tool.keyDown();
                        })();
                } catch (e) {
                    console.log(e.message);
                }
            }, 500);
        },
    });
};