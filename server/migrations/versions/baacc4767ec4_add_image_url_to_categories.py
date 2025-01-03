"""Add image_url to categories

Revision ID: baacc4767ec4
Revises: cdcdc97661ed
Create Date: 2025-01-02 14:53:40.442633

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'baacc4767ec4'
down_revision = 'cdcdc97661ed'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('car_models')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('car_models',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=False),
    sa.Column('brand', sa.VARCHAR(), nullable=False),
    sa.Column('year', sa.INTEGER(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###