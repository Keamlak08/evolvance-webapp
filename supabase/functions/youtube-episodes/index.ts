import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const CHANNEL_ID = 'UCz0AqVxvzVZgltC8CFGm9QA';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!apiKey) throw new Error('YOUTUBE_API_KEY not configured');

    // Get the uploads playlist for the channel
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${apiKey}`
    );
    const channelData = await channelRes.json();
    if (!channelRes.ok) {
      console.error('Channel fetch failed:', channelData);
      throw new Error(channelData.error?.message || 'Failed to fetch channel');
    }
    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) throw new Error('No uploads playlist found');

    // Fetch the most recent uploads
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${uploadsPlaylistId}&key=${apiKey}`
    );
    const playlistData = await playlistRes.json();
    if (!playlistRes.ok) {
      console.error('Playlist fetch failed:', playlistData);
      throw new Error(playlistData.error?.message || 'Failed to fetch episodes');
    }

    type YoutubeSnippet = {
      resourceId: { videoId: string };
      title: string;
      description: string;
      publishedAt: string;
      thumbnails?: Record<string, { url?: string }>;
    };

    const playlistItems = Array.isArray(playlistData.items) ? playlistData.items : [];
    const episodes = playlistItems.map((item) => {
      const snippet = item?.snippet as YoutubeSnippet | undefined;
      return {
        videoId: snippet?.resourceId.videoId ?? "",
        title: snippet?.title ?? "",
        description: snippet?.description ?? "",
        publishedAt: snippet?.publishedAt ?? "",
        thumbnail:
          snippet?.thumbnails?.maxres?.url ||
          snippet?.thumbnails?.high?.url ||
          snippet?.thumbnails?.medium?.url ||
          "",
      };
    });

    return new Response(JSON.stringify({ episodes }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=600' },
      status: 200,
    });
  } catch (e) {
    console.error('youtube-episodes error:', e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
