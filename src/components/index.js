import pdf from "./pdf/pdf.vue";

const components = [pdf];

export default {
  install(Vue, opts = {}) {
    components.map(component => {
      Vue.component("icb" + component.name, component);
    });
  }
};
