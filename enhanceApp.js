/**
 * 扩展 VuePress 应用
 */
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as Tool from "./theme/util/tool";
export default ({ Vue, options, router, siteData }) => {
    // ...做一些其他的应用级别的优化
    Vue.use(ElementUI)
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
                            const { themeConfig: { copyRight, devTools }, author } = siteData
                            if (copyRight)
                                Tool.copy(author);
                            if (devTools)
                                Tool.keyDown();
                        })();
                } catch (e) {
                    console.log(e.message);
                }
            }, 500);
        },
    });
};