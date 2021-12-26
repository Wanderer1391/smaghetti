const GET_NEWEST_PUBLISHED_LEVELS_FUNCTION_NAME = 'get_newest_published_levels';
const GET_NEWEST_PUBLISHED_LEVELS_FUNCTION_PARAMS = [
	'current_user_id varchar(50)',
];

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createFunction(
		GET_NEWEST_PUBLISHED_LEVELS_FUNCTION_NAME,
		GET_NEWEST_PUBLISHED_LEVELS_FUNCTION_PARAMS,
		{
			replace: true,
			returns:
				'table (id text, name text, data jsonb, version text, username text, created_at timestamp, updated_at timestamp, total_vote_count bigint, current_user_voted bool)',
			language: 'plpgsql security definer',
		},
		`
    begin
      return query
      select 
        l.id,
        l.name,
        l.data,
        l.version,
        u.username,
        l.created_at,
        l.updated_at,
        coalesce(count(lv.user_id), 0) as total_vote_count,
        coalesce(count(case lv.user_id::text when current_user_id then 1 else null end), 0) = 1 as current_user_voted
      from
        public.levels l
      left join
        public.level_votes lv
      on
        lv.level_id = l.id 
      left join
        public.users u
      on
        u.id = l.user_id
      where
        l.published = true 
      group by
        l.id, l.name, l.data, l.version, u.username, l.created_at, l.updated_at
      order by
        l.updated_at desc;
      end;
    `
	);
};

exports.down = (pgm) => {
	pgm.dropFunction(
		GET_NEWEST_PUBLISHED_LEVELS_FUNCTION_NAME,
		GET_NEWEST_PUBLISHED_LEVELS_FUNCTION_PARAMS
	);
};
