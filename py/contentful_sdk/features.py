# Contentful SDK feature factory

from contentful_sdk.feature.base_feature import ContentfulBaseFeature
from contentful_sdk.feature.debug_feature import ContentfulDebugFeature
from contentful_sdk.feature.idempotency_feature import ContentfulIdempotencyFeature
from contentful_sdk.feature.metrics_feature import ContentfulMetricsFeature
from contentful_sdk.feature.paging_feature import ContentfulPagingFeature
from contentful_sdk.feature.ratelimit_feature import ContentfulRatelimitFeature
from contentful_sdk.feature.retry_feature import ContentfulRetryFeature
from contentful_sdk.feature.test_feature import ContentfulTestFeature
from contentful_sdk.feature.timeout_feature import ContentfulTimeoutFeature


_FEATURES = {
    "base": lambda: ContentfulBaseFeature(),
    "debug": lambda: ContentfulDebugFeature(),
    "idempotency": lambda: ContentfulIdempotencyFeature(),
    "metrics": lambda: ContentfulMetricsFeature(),
    "paging": lambda: ContentfulPagingFeature(),
    "ratelimit": lambda: ContentfulRatelimitFeature(),
    "retry": lambda: ContentfulRetryFeature(),
    "test": lambda: ContentfulTestFeature(),
    "timeout": lambda: ContentfulTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
