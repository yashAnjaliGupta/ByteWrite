import { useState, useRef, useEffect } from "react";
import { FaXTwitter, FaLinkedin, FaFacebook, FaWhatsapp, FaTelegram, FaLink, FaShare } from "react-icons/fa6";
import { getShareUrl } from "../config";

interface ShareSectionProps {
    blogId: string;
    title: string;
}

interface ShareOption {
    label: string;
    icon: React.ReactNode;
    bgColor: string;
    onClick: () => void;
}

function ShareButton({ share, copied }: { share: ShareOption; copied: boolean }) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={share.onClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all transform hover:scale-110 ${share.bgColor}`}
            >
                {share.icon}
            </button>
            
            {/* Tooltip */}
            {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap pointer-events-none z-50">
                    {share.label === "Copy Link" && copied ? "Copied!" : share.label}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </div>
            )}
        </div>
    );
}

export function ShareSection({ blogId, title }: ShareSectionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const shareUrl = getShareUrl(blogId);
    
    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    const shares: ShareOption[] = [
        {
            label: "Twitter",
            icon: <FaXTwitter className="text-xl" />,
            bgColor: "bg-white hover:bg-gray-100 text-black",
            onClick: () => {
                window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
                    '_blank',
                    'width=600,height=400'
                );
                setIsOpen(false);
            },
        },
        {
            label: "LinkedIn",
            icon: <FaLinkedin className="text-xl" />,
            bgColor: "bg-gray-700 hover:bg-gray-800 text-white",
            onClick: () => {
                window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                    '_blank',
                    'width=600,height=400'
                );
                setIsOpen(false);
            },
        },
        {
            label: "Facebook",
            icon: <FaFacebook className="text-xl" />,
            bgColor: "bg-gray-600 hover:bg-gray-700 text-white",
            onClick: () => {
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    '_blank',
                    'width=600,height=400'
                );
                setIsOpen(false);
            },
        },
        {
            label: "WhatsApp",
            icon: <FaWhatsapp className="text-xl" />,
            bgColor: "bg-gray-500 hover:bg-gray-600 text-white",
            onClick: () => {
                window.open(
                    `https://wa.me/?text=${encodeURIComponent(`Check out: ${title} ${shareUrl}`)}`,
                    '_blank'
                );
                setIsOpen(false);
            },
        },
        {
            label: "Telegram",
            icon: <FaTelegram className="text-xl" />,
            bgColor: "bg-black hover:bg-gray-900 text-white",
            onClick: () => {
                window.open(
                    `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
                    '_blank'
                );
                setIsOpen(false);
            },
        },
        {
            label: "Copy Link",
            icon: <FaLink className="text-xl" />,
            bgColor: "bg-gray-400 hover:bg-gray-500 text-white",
            onClick: async () => {
                await navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            },
        },
    ];

    return (
        <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="relative" ref={dropdownRef}>
                {/* Share Button - Circular */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 text-white font-bold transition-all transform hover:scale-110 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 relative"
                >
                    <FaShare className="text-xl" />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 mt-3 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4">
                        <div className="flex flex-wrap gap-4">
                            {shares.map((share) => (
                                <ShareButton key={share.label} share={share} copied={copied} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}