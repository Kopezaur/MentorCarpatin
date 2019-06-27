package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.MountainRegion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MountainRegion} entity.
 */
public interface MountainRegionSearchRepository extends ElasticsearchRepository<MountainRegion, Long> {
}
