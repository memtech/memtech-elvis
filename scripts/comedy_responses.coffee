# Description:
#   Image Macro Responder
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   anything!
#
# Author:
#   dpritchett
#   svpernova09
#   basedgeek
#   bkmontgomery

module.exports = (robot) ->
  robot.on 'register-responder-loaded', ->
    joke = robot.registerResponder

    ################################
    # Configuration of responses
    ################################

    # this is the simplest example of a responder.  It hears the phrase 'sick burn' (case insensitive)
    # and it responds with one of the images from its list.  Its list is only one image long.
    #
    # 3:04 PM <dpritchett> burn centers
    # 3:05 PM <Elvis> http://en.wikipedia.org/wiki/List_of_burn_centers_in_the_United_States
    joke
      chanceToSkip: 93 # this is the current default but still a useful example
      triggers:  [/burn centers/i]
      responses: [
        "http://en.wikipedia.org/wiki/List_of_burn_centers_in_the_United_States",
      ]

    # this responder adds the concept of a descriptive note - flavor text for the response.
    joke
      note:     'Sick burn!'
      triggers:  [/sick burn/i, /oh burn/i]
      responses: ["http://zerowoes.com/wp-content/uploads/2014/01/hqdefault.jpg",
        "http://i.imgur.com/qf91FrW.jpg"]

    joke
      triggers:  [/lolwut/i, /lol wut/i]
      responses: [  # lazily tripled the likelihood of the first image coming back O_o
            "https://www.evernote.com/shard/s9/sh/f27bc4e3-f3e0-43ec-9db7-5bd16bdc0ffc/8f7d6ab7160aa6704fbd22ed43f9a315/deep/0/elvis-lol-wut.png",
            "https://www.evernote.com/shard/s9/sh/f27bc4e3-f3e0-43ec-9db7-5bd16bdc0ffc/8f7d6ab7160aa6704fbd22ed43f9a315/deep/0/elvis-lol-wut.png",
            "https://www.evernote.com/shard/s9/sh/f27bc4e3-f3e0-43ec-9db7-5bd16bdc0ffc/8f7d6ab7160aa6704fbd22ed43f9a315/deep/0/elvis-lol-wut.png",
            "http://lolwut.com/layout/lolwut.jpg"
      ]


    # 3:01 PM <•dpritchett> RF
    # 3:01 PM <Elvis> RocketFuel! http://i.imgur.com/S2qngvc.jpg
    joke
      note:     'RocketFuel!'
      triggers:  [
        /(rocket fuel|rocketfuel)/i,
        /([^A-Za-z]RF[^A-Za-z])/]
      responses: [
        "https://pbs.twimg.com/media/Bt49KjPCUAABmjS.jpg",
        "https://pbs.twimg.com/media/Btp4KJAIAAA-QzT.jpg",
        "https://pbs.twimg.com/media/BtpMnQCCQAAJllq.jpg",
        "https://pbs.twimg.com/media/BsSO4ODCYAALup7.jpg",
        "https://pbs.twimg.com/media/BVa-YGHCcAAJOfg.jpg",
        "https://pbs.twimg.com/media/Bt9sYOKIYAAveEd.jpg",
        "https://pbs.twimg.com/media/BL2A1NECAAAGXvU.jpg",
        "http://www.gorocketfuel.com/sites/282/uploaded/images/10565013_10152643242707363_7272254102583821991_n_1.jpg",
        "https://pbs.twimg.com/media/BxCdNhgCYAAQIa6.png",
        "https://pbs.twimg.com/media/Bt9sYOKIYAAveEd.jpg",
        "http://i.imgur.com/S2qngvc.jpg",
        "http://i.imgur.com/DB0qC4d.jpg" ]

    # Deal with it
    joke
      triggers: [/deal with it/i]
      responses: ["http://www.gsandf.com/img/people/jeff_boshers-607e3816.gif"]

    # Why
    joke
      triggers: [/why/i]
      responses: ["https://vine.co/v/OEZ6mg32MQt"]

    # :| Ostrich!
    joke
      triggers: [/ostrich/i]
      responses: ["http://i.imgur.com/I7h5AA6.jpg"]
      
    # Disappointed lance
    joke
      triggers: [/disappointed/i, /facepalm/i, /disappointed lance/i]
      responses: ["http://i.imgur.com/GhWPSSR.jpg"]

    # more lance
    joke
      triggers: [/more lance/i]
      responses: ["http://i.imgur.com/jQogub9.jpg"]

    # Objection!
    joke
      triggers: [/objection!/i, /i object/i]
      responses: ["http://emotibot.net/pix/6186.gif"]

    # no idea dog
    joke
      triggers: [/i have no idea/i, /\w+ has no idea/i]
      responses: ["http://littlefun.org/uploads/520be02ac856117033000007_736.jpg#.png"]

    # yeeaaahhhh
    joke
      note: 'yeaaaaaaaaaaaggggggahhhhhh http://stream1.gifsoup.com/view3/1369448/howard-dean-yeah-o.gif'
      triggers: [/howard dean/i, /white house/i]
      responses: ["http://objective.ytmnd.com/"]

    # don't hate
    joke
      triggers: [/don't hate/i, /dont hate/i]
      responses: ["http://bukk.it/maybe.jpg",
                  "http://i.imgur.com/lLulX85.jpg",
                  "http://stream1.gifsoup.com/view6/3253470/spiderman-haters-gonna-hate-o.gif"
      ]

    # yeah.
    joke
      note: 'yeah.'
      triggers: [/\bgoat\b/i]
      responses: ["https://www.youtube.com/watch?v=zS-tUxcnPUk",
                  "http://fc09.deviantart.net/fs70/i/2010/010/1/d/Goat_roar_by_fbcota.jpg",
                  "http://cdni.wired.co.uk/620x413/s_v/sexy%20goat.jpg",
                  "http://www.peta.org/wp-content/uploads/2013/10/goat_2D00_list_2D00_4.jpg",
                  "http://cdn.frontpagemag.com/wp-content/uploads/2014/07/angry-goat.jpg",
                  "http://4.bp.blogspot.com/_Sh3smLghY2g/TNKxDb091WI/AAAAAAAABMA/4M5iluTvXgY/s320/scarey+goat.jpg",
                  "http://i.imgur.com/ExZGlKI.jpg",
                  "http://surlygoat.com/event_fliers/2012_7_12_goat.jpg",
                  "http://farm8.staticflickr.com/7452/11740562974_908faffa9f_n.jpg",
                  "http://crossfitrough.com/wp-content/blogs.dir/134/files/2014/04/goat.jpg",
                  "http://4.bp.blogspot.com/_Sh3smLghY2g/TNKxDb091WI/AAAAAAAABMA/4M5iluTvXgY/s320/scarey+goat.jpg"
      ]

    # what's up?
    joke
      note: 'feeling a little peculiar'
      triggers: [/\b(blondes|he-man|he man)\b/i]
      responses: ["https://www.youtube.com/watch?v=eh7lp9umG2I"]

    # gandalf
    joke
      note: 'fly, you fools!'
      triggers: [/\b(gandalf|hobbit|hobbits|orc|orcs|lotr|tolkein)\b/i]
      responses: ["https://www.youtube.com/watch?v=Sagg08DrO5U",
                  "http://24.media.tumblr.com/tumblr_mbu6iap2uA1qc173ho4_250.gif", 
                  "http://img3.wikia.nocookie.net/__cb20130106225013/lotr/images/4/40/GandalfVSBalrog.jpg",
                  "https://www.youtube.com/watch?v=AGF5ROpjRAU",
                  "https://www.youtube.com/watch?v=Nmn6Nl7YUa0",
                  "http://i.imgur.com/lURXlc5.gif",
                  "http://i.imgur.com/yHoiYig.gif",
                  "http://i.imgur.com/tymo0Y3.gif",
                  "http://imgur.com/XTdRiY8",
                  "http://i.imgur.com/Pblxdu4.gif"
      ]

    # webring
    joke
      note: 'One ring to rule them all >> http://memtech.website/~dpritchett/webring_random.html >>'
      triggers: [/\b(web ring|webring)\b/i]
      responses: ["https://www.youtube.com/watch?v=fJlz6nEOT7w&t=0m44s",
                  "https://www.youtube.com/watch?v=-UsrkoweVa4&t=1m25s", 
                  "https://33.media.tumblr.com/tumblr_lw6wmqA3Ov1qiy0obo1_500.gif",
                  "http://img1.wikia.nocookie.net/__cb20131010232524/lotr/images/3/3f/One_Ring_To_Rule_Them_All.gif"
      ]

    # IT Crowd
    joke
      note: 'Hello, IT...'
      triggers: [/(tried turning it off|hello it|have you tried turning it off and on again\?)/i]
      responses: ["http://makeameme.org/media/created/Hello-IT-Have.jpg",
                  "http://youtu.be/p85xwZ_OLX0?t=2s"]

    # deadlift
    joke
      note: "Nothin' but a peanut!"
      triggers: [/(deadlift|dead lift|squat)/i]
      responses: ["https://www.youtube.com/watch?v=ZWUcHKAj_tc",
                  "https://www.youtube.com/watch?v=-4m_9FFBHcg",
                  "http://media.giphy.com/media/dYgDRfc61SGtO/giphy.gif",
                  "http://strongerwrestler.com/wp-content/uploads/2014/01/ArnoldPullUp.jpg",
                  "http://i.imgur.com/8WZiyrc.jpg"
                  ]

    # snaaape
    joke
      triggers:  [/(what\s?the\s?fuck|the\s?fuck|da\s?fuck|da\s?fuq)\??$/i]
      responses: ["http://img.pandawhale.com/41346-snape-dafuq-myUZ.jpeg"]

    # supa hot fire
    joke
      triggers: [/supa hot fire/i]
      responses: ["http://www.reactiongifs.com/r/2013/06/supa-hot-fire.gif"]

    # yes hell yes mongo
    joke
      triggers: [/mongo/i]
      responses: ["https://farm5.staticflickr.com/4107/5058343976_4a8166d349.jpg"]

    # woo
    joke
      triggers: [/kenny powers/i]
      responses: ["http://mrwgifs.com/wp-content/uploads/2013/12/Kenny-Powers-Flipping-Off-The-Crowd-On-The-Baseball-Field-In-Eastbound-Down.gif"]

    # ryan nodding
    joke
      triggers: [/ryan nodding/i]
      responses: ["http://img.pandawhale.com/84186-Ryan-from-the-office-this-gif-chsv.gif"]

    # slash rocking
    joke
      triggers: [/(slash|weedly|air guitar|guitar)/i]
      responses: ["http://i.kinja-img.com/gawker-media/image/upload/s--UyaIL8yf--/1934hcohpg7e0gif.gif"]

    # bgswanson is heisenberg
    joke
      triggers: [/(heisenberg|you're right|you're goddamn right)/i]
      responses: ["http://i.imgur.com/Erj8ka3.jpg"]

    # swag
    joke
      triggers:  [/swag/i]
      responses: ["http://i.imgur.com/5dXgWAp.gif",
                  "http://i.imgur.com/tCTdKNm.gif",
                  "http://i.imgur.com/l72ylSv.jpg",
                  "http://i.imgur.com/o2hpEEb.gif"
                  ]

    # second breakfast
    joke
      triggers: [/second breakfast/i, /elevensies/i]
      responses: ["http://happycamperproject.files.wordpress.com/2013/08/tumblr_lzdbz2zhhg1qjpifao1_500.gif",
                  "https://31.media.tumblr.com/d146fe65cfcf6f000c71f12f700aebe6/tumblr_n1vikwYCQO1rai2kio2_250.gif",
                  "http://www.tickld.com/cdn_image_content/362308.jpg"]

    # dave grohl big hand slaps
    joke
      triggers:  [/(dave hand|big hand|everlong|dave slap)/i]
      responses: ["http://stream1.gifsoup.com/view7/4374280/slap-with-big-hand-o.gif"]

    joke
      triggers: [/wazzup/i]
      responses: [ # borrowed playlist from https://www.youtube.com/playlist?list=PL1MLb1QkPrlyTtNwIbYkZZSIEjjJCPaKB
        "https://www.youtube.com/watch?v=W16qzZ7J5YQ",
        "https://www.youtube.com/watch?v=9_wJkuK1PDQ",
        "https://www.youtube.com/watch?v=CubL4T_x91k",
        "https://www.youtube.com/watch?v=t4yYxy3mbAE",
        "https://www.youtube.com/watch?v=AiFEz6e5LCU",
        "https://www.youtube.com/watch?v=lpyhdambtfY",
        "https://www.youtube.com/watch?v=IkevT6IOLTk",
        "https://www.youtube.com/watch?v=-kgIu1Ua-eM",
        "https://www.youtube.com/watch?v=iZcTAfrtkgE",
        "https://www.youtube.com/watch?v=a5yzRSqvvyI",
        "https://www.youtube.com/watch?v=FhVM77INnmw",
        "https://www.youtube.com/watch?v=WKzU4D5bLvw",
        "https://www.youtube.com/watch?v=dIPpSrdpt28",
      ]

    # que?
    joke
      triggers: [/\b(que|que\?)\b/i]
      responses: ["http://i.imgur.com/7qNTrHN.jpg"]

    # yip yip
    joke
      triggers: [/(yip|yip yip)/i]
      responses: ["https://i.imgur.com/3TIWj.gif"]

    # D:
    joke
      triggers: [/(drugs|drug war)/i]
      responses: ["http://i.imgur.com/IagvuDy.gif"]

    # the more you know
    joke
      triggers: [/(tmyk)/i]
      responses: ["http://i.imgur.com/5dlGZFe.gif"]

    # tgif
    joke
      triggers: [/(tgif)/i]
      responses: ["https://davidkanigan.files.wordpress.com/2012/06/cow-bell-wake-up-call1.gif",
                  "https://stupendoustidbits.files.wordpress.com/2012/06/katy-perry.gif",
                  "http://25.media.tumblr.com/tumblr_ma0gf1d66q1radqrco1_500.gif",
                  "http://i1159.photobucket.com/albums/p634/electricpickles12/tumblr_m3s1sbRxe61rs9ie3o1_500.gif"]

    # drama llama
    joke
      triggers: [/(drama counter|days since last drama)/i]
      responses: ["Days since last #memtech drama incident: 0"]

    # zorro
    joke
      triggers: [/(zorro|gay blade)/i]
      responses: ["Meltheous is the gay blade! http://i.imgur.com/L3wS3SO.png"]
     
    # php famous  
    joke
      triggers: [/php famous/i]
      responses: ["http://i.imgur.com/917zAnf.jpg"]
      
    # what is best in life?
    joke
      triggers: [/what is best in life(\?|\!)*/i]
      responses: ["To crush your enemies, to see them driven before you, and to hear the lamentations of their women!"]

    # raptor golang
    joke
      triggers: [/(golang|gopher)/i]
      responses: ["Goper Lunch! http://i.imgur.com/CyQYinp.gif"]

    # unix covenant
    joke
      triggers: [/unix/i]
      responses: ["http://media3.giphy.com/media/qIues2j3gHHGw/giphy.gif"]

    # party hard  party hard  party hard  party hard 
    joke
      triggers: [/party hard/i]
      responses: ["https://www.youtube.com/watch?v=5ztTZ_7wtVo"]
    
    # jelly
    joke
      triggers: [/jelly/i]
      responses: ["https://s-media-cache-ak0.pinimg.com/736x/90/43/46/904346164bd4a464073c4d1a68a9abe3.jpg"]
      
    # twankle
    joke
      triggers: [/(intens|twank|dpritchett)/i]
      responses: ["http://i.imgur.com/BNbENUP.gif", "http://i.imgur.com/xuGliL0.gif"]
