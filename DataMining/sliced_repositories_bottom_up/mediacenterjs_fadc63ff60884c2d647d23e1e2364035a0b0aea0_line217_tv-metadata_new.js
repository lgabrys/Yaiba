getDataForNewShow = function(originalTitle, episodeTitle,callback){
    var episodeSeason       = '0'
        , title             = ''
        , trimmedTitle      = ''
        , episodeNumber     = '0';
    if(config.tvFormat === 's00e00' || config.tvFormat === undefined){
        var showTitle               = episodeTitle.replace(/[sS]([0-9]{1,2})[eE]([0-9]{1,2})/, '')
        , episodeSeasonMatch        = episodeTitle.match(/[sS]([0-9]{1,2})/)
        , episodeNumberMatch        = episodeTitle.match(/[eE]([0-9]{1,2})/);
        if(episodeSeasonMatch){
            episodeSeason       = episodeSeasonMatch[0].replace(/[sS]/,"");
        }
        if(episodeNumberMatch){
            episodeNumber       = episodeNumberMatch[0].replace(/[eE]/,"");
        }
    } else if(config.tvFormat === '0x00'){
        var showTitle            = episodeTitle.replace(/([0-9]{1,2})+?(x)+?([0-9]{1,2})/, '')
        , episodeNumberMatch     = episodeTitle.match(/(x)+?([0-9]{1,2})/)
        episodeSeason          = episodeTitle.match(/(\d{1,2})+?(?=x)/)
        if(episodeNumberMatch){
            episodeNumber    = episodeNumberMatch[0].replace("x","");
        }
    }
    var episodeData = {
        "showTitle"         : showTitle.toLowerCase(),
        "episodeSeason"     : episodeSeason,
        "episodeNumber"     : episodeNumber
    }
    title           = episodeData.showTitle;
    trimmedTitle    = title.trim();
    Episode.create({
    })
    .success(function(episode) {
        , showTitle         = 'unknown show'
        getMetadataFromTrakt(trimmedTitle, function(err, result){
            } else {
                var traktResult = result;
                showTitle       = traktResult.title;
                if(traktResult !== null){
                    if(traktResult.title !== undefined){
                        var showTitleResult = traktResult.title;
                    }
                }
                showTitle = showTitleResult.toLowerCase();
                Show.findOrCreate({name: showTitle}, {
                })
            }
        });
    });
}
