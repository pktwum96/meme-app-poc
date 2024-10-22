import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemeInfoPage } from '../index';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { BrowserRouter, useParams } from 'react-router-dom';
import { getMemeById } from '../../../queries/memes';
import { useUser } from '../../../supabase/useUser';

// Mock the hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useLocation: vi.fn().mockReturnValue({ state: {} })
  };
});

vi.mock('@supabase/auth-helpers-react', () => ({
  useSessionContext: vi.fn()
}));

vi.mock('../../../queries/memes', () => ({
  getMemeById: vi.fn()
}));

vi.mock('../../../supabase/useUser', () => ({
  useUser: vi.fn()
}));

describe('MemeInfoPage', () => {
  const mockMeme = {
    id: '1',
    title: 'Test Meme',
    description: 'Test Description',
    media_url: 'test.jpg',
    media_type: 'image',
    status: 'draft',
    created_by: 'user1'
  };

  beforeEach(() => {
    vi.mocked(useSessionContext).mockReturnValue({
      supabaseClient: {},
    } as any);

    vi.mocked(useUser).mockReturnValue({
      userDetails: { id: 'user1' },
      isLoading: false,
    } as any);

    vi.mocked(useParams).mockReturnValue({ memeId: '1' });
  });

  it('renders meme details when loaded', async () => {
    vi.mocked(getMemeById).mockResolvedValueOnce({ data: mockMeme, error: null });

    render(
      <BrowserRouter>
        <MemeInfoPage />
      </BrowserRouter>
    );

    expect(await screen.findByText(mockMeme.title)).toBeInTheDocument();
    expect(await screen.findByText(mockMeme.description)).toBeInTheDocument();
  });

  it('shows edit/delete buttons for owner', async () => {
    vi.mocked(getMemeById).mockResolvedValueOnce({ data: mockMeme, error: null });

    render(
      <BrowserRouter>
        <MemeInfoPage />
      </BrowserRouter>
    );

    expect(await screen.findByText('Edit')).toBeInTheDocument();
    expect(await screen.findByText('Delete')).toBeInTheDocument();
  });

  it('shows submit for review button for draft memes', async () => {
    vi.mocked(getMemeById).mockResolvedValueOnce({ data: mockMeme, error: null });

    render(
      <BrowserRouter>
        <MemeInfoPage />
      </BrowserRouter>
    );

    expect(await screen.findByText('Submit for review')).toBeInTheDocument();
  });
});
