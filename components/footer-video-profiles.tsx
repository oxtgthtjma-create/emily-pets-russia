const videoProfiles = [
  { platform: "TikTok", href: "https://www.tiktok.com/@oxtgt.htjma" },
  { platform: "YouTube", href: "https://www.youtube.com/@ikun_world_peace" },
];
export default function FooterVideoProfiles() {
  return (
    <div className="footer-video-profiles">
      <p>Смотрите наши видео</p>
      <div>
        {videoProfiles.map((profile) => (
          <a
            className="embossed-social"
            key={profile.platform}
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              profile.platform + " — наш видеоканал (откроется в новой вкладке)"
            }
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              aria-hidden="true"
            >
              {profile.platform === "YouTube" ? (
                <>
                  <rect x="1" y="4" width="22" height="16" rx="5" />
                  <path d="m10 8 6 4-6 4Z" fill="#173f35" />
                </>
              ) : (
                <path d="M16.7 2c.3 2.6 1.7 4.2 4.3 4.4v3.7a9 9 0 0 1-4.3-1.3v7.1a6.6 6.6 0 1 1-5.7-6.5v3.8a2.9 2.9 0 1 0 2 2.7V2h3.7Z" />
              )}
            </svg>
            <span>{profile.platform}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
