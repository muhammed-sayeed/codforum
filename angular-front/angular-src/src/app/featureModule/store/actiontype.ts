export enum ActionType {
    REGISTER = '[Auth] Register ',
    REGISTER_SUCCESS = '[Auth] Register success',
    REGISTER_FAILURE = '[Auth] Register failure',

    LOGIN = '[login] Login',
    LOGIN_SUCCESS = '[login] Login success',
    LOGIN_FAILURE = '[login] Login failure',

    USERLIST = '[userlist] userlist',
    USERLIST_SUCCESS = '[userlist] userlist success',
    USERLIST_FAILURE = '[userlist] userlist failure',

    EDITUSER = '[edituser] edituser',
    EDITUSER_SUCCESS = '[edituser] edituser success',
    EDITUSER_FAILURE = '[edituser] edituser failure',

    ADDTAG = '[addtag] add tag',
    ADDTAG_SUCCESS = '[addtag] addtag success',
    ADDTAG_FAILURE = '[addtag] addtag failure',

    TAGLIST = '[taglist] taglist',
    TAGLIST_SUCCESS = '[taglist] taglist success',
    TAGLIST_FAILURE = '[taglist] taglist failure',

    EDITTAG = '[edittag] editag',
    EDITTAG_SUCCESS = '[edittag] edittag success',
    EDITTAG_FAILURE = '[edittag] edittag failure',

    REMOVETAG = '[removetag] removetag',
    REMOVETAG_SUCCESS = '[removetag success]',
    REMOVETAG_FAILURE = '[removetag failure]',

    MODERATORLIST = '[moderatorlist] moderatorlist',
    MODERATORLIST_SUCCESS = '[moderatorlist] moderatorlist success',
    MODERATORLIST_FAILURE = '[moderatorlist] moderatorlist failure',

    ADDCOMMUNITY = '[addcommunity] addcommunity',
    ADDCOMMUNITY_SUCCESS = '[addcommunity] addcommunity success',
    ADDCOMMUNITY_FAILURE = '[addcommunity] addcommunity failure',

    COMMUNITYLIST = '[communitylist] communitylist',
    COMMUNITYLIST_SUCCESS = '[communitylist] communitylist success',
    COMMUNITYLIST_FAILURE = '[communitylist] communitylist failure',

    REMOVECOMMUNITY = '[removecommunity] removecommunity',
    REMOVECOMMUNITY_SUCCESS = '[removecomminity] removecommunity success',
    REMOVECOMMUNITY_FAILURE = '[removecommunity] removecommunity failure',

    REMOVEFROMCOMMUNITY = '[removefromcommunity] removefromcommunity',
    REMOVEFROMCOMMUNITY_SUCCESS = '[removefromcommunity] removefromcommunity success',
    REMOVEFROMCOMMUNITY_FAILURE = '[removefromcommunity] removefromcommunity failure',

    ADDBADGE = '[addbadge] addbadge',
    ADDBADGE_SUCCESS = '[addbadge] addbadge success',
    ADDBADGE_FAILURE = '[addbadge] addbadge failure',

    BADGELIST = '[badgelist] badgelist',
    BADGELIST_SUCCESS = '[badgelist] badgelist success',
    BADGELIST_FAILURE = '[badgelist] badgelist failure',

    EDITBADEG = '[editbadge] editbadge',
    EDITBADGE_SUCCESS = '[editbadge] editbadge success',
    EDITBADGE_FAILURE = '[editbadge] editbadge failure',

    USERPROFILE = '[userprofile] userprofile',
    USERPROFILE_SUCCESS = '[userprofile] userprofile success',
    USERPROFILE_FAILURE = '[userprofile] userprofile failure',

    UPDATEPROFILE = '[updateprofile] updateprofile',
    UPDATEPROFILE_SUCCESS = '[updateprofile] updateprofile success',
    UPDATEPROFILE_FAILURE = '[updateprofile] updateprofile failure',

    USERS = '[users] users',
    USERS_SUCCESS = '[users] users success',
    USERS_FAILURE = '[users] users failure',

    SINGLEUSER = '[singleuser] single user',
    SINGLEUSER_SUCCESS = '[singleuser] single user',
    SINGLEUSER_FAILURE = '[singleuser] single user',

    GETQUESTIONS = '[getquestions] get questions',
    GETQUESTIONS_SUCCESS = '[getquestions] get questions',
    GETQUESTIONS_FAILURE = '[getquestions] get questions',
}
