'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader';
import Select from '@/components/ui/Select';
import { listUsers, fetchUserSummary } from '@/lib/api/users';
import { ListedUser, UserSummary } from '@/types/user';
import withPagePermission from '@/utils/withPagePermission';
import { PERMISSION_VIEW_USER_SUMMARIES } from '@/utils/permissions';

function UserSummariesPage() {
  const [users, setUsers] = useState<ListedUser[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [summary, setSummary] = useState<UserSummary | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await listUsers();
        setUsers(res);
      } catch (err) {
        console.error(err);
        setError('Failed to load users.');
      } finally {
        setLoadingUsers(false);
      }
    };
    load();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    setSummary(null);
    if (!id) return;
    setLoadingSummary(true);
    try {
      const res = await fetchUserSummary(id);
      setSummary(res);
    } catch (err) {
      console.error(err);
      setError('Failed to load summary.');
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold text-white">User Summaries</h1>
      {loadingUsers ? (
        <Loader message="Loading users..." />
      ) : (
        <Select label="Select User" value={selectedId} onChange={handleChange}>
          <option value="">-- Choose a user --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name || u.email}
            </option>
          ))}
        </Select>
      )}
      {loadingSummary && <Loader message="Loading summary..." />}
      {error && <p className="text-red-400">{error}</p>}
      {summary && (
        <div className="space-y-4 text-white">
          <div>
            <strong>Role:</strong> {summary.intern_role}
          </div>
          <div>
            <strong>Work Environment:</strong> {summary.work_environment}
          </div>
          <div>
            <strong>12 Month Goal:</strong> {summary.goal_12_months}
          </div>
          <div>
            <strong>Career Passions:</strong> {summary.career_passions.join(', ')}
          </div>
          <div>
            <strong>Core Values:</strong> {summary.core_values.join(', ')}
          </div>

          <div>
            <strong>OCEAN assessment responses (Grouped by Trait):</strong>
            <pre className="whitespace-pre-wrap">{summary.ocean_text}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default withPagePermission(UserSummariesPage, PERMISSION_VIEW_USER_SUMMARIES);
