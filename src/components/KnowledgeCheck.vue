<template>
  <v-container class="px-0" fluid>
    {{ number }}. &nbsp;{{ learnKnowledgeCheck.q }}
    <v-radio-group v-model="radioGroup" dense>
      <v-radio
        v-for="n in learnKnowledgeCheck.options"
        :key="n"
        :label="`${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      radioGroup: null,
    };
  },
  computed: {
    learnKnowledgeCheck: function () {
      return this.$attrs.check;
    },
    number: function () {
      return this.$attrs.number;
    },
  },
};
</script>
