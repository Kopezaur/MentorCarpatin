package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.MountainRegion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MountainRegion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MountainRegionRepository extends JpaRepository<MountainRegion, Long> {

}
