<template>
    <v-app>
        <v-row>
            <v-navigation-drawer class="mt-3">
                <v-treeview v-model="tree" :open="initiallyOpen" :items="items" activatable item-key="title"
                    open-on-click @update:active="handleSrc">
                    <template v-slot:prepend="{ item, open }">
                        <v-icon v-if="!item.file">
                            {{ open ? "mdi-folder-open" : "mdi-folder" }}
                        </v-icon>
                        <v-icon v-else>
                            {{ files[item.file] }}
                        </v-icon>
                    </template>
                </v-treeview>
            </v-navigation-drawer>

            <!-- Sizes your content based upon application components -->
            <v-main class="mb-15 mt-0 pt-4">
                <!-- Provides the application the proper gutter -->
                <v-container fluid class="mt-0 pt-0">
                    <!-- <iframe v-if="src" style="width: calc(80vw); height: calc(87vh); border: none;"
                        :src="src + dark"></iframe> -->
                    <!-- <vue-markdown v-highlight>
                    </vue-markdown> -->
                    {{ src }}
                </v-container>
            </v-main>
        </v-row>
    </v-app>
</template>

<script>
export default {
    name: "DocsView",
    components: {
        //
    },
    data: () => ({
        src: null,
        lookup: null,
        html: null,
        initiallyOpen: ["Welcome"],
        files: {
            pdf: "mdi-file-pdf",
            png: "mdi-file-image",
            txt: "mdi-file-document-outline",
        },
        tree: [],
        items: [
            {
                name: "Welcome",
                title: "https://tsp-appserver.na.pg.com/Training/Platform/",
                file: "txt",
            },
            {
                name: "Python",
                title: "https://tsp-appserver.na.pg.com/Training/Platform/Python/",
                children: [
                    {
                        name: "Fundamentals",
                        title:
                            "https://tsp-appserver.na.pg.com/Training/Platform/Python/001-Fundamentals/",
                        children: [
                            {
                                name: "Introduction",
                                file: "txt",
                                title: "",
                            },
                        ],
                    },
                ],
            },
        ],
        items0: [
            {
                title: "Projects",
                src:
                    "https://tsp-appserver.na.pg.com/Training/Platform/Python/007-Projects/003-Process.html",
            },
        ],
    }),

    beforeCreate() {
        this.src = this.$route.query.src;
    },

    mounted() {
        this.src = this.$route.query.src;
        this.$store.dispatch("getLearnDevDocItems");
    },

    computed: {
        dark() {
            if (!this.$store) return "";
            return this.$store.state.theme.isDark ? "?dark=true" : "?dark=false";
        },
        learnDevDocItems: {
            get() {
                return this.$store.state.learnDevDocItems;
            },
            set(value) {
                this.$store.commit("setLearnDevDocItemse", value);
            },
        },
    },

    methods: {
        handleSrc(e) {
            if (!e) this.src = null;
            try {
                let id = this.lookup.find(d => d.title == e[0]).id;
                this.src = this.learnDevDocItems.find(s => s.id == id).markdown;
                this.tree = e;
            } catch (error) {
                console.log(error);
            }
        },
        loaded() {
            let routeQuery = this.onLoad();
            this.$router.replace({ query: routeQuery }).catch(() => { });
        },
    },

    watch: {
        learnDevDocItems(res) {
            this.items = [];
            if (!res) return;
            let arr = res.map(e => {
                return { ...JSON.parse(e.JSON_Data), id: e.id };
            });
            this.lookup = arr;
            const addChildern = children => {
                return children.split(",").map(child => {
                    console.log(arr.find(a => a.id == child));
                });
            };
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (element.children) {
                    addChildern(element.children);
                } else {
                    this.items.push(element);
                }
            }
        },
    },
};
</script>
