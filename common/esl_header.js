/**
 * Created by john on 8/28/17.
 */

module.exports = {
    ESL_HEADER: {

    },

    ESL_CONFERENCE_EVENT: {
        ADD_MEMBER:         'add-member',
        DEL_MEMBER:         'del-member',
        ENERGY_LEVEL:       'energy-level',
        VOLUME_LEVEL:       'volume-level',
        GAIN_LEVEL:         'gain-level',
        DTMF:               'dtmf',
        STOP_TALKING:       'stop-talking',
        START_TALKING:      'start-talking',
        MUTE_MEMBER:        'mute-member',
        UNMUTE_MEMBER:      'unmute-member',
        KICK_MEMBER:        'kick-member',
        DTMF_MEMBER:        'dtmf-member',
        ENERGY_LEVEL_MEMBER:    'energy-level-member',
        VOLUME_IN_MEMBER:   'volume-in-member',
        VOLUME_OUT_MEMBER:  'volume-out-member',
        PLAY_FILE:          'play-file',
        PLAY_FILE_MEMBER:   'play-file-member',
        SPEAK_TEXT:         'speak-text',
        SPEAK_TEXT_MEMBER:  'speak-text-member',
        LOCK:               'lock',
        UNLOCK:             'unlock',
        TRANSFER:           'transfer',
        BGDIAL_RESULT:      'bgdial-result',
        FLOOR_CHANGE:       'floor-change'
    },
    ESL_CONFERENCE_ACTION: {
        AGC:                'agc',
        BGDIAL:             'bgdial',
        CHKRECORD:          'chkrecord',            //查询会议录制状态
        DEAF:               'deaf',                 //使会议成员聋
        DIAL:               'dial',
        DTMF:               'dtmf',                 //向一个会议成员发送DTMF
        ENERGY:             'energy',               //调整会议成员能量等级
        ENFORCE_FLOOR:      'enforce_floor',        //给会议成员发言地位
        ENTER_SOUND:        'enter_sound',          //更改播放的声音在进入会议之际
        EXIT_SOUND:         'exit_sound',           //更改播放的声音在退出会议之际
        FLOOR:              'floor',                //切换成员的发言地位。也就是说，给成员发言，如果没有成员带走了地板
        FILE_SEEK:          'file_seek',            //看到回放会议。 +/-值以毫秒为单位的相对位置。无符号值是绝对的
        GET:                'get',                  //获取运行时参数给定的会议
        HUP:                'hup',                  //踢不踢腿的声音
        KICK:               'kick',                 //踢一个特定的成员或会议中的所有成员
        LIST:               'list',                 //列出特定会议成员或所有成员
        LOCK:               'lock',                 //锁定会议，所以没有新成员将被允许进入
        MUTE:               'mute',                 //静音会议中的特定成员
        NOPIN:              'nopin',                //移除特定会议的针
        NORECORD:           'norecord',             //
        PAUSE:              'pause',
        PAUSE_PLAY:         'pause_play',
        PIN:                'pin',                  //设置或更改密码为一个特定的会议
        PLAY:               'play',
        RECORD:             'record',
        RECORDING:          'recording',
        RELATE:             'relate',               //音或聋到另一个成员的特定成员
        RESUME:             'resume',
        SAY:                'say',                  //所有成员说，会议中的文本
        SAYMEMBER:          'saymember',
        SET:                'set',
        STOP:               'stop',
        TMUTE:              'tmute',
        TRANSFER:           'transfer',             //转让从一个会议到另一个会议成员。
        UNDEAF:             'undeaf',
        UNLOCK:             'unlock',
        UNMUTE:             'unmute',
        VOLUME_IN:          'volume_in',            //调整特定会议成员的输入音量
        VOLUME_OUT:         'volume_out',           //调整特定会议成员的输出音量
        XML_LIST:           'xml_list'
    }
}