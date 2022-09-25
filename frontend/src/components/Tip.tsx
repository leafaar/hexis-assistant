import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const longText = `
Ledger doesn't yet support signing Solana transactions offline, so to verify wallet ownership we must create a 0 cost transaction.
`;

export const Tip = () => {
    return(
        <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Tooltip title={longText} placement="right-start" arrow style={{
                fontSize: '14px',
            }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="8.00016" cy="4.66667" rx="0.666667" ry="0.666667" fill="#28303F" />
                <path d="M7.3335 5.91675C6.91928 5.91675 6.5835 6.25253 6.5835 6.66675C6.5835 7.08096 6.91928 7.41675 7.3335 7.41675V5.91675ZM8.00016 6.66675H8.75016C8.75016 6.25253 8.41438 5.91675 8.00016 5.91675V6.66675ZM7.25016 11.3334C7.25016 11.7476 7.58595 12.0834 8.00016 12.0834C8.41438 12.0834 8.75016 11.7476 8.75016 11.3334H7.25016ZM7.3335 7.41675H8.00016V5.91675H7.3335V7.41675ZM7.25016 6.66675V11.3334H8.75016V6.66675H7.25016Z" fill="#28303F" />
                <path d="M8 14.75C11.7279 14.75 14.75 11.7279 14.75 8H13.25C13.25 10.8995 10.8995 13.25 8 13.25V14.75ZM1.25 8C1.25 11.7279 4.27208 14.75 8 14.75V13.25C5.10051 13.25 2.75 10.8995 2.75 8H1.25ZM8 1.25C4.27208 1.25 1.25 4.27208 1.25 8H2.75C2.75 5.10051 5.10051 2.75 8 2.75V1.25ZM8 2.75C10.8995 2.75 13.25 5.10051 13.25 8H14.75C14.75 4.27208 11.7279 1.25 8 1.25V2.75Z" fill="#28303F" />
            </svg>
            </Tooltip>
        </div>
    );
}