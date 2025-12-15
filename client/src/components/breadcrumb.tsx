import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const [location] = useLocation();
  const allItems = [{ label: "Startseite", href: "/" }, ...items];

  return (
    <nav 
      aria-label="Breadcrumb-Navigation" 
      className="bg-muted/50 border-b"
      data-testid="nav-breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
        <ol 
          className="flex flex-wrap items-center gap-1 text-sm"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const position = index + 1;
            const itemUrl = item.href || location;

            return (
              <li 
                key={index} 
                className="flex items-center gap-1"
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                )}
                {isLast ? (
                  <>
                    <span 
                      className="text-foreground font-medium"
                      itemProp="name"
                      data-testid={`breadcrumb-current-${index}`}
                    >
                      {index === 0 && <Home className="w-4 h-4 inline mr-1" aria-hidden="true" />}
                      {item.label}
                    </span>
                    <meta itemProp="item" content={itemUrl} />
                  </>
                ) : (
                  <Link 
                    href={item.href || "/"}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    itemProp="item"
                    data-testid={`breadcrumb-link-${index}`}
                  >
                    {index === 0 && <Home className="w-4 h-4 inline mr-1" aria-hidden="true" />}
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(position)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
