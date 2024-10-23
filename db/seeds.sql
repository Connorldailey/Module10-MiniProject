DO $$
    DECLARE
        -- No variables to declare
    BEGIN
        INSERT INTO movies (movie_name) VALUES
            ('Jack Reacher'),
            ('Up'),
            ('Dumb and Dumber'),
            ('Point Break'),
            ('Dark Waters');
        INSERT INTO reviews (movie_id, review) VALUES
            (1, 'Excellent movie.'),
            (2, 'Could have been better'),
            (3, 'So funny!'),
            (4, 'Made me cry.'),
            (5, 'Thrilling!');
        
    RAISE NOTICE 'Transaction complete';

    EXCEPTION
        WHEN OTHERS THEN    
            RAISE NOTICE 'Error occurred: %', SQLERRM;
            ROLLBACK;
END $$;