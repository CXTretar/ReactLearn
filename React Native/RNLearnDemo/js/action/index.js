import {onThemeChange, onThemeInit, onShowCustomThemeView} from './theme';
import {onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite} from './popular';
import {onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite} from './trending'
import {onLoadFavoriteData} from './favorite'
import {onLoadLanguageData} from "./language";
import {onSearch,onSearchCancel,onLoadMoreSearch,onSaveSearchKey} from "./search";

export default {
    onThemeChange,
    onThemeInit,
    onShowCustomThemeView,
    onRefreshPopular,
    onLoadMorePopular,
    onRefreshTrending,
    onLoadMoreTrending,
    onLoadFavoriteData,
    onFlushPopularFavorite,
    onFlushTrendingFavorite,
    onLoadLanguageData,
    onSearch,
    onSearchCancel,
    onLoadMoreSearch,
    onSaveSearchKey,
}