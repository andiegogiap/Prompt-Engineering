
import React from 'react';

export const IconBase: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);

export const MegaphoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <path d="m3 11 18-2L13 22 3 11z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </IconBase>
);

export const CheckSquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </IconBase>
);

export const ShoppingBagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <path d="M6 2L3 7v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-3-5Z" />
    <line x1="3" y1="7" x2="21" y2="7" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </IconBase>
);

export const LineChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <path d="M3 3v18h18" />
    <path d="m18 9-6 6-4-4-5 5" />
  </IconBase>
);

export const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </IconBase>
);

export const DollarSignIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </IconBase>
);

export const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </IconBase>
);

export const MessageCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </IconBase>
);

export const PenToolIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l7.5 1.5L13 18l-1.5 1.5z" />
    <path d="M2 2l7.586 7.586" />
  </IconBase>
);

export const TerminalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </IconBase>
);

export const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </IconBase>
);

export const LifeBuoyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
    <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
  </IconBase>
);

export const Share2Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </IconBase>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}>
    <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z"/>
  </IconBase>
);

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconBase>
);

export const CopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} width="16" height="16">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </IconBase>
);

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} width="16" height="16">
    <polyline points="20 6 9 17 4 12" />
  </IconBase>
);

export const WorkflowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <path d="M12 3a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4z"/>
    <path d="M8 11v4a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-4"/>
    <path d="M8 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>
  </IconBase>
);

export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}>
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </IconBase>
);

export const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </IconBase>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <path d="m9 11 3 3L22 4"/>
  </IconBase>
);

export const PieChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </IconBase>
);

export const CpuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14"x2="4" y2="14" />
  </IconBase>
);

export const CodeXmlIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <path d="m18 16 4-4-4-4"/>
    <path d="m6 8-4 4 4 4"/>
    <path d="m14.5 4-5 16"/>
  </IconBase>
);

export const LayoutGridIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <rect width="18" height="18" x="3" y="3" rx="2"/>
    <path d="M3 12h18"/>
    <path d="M12 3v18"/>
  </IconBase>
);

export const AccessibilityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props} className="w-6 h-6">
    <circle cx="16" cy="4" r="1"/>
    <path d="m18 19 1-7-5.87.94"/>
    <path d="m5 8 3-3 5.5 3-2.21 3.5"/>
    <path d="M4.24 14.5a5 5 0 0 0 6.88 6"/>
    <path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>
  </IconBase>
);

export const UploadCloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}>
    <path d="M16 16l-4-4-4 4M12 12v9"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    <path d="M16 16l-4-4-4 4"/>
  </IconBase>
);

export const ClipboardSignatureIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <IconBase {...props}>
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m16 12-3-3-3 3" />
        <path d="M12 17v-8" />
    </IconBase>
);

export const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconBase {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </IconBase>
);
