import {billInterface} from "@/interfaces/bill";
import {defineStore} from "pinia";

export const useBillStore = defineStore("bill", {
    state: () => ({
        items: {},
        item: null,
        loading: false,
    }),
    getters: {},
    actions: {
        async getItems() {
            this.loading = true;
            try {
                const response = await this.$http.get("/bills");
                this.items = response.data;
            } catch (e) {
                console.error(e)
            }
            this.loading = false;
        },

        async setItem(id) {
            try {
                if (id === "new") {
                    this.item = {...billInterface};
                } else {
                    const response = await this.$http.get(`/bills/${id}`);
                    this.item = response.data;
                }
            } catch (e) {
                console.error(e)
            }
        },

        async updateItem(form) {
            this.loading = true;
            try {
                const response = await this.$http.patch(`/bills/${form.id}`, form);
                this.item = {...response.data}
            } catch (e) {
                console.error(e)
            }
            this.loading = false;
        },
        async createItem(form) {
            try {
                await this.$http.post(`/bills`, form)
            } catch (e) {
                console.error(e)
            }
        },

        async deleteItem(id) {
            this.loading = true;
            try {
                await this.$http.delete(`/bills/${id}`);
                await this.getItems();
            } catch (e) {
                console.error(e)
            }
            this.loading = false;
        },
    },
});
