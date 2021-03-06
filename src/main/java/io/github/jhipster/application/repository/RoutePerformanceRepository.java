package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.RoutePerformance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RoutePerformance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoutePerformanceRepository extends JpaRepository<RoutePerformance, Long> {

}
