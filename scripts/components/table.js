export default {
  name: "Table",
  props: {
    headers: "",
    actionTitle: "",
    localModel: null,
  },
  template: `
    <div class="grid-container">
      <button class="grid-main-button">Criar</button>
      <table>
        <thead>
          <tr>
            <th v-for="header in headers.split(',')">{{header}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in localModel" :key="index">
            <td class="align-item" v-for="header in headers.split(',')" :key="header">
              <span v-if="item[header]">{{ item[header] }}</span>
              <span v-else >-</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="localModel == null" class="grid-no-data">Nenhuma informação a ser exibida.</div>
    </div>
   `,
};
