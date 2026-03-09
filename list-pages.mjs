import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'qdidf6e5',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false
});

async function run() {
    console.log('--- PAGES ---');
    const pages = await client.fetch('*[_type == "page"] { title, "slug": slug.current, sections[] { _type, title } }');
    console.log(JSON.stringify(pages, null, 2));

    console.log('\n--- NAVBAR ---');
    const navbar = await client.fetch('*[_type == "navbar"][0]');
    console.log(JSON.stringify(navbar, null, 2));

    console.log('\n--- SITE CONFIG ---');
    const site = await client.fetch('*[_type == "site"][0]');
    console.log(JSON.stringify(site, null, 2));
}

run().catch(console.error);
