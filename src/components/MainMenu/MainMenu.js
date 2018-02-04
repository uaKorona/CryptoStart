import Navigator from '../../common/mixins/Navigator'

export default {
  name: 'MainMenu',
  data () {
    return {}
  },
  computed: {
    isUserAuthorized () {
      return this.$store.getters.isUserAuthorized
    }
  },
  mixins: [ Navigator ],
  methods: {}
}
