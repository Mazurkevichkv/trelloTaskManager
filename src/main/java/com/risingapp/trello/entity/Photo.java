package com.risingapp.trello.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by zinoviyzubko on 27.03.17.
 */
@Data
@Entity
@Table(name = "photos")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    @Column(columnDefinition="TEXT")
    private String base64;
    private String link;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
