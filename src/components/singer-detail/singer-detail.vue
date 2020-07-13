<template>
  <transition name="slide" appear>
    <musiclist :songs="songs" :bgImage="baImage" :title="title"></musiclist>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
import Musiclist from 'components/music-list/music-list'
export default {
  data() {
    return {
      // 所有歌曲
      songs: []
    }
  },
  computed: {
    ...mapGetters(['singer']),
    title() {
      return this.singer.name
    },
    baImage() {
      return this.singer.avatar
    }
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.data.list)).then(songs => {
            this.songs = songs
            // console.log(this.songs)
          })
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let { musicData } = item
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    Musiclist
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.slide-enter-active
.slide-leave-active
  transition all 0.3s
.slide-enter
.slide-leave-to
  transform translate3d(100%,0,0)
</style>
