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
            (2, 'Excellent movie.'),
            (1, 'Could have been better'),
            (3, 'So funny!'),
            (5, 'Made me cry.'),
            (1, 'Thrilling!'),
            (3, 'Best movie ever!'),
            (2, 'Crazy stunts and action.');
        
    RAISE NOTICE 'Transaction complete';

    EXCEPTION
        WHEN OTHERS THEN    
            RAISE NOTICE 'Error occurred: %', SQLERRM;
            ROLLBACK;
END $$;