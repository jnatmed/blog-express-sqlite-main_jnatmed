import { DataSource } from 'typeorm';

export const dbcontext = new DataSource({
	type: 'sqlite',
	logging: Boolean(process.env.BLOG_LOGGING) ?? false,
	// synchronize: true,
	synchronize: true,
	// database: './blog.db',
	database: './blog.db',
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
});
